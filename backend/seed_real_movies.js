const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
});

const movieTitles = [
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "Gladiator",
  "The Shawshank Redemption",
  "Pulp Fiction",
  "Forrest Gump",
  "The Matrix",
  "Goodfellas",
  "Se7en",
  "The Silence of the Lambs",
  "City of God",
  "The Green Mile",
  "Saving Private Ryan",
  "Parasite",
  "Spirited Away",
  "The Lion King",
  "The Prestige",
  "Apocalypse Now",
  "Memento",
  "Joker",
  "Spider-Man: Into the Spider-Verse",
  "Coco",
  "WALL·E",
  "Avengers: Endgame",
  "Oldboy",
  "Your Name.",
  "Amélie",
  "Toy Story",
  "Inglourious Basterds",
  "Good Will Hunting",
  "Requiem for a Dream",
  "2001: A Space Odyssey",
  "Eternal Sunshine of the Spotless Mind",
  "A Clockwork Orange",
  "Up",
  "Die Hard",
  "Heat",
  "Dune: Part Two",
  "Oppenheimer"
];

async function seedOMDB() {
  await client.connect();
  console.log("Connected to Supabase!");

  // Delete all movies to clean up the bad fake TMDB links
  console.log("Cleaning up existing movies...");
  await client.query('DELETE FROM shows');
  await client.query('DELETE FROM movie_genres');
  await client.query('DELETE FROM movie_crew');
  await client.query('DELETE FROM movies');

  const allScreensRes = await client.query('SELECT id FROM screens');
  const screens = allScreensRes.rows;
  
  // Generate next 7 days in IST
  const dates = [];
  for(let i=0; i<7; i++) {
    const d = new Date();
    // Adjust to IST (+5:30)
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  for (const title of movieTitles) {
    console.log(`Fetching OMDB data for: ${title}`);
    const res = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=trilogy`);
    const data = await res.json();
    
    if (data.Response === 'True') {
      const movieId = crypto.randomUUID();
      
      let releaseDate = '2026-06-01';
      if (data.Released !== 'N/A') {
        const d = new Date(data.Released);
        if (!isNaN(d)) releaseDate = d.toISOString().split('T')[0];
      }
      
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
        "NOW_SHOWING", imdbRating, rtRating, (data.Language ? data.Language.split(',')[0] : 'English'), cert, data.Director, data.Writer, "CineNest Studios", "#111827"
      ]);
      
      console.log(`Inserted movie: ${data.Title}`);
      
      // Genres
      if (data.Genre && data.Genre !== 'N/A') {
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
      
      // Create shows for this new movie on randomly selected screens
      const selectedScreens = screens.sort(() => 0.5 - Math.random()).slice(0, 3); // Pick 3 random screens
      for (const screen of selectedScreens) {
        for (const date of dates) {
          try {
              await client.query(`
                INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
                VALUES 
                ($1, $2, $3, $4, $5, $6),
                ($7, $8, $9, $10, $11, $12)
              `, [
                crypto.randomUUID(), movieId, screen.id, date, '11:00:00', 250,
                crypto.randomUUID(), movieId, screen.id, date, '18:30:00', 300
              ]);
          } catch(e){}
        }
      }
    } else {
      console.log(`Failed to fetch OMDB data for: ${title}`);
    }
  }

  console.log("Done seeding real movies.");
  await client.end();
}

seedOMDB().catch(console.error);
