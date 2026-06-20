const { Client } = require('pg');
const OMDB_API_KEY = 'trilogy';
const DB_CONNECTION = 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres';

async function seedMissingMovies() {
  const client = new Client({ connectionString: DB_CONNECTION });
  await client.connect();

  const moviesToAdd = ['Barbie', 'Ice Age'];

  for (const title of moviesToAdd) {
    const check = await client.query("SELECT id FROM movies WHERE title = $1", [title]);
    if (check.rows.length > 0) continue;

    console.log(`Fetching ${title}...`);
    const omdbRes = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
    const data = await omdbRes.json();

    if (data.Response === 'True') {
      const duration = data.Runtime !== 'N/A' ? parseInt(data.Runtime.replace(' min', '')) : 120;
      const releaseDate = data.Released !== 'N/A' ? new Date(data.Released).toISOString().split('T')[0] : '2023-01-01';
      const insertRes = await client.query(
        `INSERT INTO movies (id, title, description, duration, release_date, poster_url, imdb_rating, language) 
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [title, data.Plot, duration, releaseDate, data.Poster, parseFloat(data.imdbRating) || 7.0, data.Language || 'English']
      );
      const movieId = insertRes.rows[0].id;
      
      // Add shows for this movie
      const screensRes = await client.query("SELECT id FROM screens");
      for (const screen of screensRes.rows) {
        for(let i=0; i<3; i++) {
          const d = new Date(); d.setHours(d.getHours() + 5); d.setMinutes(d.getMinutes() + 30); d.setDate(d.getDate() + i);
          const dateStr = d.toISOString().split('T')[0];
          await client.query(`INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)`,
            [movieId, screen.id, dateStr, '12:00:00', 250]);
        }
      }
      
      // Add cast
      const actors = data.Actors ? data.Actors.split(',').map(a => a.trim()) : [];
      for (const actor of actors.slice(0, 3)) {
        let crewId;
        const cRes = await client.query('SELECT id FROM crew WHERE name = $1', [actor]);
        if (cRes.rows.length > 0) crewId = cRes.rows[0].id;
        else {
          const inRes = await client.query('INSERT INTO crew (id, name, photo_url, role) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING id', [actor, 'https://via.placeholder.com/150x225?text=No+Photo', 'Actor']);
          crewId = inRes.rows[0].id;
        }
        await client.query('INSERT INTO movie_crew (movie_id, crew_id) VALUES ($1, $2)', [movieId, crewId]);
      }
      console.log(`Added ${title}`);
    }
  }
  await client.end();
}
seedMissingMovies().catch(console.error);
