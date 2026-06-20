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

const fallbackActors = [
  { name: "Timothée Chalamet", role: "Lead Actor", photo_url: "https://image.tmdb.org/t/p/w200/npscVnADx5O7H8a9Q4wWd7K9I5s.jpg" },
  { name: "Zendaya", role: "Lead Actress", photo_url: "https://image.tmdb.org/t/p/w200/jxwGAgL1R2YkXYfXoikjY8Tq9eG.jpg" },
  { name: "Shahid Kapoor", role: "Lead Actor", photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop" },
  { name: "Kriti Sanon", role: "Lead Actress", photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop" },
  { name: "Rashmika Mandanna", role: "Actress", photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop" }
];

const genresList = ["Action", "Sci-Fi", "Drama", "Romance", "Comedy", "Thriller", "Fantasy", "Animation"];

function generateMovie(title, idx) {
  const isBolly = ["Jawan", "Pathaan", "Animal", "Dunki", "Tiger 3", "Rocky Aur Rani Kii Prem Kahaani", "Brahmastra"].includes(title);
  
  return {
    id: crypto.randomUUID(),
    title: title.replace(/'/g, "''"),
    description: `A modern look at love, friendship, and emotional entanglements. This incredible cinematic journey builds on the original's exploration of relationships in a vibrant, contemporary world following new characters through romance, conflict, and the ups and downs of connection.`,
    release_date: `2026-06-19`,
    duration: Math.floor(Math.random() * 60) + 120, // 2h+
    poster_url: `https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&h=900&auto=format&fit=crop&sig=${idx}`,
    banner_url: `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&h=800&auto=format&fit=crop&sig=${idx + 100}`,
    status: "NOW_SHOWING",
    imdb_rating: (Math.random() * 2 + 7).toFixed(1), // 7.0 - 9.0
    rotten_tomatoes_rating: Math.floor(Math.random() * 20 + 80) + "%",
    language: isBolly ? "Hindi" : "English",
    certification: "U/A",
    director: "Christopher Nolan",
    writer: "Jonathan Nolan",
    studio: "CineNest Studios",
    accent_color: "#14b8a6"
  };
}

async function seed() {
  await client.connect();
  console.log("Connected to Supabase!");
  
  console.log("Cleaning up old data...");
  await client.query('DELETE FROM payments');
  await client.query('DELETE FROM tickets');
  await client.query('DELETE FROM bookings');
  await client.query('DELETE FROM seats');
  await client.query('DELETE FROM shows');
  await client.query('DELETE FROM screens');
  await client.query('DELETE FROM theatres');
  await client.query('DELETE FROM movie_crew');
  await client.query('DELETE FROM movie_genres');
  await client.query('DELETE FROM crew');
  await client.query('DELETE FROM genres');
  await client.query('DELETE FROM movies');

  console.log("Inserting Genres...");
  const genreMap = {};
  for (const g of genresList) {
    const id = crypto.randomUUID();
    await client.query(`INSERT INTO genres (id, name) VALUES ('${id}', '${g}')`);
    genreMap[g] = id;
  }

  console.log("Inserting Crew...");
  const crewIds = [];
  for (const c of fallbackActors) {
    const id = crypto.randomUUID();
    await client.query(`INSERT INTO crew (id, name, role, photo_url) VALUES ('${id}', '${c.name}', '${c.role}', '${c.photo_url}')`);
    crewIds.push(id);
  }
  const dirId = crypto.randomUUID();
  await client.query(`INSERT INTO crew (id, name, role, photo_url) VALUES ('${dirId}', 'Homi Adajania', 'Director', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop')`);
  crewIds.push(dirId);

  const allMovies = movieTitles.map((t, idx) => generateMovie(t, idx));
  
  console.log(`Generated ${allMovies.length} movies. Inserting into DB...`);
  
  for (const movie of allMovies) {
    // Add banner_url which we just added to the schema
    await client.query(`
      INSERT INTO movies (id, title, description, release_date, duration, poster_url, banner_url, status, imdb_rating, rotten_tomatoes_rating, language, certification, director, writer, studio, accent_color) 
      VALUES ('${movie.id}', '${movie.title}', '${movie.description.replace(/'/g, "''")}', '${movie.release_date}', ${movie.duration}, '${movie.poster_url}', '${movie.banner_url}', '${movie.status}', ${movie.imdb_rating}, '${movie.rotten_tomatoes_rating}', '${movie.language}', '${movie.certification}', '${movie.director}', '${movie.writer}', '${movie.studio}', '${movie.accent_color}')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Assign random genres
    const g1 = genresList[Math.floor(Math.random() * genresList.length)];
    let g2 = genresList[Math.floor(Math.random() * genresList.length)];
    while(g2 === g1) g2 = genresList[Math.floor(Math.random() * genresList.length)];
    
    await client.query(`INSERT INTO movie_genres (movie_id, genre_id) VALUES ('${movie.id}', '${genreMap[g1]}')`);
    await client.query(`INSERT INTO movie_genres (movie_id, genre_id) VALUES ('${movie.id}', '${genreMap[g2]}')`);

    // Assign crew
    for (const cid of crewIds) {
      await client.query(`INSERT INTO movie_crew (movie_id, crew_id) VALUES ('${movie.id}', '${cid}')`);
    }
  }

  console.log("Inserting Theatres and Shows...");
  const dates = ['2026-06-06', '2026-06-07', '2026-06-08', '2026-06-09', '2026-06-10'];

  const theatres = [
    { id: crypto.randomUUID(), name: 'PVR: Oberoi Mall, Goregaon (E)', city: 'Mumbai', address: 'Oberoi Mall, Goregaon East', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'Sun City: Vile Parle', city: 'Mumbai', address: 'Vile Parle East', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'Bahar Cinema: Vile Parle (E)', city: 'Mumbai', address: 'Vile Parle East', amenities: '{"parking": false, "food": true}' },
    { id: crypto.randomUUID(), name: 'Cinepolis: Andheri (W)', city: 'Mumbai', address: 'Andheri West', amenities: '{"parking": true, "food": true, "dolby": true}' },
  ];
  
  for (const t of theatres) {
    await client.query(`INSERT INTO theatres (id, name, city, address, amenities) VALUES ('${t.id}', '${t.name}', '${t.city}', '${t.address}', '${t.amenities}') ON CONFLICT DO NOTHING;`);
    
    const screen1Id = crypto.randomUUID();
    const screen2Id = crypto.randomUUID();
    await client.query(`INSERT INTO screens (id, name, theatre_id, seat_capacity) VALUES ('${screen1Id}', 'English 2D', '${t.id}', 100) ON CONFLICT DO NOTHING;`);
    await client.query(`INSERT INTO screens (id, name, theatre_id, seat_capacity) VALUES ('${screen2Id}', 'Hindi 2D', '${t.id}', 100) ON CONFLICT DO NOTHING;`);
    
    // Shows
    for (const movie of allMovies) {
      if (Math.random() > 0.3) {
         const screenId = Math.random() > 0.5 ? screen1Id : screen2Id;
         // Generate shows for a few days
         for (const date of dates) {
            await client.query(`
               INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
               VALUES 
               ('${crypto.randomUUID()}', '${movie.id}', '${screenId}', '${date}', '10:33:00', 250),
               ('${crypto.randomUUID()}', '${movie.id}', '${screenId}', '${date}', '15:58:00', 300),
               ('${crypto.randomUUID()}', '${movie.id}', '${screenId}', '${date}', '16:45:00', 350)
            `);
         }
      }
    }
  }
  
  console.log("Seeding fully complete! Rich metadata added.");
  client.end();
}

seed().catch(console.error);
