const { Client } = require('pg');

const OMDB_API_KEY = '2ce07525';
const DB_CONNECTION = 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres';

async function seedCast() {
  const client = new Client({ connectionString: DB_CONNECTION });
  await client.connect();

  console.log('Connected to Supabase. Fetching movies...');
  const moviesRes = await client.query('SELECT id, title FROM movies');
  const movies = moviesRes.rows;

  for (const movie of movies) {
    console.log(`Processing ${movie.title}...`);
    try {
      // 1. Fetch OMDB
      const omdbUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${OMDB_API_KEY}`;
      const omdbRes = await fetch(omdbUrl);
      const omdbData = await omdbRes.json();

      if (omdbData.Response === 'True') {
        const actors = omdbData.Actors ? omdbData.Actors.split(',').map(a => a.trim()) : [];
        const directors = omdbData.Director ? omdbData.Director.split(',').map(d => d.trim()) : [];

        // 2. Fetch photos from TVMaze & Insert
        for (const actor of actors.slice(0, 5)) { // Max 5 actors
          await insertCrewMember(client, movie.id, actor, 'Actor');
        }
        for (const director of directors.slice(0, 1)) { // 1 Director
          await insertCrewMember(client, movie.id, director, 'Director');
        }
      }
    } catch (e) {
      console.error(`Failed to process ${movie.title}:`, e.message);
    }
  }

  console.log('Finished seeding cast data!');
  await client.end();
}

async function insertCrewMember(client, movieId, name, role) {
  if (name === 'N/A') return;

  try {
    // Check if crew already exists
    const checkRes = await client.query('SELECT id FROM crew WHERE name = $1', [name]);
    let crewId;

    if (checkRes.rows.length > 0) {
      crewId = checkRes.rows[0].id;
    } else {
      // Fetch photo from TVMaze
      const tvMazeUrl = `https://api.tvmaze.com/search/people?q=${encodeURIComponent(name)}`;
      const tvRes = await fetch(tvMazeUrl);
      const tvData = await tvRes.json();
      let photoUrl = 'https://via.placeholder.com/150x225?text=No+Photo';
      if (tvData && tvData.length > 0 && tvData[0].person && tvData[0].person.image && tvData[0].person.image.original) {
        photoUrl = tvData[0].person.image.original;
      }

      // Insert new crew
      const insertRes = await client.query(
        'INSERT INTO crew (name, photo_url, role) VALUES ($1, $2, $3) RETURNING id',
        [name, photoUrl, role]
      );
      crewId = insertRes.rows[0].id;
    }

    // Link movie to crew
    // Check if link exists
    const linkCheck = await client.query('SELECT 1 FROM movie_crew WHERE movie_id = $1 AND crew_id = $2', [movieId, crewId]);
    if (linkCheck.rows.length === 0) {
      await client.query('INSERT INTO movie_crew (movie_id, crew_id) VALUES ($1, $2)', [movieId, crewId]);
    }
    console.log(`Inserted ${role}: ${name}`);
  } catch (e) {
    console.error(`Error inserting crew ${name}:`, e.message);
  }
}

seedCast();
