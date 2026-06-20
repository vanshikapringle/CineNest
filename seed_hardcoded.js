const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
});

const movieTitles = [
  "Avengers: Endgame", "Iron Man", "Spider-Man: No Way Home", "Thor: Ragnarok", "Captain America: Civil War", "Black Panther", "Doctor Strange",
  "Jawan", "Pathaan", "Animal", "Dunki", "Tiger 3", "Rocky Aur Rani Kii Prem Kahaani", "Brahmastra",
  "Ice Age", "Ice Age: The Meltdown", "Ice Age: Dawn of the Dinosaurs", "Ice Age: Continental Drift",
  "Harry Potter and the Sorcerer's Stone", "Harry Potter and the Chamber of Secrets", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Goblet of Fire",
  "The Lord of the Rings: The Fellowship of the Ring", "The Lord of the Rings: The Two Towers", "The Lord of the Rings: The Return of the King",
  "The Dark Knight", "Inception", "Interstellar", "The Matrix", "Avatar", "Titanic", "Jurassic Park", "The Lion King", "Gladiator", "Forrest Gump", "Pulp Fiction", "The Shawshank Redemption", "The Godfather", "The Terminator", "Alien"
];

function generateMovie(title, idx) {
  return {
    id: crypto.randomUUID(),
    title: title.replace(/'/g, "''"),
    description: "An incredible cinematic journey and a must-watch experience for fans around the world.",
    release_date: `202${Math.floor(Math.random() * 4)}-0${Math.floor(Math.random() * 8) + 1}-15`,
    duration: Math.floor(Math.random() * 60) + 90,
    poster_url: `https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&sig=${idx}`,
    status: "NOW_SHOWING",
    imdb_rating: (Math.random() * 3 + 6).toFixed(1),
    rotten_tomatoes_rating: Math.floor(Math.random() * 40 + 60) + "%"
  };
}

async function seed() {
  await client.connect();
  console.log("Connected to Supabase!");
  
  await client.query('DELETE FROM shows');
  await client.query('DELETE FROM movies');

  const allMovies = movieTitles.map((t, idx) => generateMovie(t, idx));
  
  console.log(`Generated ${allMovies.length} movies. Inserting into DB...`);
  
  for (const movie of allMovies) {
    await client.query(`
      INSERT INTO movies (id, title, description, release_date, duration, poster_url, status, imdb_rating, rotten_tomatoes_rating) 
      VALUES ('${movie.id}', '${movie.title}', '${movie.description}', '${movie.release_date}', ${movie.duration}, '${movie.poster_url}', '${movie.status}', ${movie.imdb_rating}, '${movie.rotten_tomatoes_rating}')
      ON CONFLICT (id) DO NOTHING;
    `);
  }

  const theatres = [
    { id: crypto.randomUUID(), name: 'CineNest Prime', city: 'Mumbai', address: '123 Andheri', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'CineNest Luxe', city: 'Delhi', address: '456 Connaught Place', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'CineNest IMAX', city: 'Bangalore', address: '789 MG Road', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'CineNest Classic', city: 'Chennai', address: '101 Anna Salai', amenities: '{"parking": false, "food": true}' },
  ];
  
  for (const t of theatres) {
    await client.query(`INSERT INTO theatres (id, name, city, address, amenities) VALUES ('${t.id}', '${t.name}', '${t.city}', '${t.address}', '${t.amenities}') ON CONFLICT DO NOTHING;`);
    
    const screen1Id = crypto.randomUUID();
    const screen2Id = crypto.randomUUID();
    await client.query(`INSERT INTO screens (id, name, theatre_id) VALUES ('${screen1Id}', 'Screen 1', '${t.id}') ON CONFLICT DO NOTHING;`);
    await client.query(`INSERT INTO screens (id, name, theatre_id) VALUES ('${screen2Id}', 'Screen 2', '${t.id}') ON CONFLICT DO NOTHING;`);
    
    for (const movie of allMovies) {
      if (Math.random() > 0.4) {
         const showId1 = crypto.randomUUID();
         const showId2 = crypto.randomUUID();
         const basePrice = Math.floor(Math.random() * 200 + 200);
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
