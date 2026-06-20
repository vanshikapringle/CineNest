const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
});

const searchTerms = ["marvel", "bollywood", "ice age", "harry potter", "lord of the rings", "batman", "mission impossible", "star wars"];

async function fetchMovies(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=movie&limit=6`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map(m => {
    return {
      id: crypto.randomUUID(),
      title: m.trackName?.replace(/'/g, "''"),
      description: (m.longDescription || m.shortDescription || "An amazing cinematic experience.")?.replace(/'/g, "''"),
      release_date: m.releaseDate ? m.releaseDate.split('T')[0] : '2024-01-01',
      duration: Math.floor((m.trackTimeMillis || 7200000) / 60000),
      poster_url: m.artworkUrl100?.replace('100x100bb', '600x600bb') || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000",
      status: "NOW_SHOWING",
      imdb_rating: (Math.random() * 3 + 6).toFixed(1), // Random 6.0 to 9.0
      rotten_tomatoes_rating: Math.floor(Math.random() * 40 + 60) + "%" // 60% to 100%
    };
  });
}

async function seed() {
  await client.connect();
  console.log("Connected to Supabase!");
  
  // Clean up existing shows and movies
  await client.query('DELETE FROM shows');
  await client.query('DELETE FROM movies');

  let allMovies = [];
  for (const term of searchTerms) {
    console.log(`Fetching movies for ${term}...`);
    const movies = await fetchMovies(term);
    allMovies = allMovies.concat(movies);
  }
  
  console.log(`Fetched ${allMovies.length} movies. Inserting into DB...`);
  
  for (const movie of allMovies) {
    if (!movie.title) continue;
    try {
      await client.query(`
        INSERT INTO movies (id, title, description, release_date, duration, poster_url, status, imdb_rating, rotten_tomatoes_rating) 
        VALUES ('${movie.id}', '${movie.title}', '${movie.description}', '${movie.release_date}', ${movie.duration}, '${movie.poster_url}', '${movie.status}', ${movie.imdb_rating}, '${movie.rotten_tomatoes_rating}')
        ON CONFLICT (id) DO NOTHING;
      `);
    } catch (e) {
      console.log("Failed to insert movie: " + movie.title + " error: " + e.message);
    }
  }

  // Insert theatres
  const theatres = [
    { id: crypto.randomUUID(), name: 'CineNest Prime', city: 'Mumbai', address: '123 Andheri', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'CineNest Luxe', city: 'Delhi', address: '456 Connaught Place', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'CineNest IMAX', city: 'Bangalore', address: '789 MG Road', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'CineNest Classic', city: 'Chennai', address: '101 Anna Salai', amenities: '{"parking": false, "food": true}' },
  ];
  
  for (const t of theatres) {
    await client.query(`INSERT INTO theatres (id, name, city, address, amenities) VALUES ('${t.id}', '${t.name}', '${t.city}', '${t.address}', '${t.amenities}') ON CONFLICT DO NOTHING;`);
    
    // Insert 2 screens per theatre
    const screen1Id = crypto.randomUUID();
    const screen2Id = crypto.randomUUID();
    await client.query(`INSERT INTO screens (id, name, theatre_id) VALUES ('${screen1Id}', 'Screen 1', '${t.id}') ON CONFLICT DO NOTHING;`);
    await client.query(`INSERT INTO screens (id, name, theatre_id) VALUES ('${screen2Id}', 'Screen 2', '${t.id}') ON CONFLICT DO NOTHING;`);
    
    // Assign random shows to screens
    for (const movie of allMovies) {
      if (Math.random() > 0.3) {
         // 70% chance this movie shows at this theatre
         const showId1 = crypto.randomUUID();
         const showId2 = crypto.randomUUID();
         const basePrice = Math.floor(Math.random() * 200 + 200); // 200 to 400
         const screenId = Math.random() > 0.5 ? screen1Id : screen2Id;
         await client.query(`
            INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
            VALUES 
            ('${showId1}', '${movie.id}', '${screenId}', '2024-12-01', '10:30:00', ${basePrice}),
            ('${showId2}', '${movie.id}', '${screenId}', '2024-12-01', '18:00:00', ${basePrice + 50})
            ON CONFLICT DO NOTHING;
         `);
      }
    }
  }
  
  console.log("Seeding fully complete! Enjoy your movies.");
  client.end();
}

seed().catch(console.error);
