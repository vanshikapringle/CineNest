const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
});

const movieTitles = [
  "Ice Age",
  "Barbie",
  "Animal",
  "Fighter",
  "Dunki",
  "Tiger 3",
  "Obsession",
  "Michael",
  "The Super Mario Bros. Movie",
  "K.G.F: Chapter 2",
  "Rocky Aur Rani Kii Prem Kahaani",
  "Salaar",
  "Leo",
  "Gadar 2",
  "Pushpa: The Rise"
];

async function seedOMDB() {
  await client.connect();
  console.log("Connected to Supabase!");

  const allScreensRes = await client.query('SELECT id FROM screens');
  const screens = allScreensRes.rows;
  const dates = ['2026-06-06', '2026-06-07', '2026-06-08', '2026-06-09', '2026-06-10'];

  for (const title of movieTitles) {
    console.log(`Fetching OMDB data for: ${title}`);
    const res = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=trilogy`);
    const data = await res.json();
    
    if (data.Response === 'True') {
      const movieId = crypto.randomUUID();
      
      // Parse release date
      let releaseDate = '2026-06-01';
      if (data.Released !== 'N/A') {
        const d = new Date(data.Released);
        if (!isNaN(d)) releaseDate = d.toISOString().split('T')[0];
      }
      
      // Parse duration
      let duration = 120;
      if (data.Runtime !== 'N/A') {
        duration = parseInt(data.Runtime.split(' ')[0]) || 120;
      }
      
      const posterUrl = data.Poster !== 'N/A' ? data.Poster : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000';
      const imdbRating = parseFloat(data.imdbRating) || 7.0;
      const rtRating = data.Ratings && data.Ratings.find(r => r.Source === 'Rotten Tomatoes') ? data.Ratings.find(r => r.Source === 'Rotten Tomatoes').Value : '80%';
      const cert = data.Rated !== 'N/A' ? data.Rated : 'U/A';
      
      await client.query(`
        INSERT INTO movies (id, title, description, release_date, duration, poster_url, banner_url, status, imdb_rating, rotten_tomatoes_rating, language, certification, director, writer, studio, accent_color) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (id) DO NOTHING;
      `, [
        movieId, data.Title, data.Plot, releaseDate, duration, posterUrl, posterUrl, 
        "NOW_SHOWING", imdbRating, rtRating, data.Language.split(',')[0], cert, data.Director, data.Writer, "CineNest Studios", "#111827"
      ]);
      
      console.log(`Inserted movie: ${data.Title}`);
      
      // Genres
      if (data.Genre !== 'N/A') {
        const genres = data.Genre.split(',').map(g => g.trim());
        for (const g of genres) {
           const genreResult = await client.query(`SELECT id FROM genres WHERE name = $1`, [g]);
           let genreId;
           if (genreResult.rows.length > 0) {
               genreId = genreResult.rows[0].id;
           } else {
               genreId = crypto.randomUUID();
               await client.query(`INSERT INTO genres (id, name) VALUES ($1, $2)`, [genreId, g]);
           }
           await client.query(`INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [movieId, genreId]);
        }
      }
      
      // Actors
      if (data.Actors !== 'N/A') {
        const actors = data.Actors.split(',').map(a => a.trim());
        for (const actor of actors) {
           // Search if actor exists
           const crewResult = await client.query(`SELECT id FROM crew WHERE name = $1 LIMIT 1`, [actor]);
           let crewId;
           if (crewResult.rows.length > 0) {
               crewId = crewResult.rows[0].id;
           } else {
               crewId = crypto.randomUUID();
               // Fetch photo from TVMaze
               let photoUrl = null;
               try {
                 const tvRes = await fetch(`https://api.tvmaze.com/search/people?q=${encodeURIComponent(actor)}`);
                 const tvData = await tvRes.json();
                 if (tvData && tvData.length > 0 && tvData[0].person && tvData[0].person.image) {
                   photoUrl = tvData[0].person.image.medium;
                 }
               } catch (e) {}
               await client.query(`INSERT INTO crew (id, name, role, photo_url) VALUES ($1, $2, $3, $4)`, [crewId, actor, 'Actor', photoUrl]);
           }
           await client.query(`INSERT INTO movie_crew (movie_id, crew_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [movieId, crewId]);
        }
      }
      
      // Create shows for this new movie on randomly selected screens
      const selectedScreens = screens.sort(() => 0.5 - Math.random()).slice(0, 5); // Pick 5 random screens
      for (const screen of selectedScreens) {
        for (const date of dates) {
          await client.query(`
            INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
            VALUES 
            ($1, $2, $3, $4, $5, $6),
            ($7, $8, $9, $10, $11, $12)
          `, [
            crypto.randomUUID(), movieId, screen.id, date, '11:00:00', 250,
            crypto.randomUUID(), movieId, screen.id, date, '18:30:00', 300
          ]);
        }
      }
    } else {
      console.log(`Failed to fetch OMDB data for: ${title}`);
    }
  }

  console.log("Done seeding new movies.");
  await client.end();
}

seedOMDB().catch(console.error);
