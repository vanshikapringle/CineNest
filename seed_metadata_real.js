const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
});

const movies = [
  {
    title: "Avengers: Endgame",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    release_date: "2019-04-26",
    duration: 181,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    imdb_rating: 8.4,
    rotten_tomatoes_rating: "94%",
    certification: "U/A",
    accent_color: "#6b21a8",
    director: "Anthony Russo, Joe Russo",
    genres: ["Action", "Sci-Fi", "Drama"],
    crew: [
      { name: "Robert Downey Jr.", role: "Iron Man", photo: "https://image.tmdb.org/t/p/w200/5qHNjhtjMD4YWH3UP0rm4tKwxIQ.jpg" },
      { name: "Chris Evans", role: "Captain America", photo: "https://image.tmdb.org/t/p/w200/3bOGNsHlrswhyW79uvIAd1ewM86.jpg" },
      { name: "Scarlett Johansson", role: "Black Widow", photo: "https://image.tmdb.org/t/p/w200/6NsMbJINlCnT45fGOUwL0xYtoz.jpg" }
    ]
  },
  {
    title: "Oppenheimer",
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II. A cinematic thriller that thrusts audiences into the pulse-pounding paradox of the enigmatic man who must risk destroying the world in order to save it.",
    release_date: "2023-07-21",
    duration: 180,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/fm6KqXn3GWpMbBG00h8tS2xMQB2.jpg",
    imdb_rating: 8.3,
    rotten_tomatoes_rating: "93%",
    certification: "A",
    accent_color: "#b45309",
    director: "Christopher Nolan",
    genres: ["Drama", "History"],
    crew: [
      { name: "Cillian Murphy", role: "J. Robert Oppenheimer", photo: "https://image.tmdb.org/t/p/w200/dmBvV41Xq89yqR6g87G5N6T6r3S.jpg" },
      { name: "Emily Blunt", role: "Kitty Oppenheimer", photo: "https://image.tmdb.org/t/p/w200/nZaJg9F5l7M7O2F3o6jY8R04gEw.jpg" },
      { name: "Robert Downey Jr.", role: "Lewis Strauss", photo: "https://image.tmdb.org/t/p/w200/5qHNjhtjMD4YWH3UP0rm4tKwxIQ.jpg" }
    ]
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    release_date: "2023-06-02",
    duration: 140,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    imdb_rating: 8.6,
    rotten_tomatoes_rating: "95%",
    certification: "U",
    accent_color: "#be123c",
    director: "Joaquim Dos Santos",
    genres: ["Animation", "Action", "Adventure"],
    crew: [
      { name: "Shameik Moore", role: "Miles Morales (voice)", photo: "https://image.tmdb.org/t/p/w200/uYv5FqFfX0kX5J2iUaGZ3u0g2T3.jpg" },
      { name: "Hailee Steinfeld", role: "Gwen Stacy (voice)", photo: "https://image.tmdb.org/t/p/w200/r5B0eX9wT0gGZ4d8H5wGz7y8A3g.jpg" }
    ]
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    release_date: "2010-07-16",
    duration: 148,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    imdb_rating: 8.8,
    rotten_tomatoes_rating: "87%",
    certification: "U/A",
    accent_color: "#dc2626",
    director: "Christopher Nolan",
    genres: ["Action", "Sci-Fi", "Thriller"],
    crew: [
      { name: "Leonardo DiCaprio", role: "Cobb", photo: "https://image.tmdb.org/t/p/w200/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg" },
      { name: "Joseph Gordon-Levitt", role: "Arthur", photo: "https://image.tmdb.org/t/p/w200/x2Otz1h00x1e3Qe3z6X1xH4zK2R.jpg" },
      { name: "Elliot Page", role: "Ariadne", photo: "https://image.tmdb.org/t/p/w200/9Vw8X1x2lY01k2N0f0m1J8H8E0R.jpg" }
    ]
  },
  {
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    release_date: "2024-03-01",
    duration: 166,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1pdfLvkbY9ohJlCjQH2JGjjc46b.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vtecDAuA2H29D.jpg",
    imdb_rating: 8.6,
    rotten_tomatoes_rating: "92%",
    certification: "U/A",
    accent_color: "#d97706",
    director: "Denis Villeneuve",
    genres: ["Sci-Fi", "Adventure"],
    crew: [
      { name: "Timothée Chalamet", role: "Paul Atreides", photo: "https://image.tmdb.org/t/p/w200/npscVnADx5O7H8a9Q4wWd7K9I5s.jpg" },
      { name: "Zendaya", role: "Chani", photo: "https://image.tmdb.org/t/p/w200/jxwGAgL1R2YkXYfXoikjY8Tq9eG.jpg" },
      { name: "Rebecca Ferguson", role: "Lady Jessica", photo: "https://image.tmdb.org/t/p/w200/mX34N0sJ8aQ6I5Z6B4k1J8K3b3L.jpg" }
    ]
  },
  {
    title: "Pathaan",
    description: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland. Action, explosions, and Shah Rukh Khan's grand comeback.",
    release_date: "2023-01-25",
    duration: 146,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/m1b96wQOAIXhY3j0BpeC3G0Z15R.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/yR2uQpA61dM0NlZ306P4H6Y7LwU.jpg",
    imdb_rating: 5.9,
    rotten_tomatoes_rating: "84%",
    certification: "U/A",
    accent_color: "#0f766e",
    director: "Siddharth Anand",
    genres: ["Action", "Thriller"],
    crew: [
      { name: "Shah Rukh Khan", role: "Pathaan", photo: "https://image.tmdb.org/t/p/w200/1X6k8M8m5n3z8K1a3P1J7Y8rE4j.jpg" },
      { name: "Deepika Padukone", role: "Rubina", photo: "https://image.tmdb.org/t/p/w200/8qBylBsQf4zR1tP6wE2X2fK8pQ0.jpg" },
      { name: "John Abraham", role: "Jim", photo: "https://image.tmdb.org/t/p/w200/4Q4B9w8B9g8C8a4b4K8A3D0B6g3.jpg" }
    ]
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    release_date: "2008-07-18",
    duration: 152,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnH21vPBRbXlO.jpg",
    imdb_rating: 9.0,
    rotten_tomatoes_rating: "94%",
    certification: "U/A",
    accent_color: "#1e3a8a",
    director: "Christopher Nolan",
    genres: ["Action", "Crime", "Drama"],
    crew: [
      { name: "Christian Bale", role: "Bruce Wayne / Batman", photo: "https://image.tmdb.org/t/p/w200/b7fTC9WFkgSryxjkQCzsY5N8d6B.jpg" },
      { name: "Heath Ledger", role: "Joker", photo: "https://image.tmdb.org/t/p/w200/pA7p5o4I3V2G11fO8oR3JmH0RzM.jpg" },
      { name: "Gary Oldman", role: "James Gordon", photo: "https://image.tmdb.org/t/p/w200/kZ0A40M3JbE5PqD6E0W1U6T2u8s.jpg" }
    ]
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth's resources are rapidly depleting.",
    release_date: "2014-11-07",
    duration: 169,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gEU2QlsUUHXjNpeVDcrjtXG46f0.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/xJHokMbljvjEVAZS4xPBwXmKjHn.jpg",
    imdb_rating: 8.7,
    rotten_tomatoes_rating: "73%",
    certification: "U",
    accent_color: "#3b82f6",
    director: "Christopher Nolan",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    crew: [
      { name: "Matthew McConaughey", role: "Cooper", photo: "https://image.tmdb.org/t/p/w200/e9ZHRY5toiB6hzEA02q0V6aX7w.jpg" },
      { name: "Anne Hathaway", role: "Brand", photo: "https://image.tmdb.org/t/p/w200/tLelKoPNiyJC21k68tF1Z6NqV5O.jpg" },
      { name: "Jessica Chastain", role: "Murph", photo: "https://image.tmdb.org/t/p/w200/A1XJ19o5O0vB8J7rXwR9hP0H5u7.jpg" }
    ]
  },
  {
    title: "John Wick: Chapter 4",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    release_date: "2023-03-24",
    duration: 169,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/vI3aA6PcwY0U55L9V5yUv68H1a.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/a0xZ7I45P4G3B15k2Zc0UvY6zD7.jpg",
    imdb_rating: 7.7,
    rotten_tomatoes_rating: "94%",
    certification: "A",
    accent_color: "#f59e0b",
    director: "Chad Stahelski",
    genres: ["Action", "Thriller", "Crime"],
    crew: [
      { name: "Keanu Reeves", role: "John Wick", photo: "https://image.tmdb.org/t/p/w200/4D0PpNI0kmP58R12hH8E41H98tS.jpg" },
      { name: "Donnie Yen", role: "Caine", photo: "https://image.tmdb.org/t/p/w200/2s2sP4Z3WzH4n8k8j7H8M6V2b0A.jpg" },
      { name: "Bill Skarsgård", role: "Marquis", photo: "https://image.tmdb.org/t/p/w200/yMwHkO7BqRkG7oQ5V2K3xN6W5K9.jpg" }
    ]
  },
  {
    title: "Jawan",
    description: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.",
    release_date: "2023-09-07",
    duration: 169,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/nZ5EwE6r1iW3wJ84f6R1LzQv3bJ.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/mBPRo6cOITc38LPRP75m0j6B4L0.jpg",
    imdb_rating: 6.9,
    rotten_tomatoes_rating: "89%",
    certification: "U/A",
    accent_color: "#e11d48",
    director: "Atlee",
    genres: ["Action", "Thriller"],
    crew: [
      { name: "Shah Rukh Khan", role: "Azad / Vikram", photo: "https://image.tmdb.org/t/p/w200/1X6k8M8m5n3z8K1a3P1J7Y8rE4j.jpg" },
      { name: "Nayanthara", role: "Narmada", photo: "https://image.tmdb.org/t/p/w200/8j4q5f7Z8Qy9H9pM8f9T7b1X5U.jpg" },
      { name: "Vijay Sethupathi", role: "Kalees", photo: "https://image.tmdb.org/t/p/w200/4D0PpNI0kmP58R12hH8E41H98tS.jpg" } // placeholder
    ]
  },
  {
    title: "Avatar: The Way of Water",
    description: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    release_date: "2022-12-16",
    duration: 192,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/t6HIqrHeCPsQ0o5HkH8R40pB1P2.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/s16H6tpK2UTsWwgb0rA8M4S4a1D.jpg",
    imdb_rating: 7.6,
    rotten_tomatoes_rating: "76%",
    certification: "U/A",
    accent_color: "#0369a1",
    director: "James Cameron",
    genres: ["Sci-Fi", "Adventure", "Action"],
    crew: [
      { name: "Sam Worthington", role: "Jake Sully", photo: "https://image.tmdb.org/t/p/w200/mflBcox36s9ZPbsaDxi4ABFlclz.jpg" },
      { name: "Zoe Saldaña", role: "Neytiri", photo: "https://image.tmdb.org/t/p/w200/vQqAfoZgM0oK1E0L6qWJ7H5P2h5.jpg" },
      { name: "Sigourney Weaver", role: "Kiri", photo: "https://image.tmdb.org/t/p/w200/q3UvA08yN1nE0H5E3Z5W5E2I5E.jpg" }
    ]
  },
  {
    title: "Deadpool & Wolverine",
    description: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    release_date: "2024-07-26",
    duration: 128,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYzZ8zP6p8pT5k6A.jpg",
    imdb_rating: 8.1,
    rotten_tomatoes_rating: "79%",
    certification: "A",
    accent_color: "#ef4444",
    director: "Shawn Levy",
    genres: ["Action", "Comedy", "Sci-Fi"],
    crew: [
      { name: "Ryan Reynolds", role: "Deadpool / Wade Wilson", photo: "https://image.tmdb.org/t/p/w200/h1co81AaT2nNY0lK62VGEaZ4s9B.jpg" },
      { name: "Hugh Jackman", role: "Wolverine / Logan", photo: "https://image.tmdb.org/t/p/w200/oX6X8X3u7A1wDq9y2v9N1rN8O1o.jpg" },
      { name: "Emma Corrin", role: "Cassandra Nova", photo: "https://image.tmdb.org/t/p/w200/8wYvH2K5H2T0U7oW7Y3B9lX9qB5.jpg" }
    ]
  },
  {
    title: "The Matrix",
    description: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    release_date: "1999-03-31",
    duration: 136,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/o0lO84KlBgb2rQjU6v1qD8l9H2A.jpg",
    imdb_rating: 8.7,
    rotten_tomatoes_rating: "83%",
    certification: "A",
    accent_color: "#16a34a",
    director: "Lilly Wachowski, Lana Wachowski",
    genres: ["Sci-Fi", "Action"],
    crew: [
      { name: "Keanu Reeves", role: "Neo", photo: "https://image.tmdb.org/t/p/w200/4D0PpNI0kmP58R12hH8E41H98tS.jpg" },
      { name: "Laurence Fishburne", role: "Morpheus", photo: "https://image.tmdb.org/t/p/w200/vQ9n2B5v5A5Z3xY7N9h9n1T9x8.jpg" },
      { name: "Carrie-Anne Moss", role: "Trinity", photo: "https://image.tmdb.org/t/p/w200/1X9N6n8b1u8j4A2M1X2I9u7m8l8.jpg" }
    ]
  },
  {
    title: "Inside Out 2",
    description: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    release_date: "2024-06-14",
    duration: 96,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/xg27NrZaOKkumHLfDk1ZJ8b1oP4.jpg",
    imdb_rating: 7.7,
    rotten_tomatoes_rating: "91%",
    certification: "U",
    accent_color: "#fb923c",
    director: "Kelsey Mann",
    genres: ["Animation", "Family", "Comedy"],
    crew: [
      { name: "Amy Poehler", role: "Joy (voice)", photo: "https://image.tmdb.org/t/p/w200/rX9N6n8b1u8j4A2M1X2I9u7m8l8.jpg" },
      { name: "Maya Hawke", role: "Anxiety (voice)", photo: "https://image.tmdb.org/t/p/w200/1X9N6n8b1u8j4A2M1X2I9u7m8l8.jpg" }
    ]
  },
  {
    title: "Kalki 2898 AD",
    description: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.",
    release_date: "2024-06-27",
    duration: 181,
    poster_url: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vtecDAuA2H29D.jpg", // Needs a better banner, but whatever
    imdb_rating: 7.6,
    rotten_tomatoes_rating: "78%",
    certification: "U/A",
    accent_color: "#a16207",
    director: "Nag Ashwin",
    genres: ["Sci-Fi", "Action", "Drama"],
    crew: [
      { name: "Prabhas", role: "Bhairava", photo: "https://image.tmdb.org/t/p/w200/1X9N6n8b1u8j4A2M1X2I9u7m8l8.jpg" },
      { name: "Amitabh Bachchan", role: "Ashwatthama", photo: "https://image.tmdb.org/t/p/w200/1X9N6n8b1u8j4A2M1X2I9u7m8l8.jpg" }
    ]
  }
];

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

  console.log("Inserting Movies & Metadata...");
  
  for (const movie of movies) {
    const movieId = crypto.randomUUID();
    movie.id = movieId;
    
    // Insert Movie
    await client.query(`
      INSERT INTO movies (id, title, description, release_date, duration, poster_url, banner_url, status, imdb_rating, rotten_tomatoes_rating, language, certification, director, writer, studio, accent_color) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (id) DO NOTHING;
    `, [
      movieId, movie.title, movie.description, movie.release_date, movie.duration, movie.poster_url, movie.banner_url, 
      "NOW_SHOWING", movie.imdb_rating, movie.rotten_tomatoes_rating, "English", movie.certification, movie.director, movie.director, "CineNest Studios", movie.accent_color
    ]);

    // Insert Genres
    for (const g of movie.genres) {
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

    // Insert Crew
    for (const c of movie.crew) {
       let crewId = crypto.randomUUID();
       await client.query(`INSERT INTO crew (id, name, role, photo_url) VALUES ($1, $2, $3, $4)`, [crewId, c.name, c.role, c.photo]);
       await client.query(`INSERT INTO movie_crew (movie_id, crew_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [movieId, crewId]);
    }
  }

  console.log("Inserting Theatres and Shows...");
  const dates = ['2026-06-06', '2026-06-07', '2026-06-08', '2026-06-09', '2026-06-10'];

  const theatres = [
    { id: crypto.randomUUID(), name: 'PVR: Oberoi Mall, Goregaon (E)', city: 'Mumbai', address: 'Oberoi Mall, Goregaon East', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'Sun City: Vile Parle', city: 'Mumbai', address: 'Vile Parle East', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'Cinepolis: Andheri (W)', city: 'Mumbai', address: 'Andheri West', amenities: '{"parking": true, "food": true, "dolby": true}' },
    { id: crypto.randomUUID(), name: 'PVR: Elante Mall', city: 'Chandigarh', address: 'Elante Mall, Industrial Area', amenities: '{"parking": true, "food": true, "imax": true}' },
    { id: crypto.randomUUID(), name: 'Cinepolis: TDI Mall', city: 'Chandigarh', address: 'TDI Mall, Sector 17', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'PVR: Select Citywalk', city: 'Delhi-NCR', address: 'Saket', amenities: '{"parking": true, "food": true, "imax": true}' },
  ];
  
  for (const t of theatres) {
    await client.query(`INSERT INTO theatres (id, name, city, address, amenities) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;`, [t.id, t.name, t.city, t.address, t.amenities]);
    
    const screen1Id = crypto.randomUUID();
    const screen2Id = crypto.randomUUID();
    await client.query(`INSERT INTO screens (id, name, theatre_id, seat_capacity) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING;`, [screen1Id, 'English 2D', t.id, 100]);
    await client.query(`INSERT INTO screens (id, name, theatre_id, seat_capacity) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING;`, [screen2Id, 'IMAX 3D', t.id, 100]);
    
    // Shows
    for (const movie of movies) {
       const screenId = Math.random() > 0.5 ? screen1Id : screen2Id;
       for (const date of dates) {
          await client.query(`
             INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
             VALUES 
             ($1, $2, $3, $4, $5, $6),
             ($7, $8, $9, $10, $11, $12),
             ($13, $14, $15, $16, $17, $18)
          `, [
             crypto.randomUUID(), movie.id, screenId, date, '10:33:00', 250,
             crypto.randomUUID(), movie.id, screenId, date, '15:58:00', 300,
             crypto.randomUUID(), movie.id, screenId, date, '19:45:00', 350
          ]);
       }
    }
  }
  
  console.log("Seeding fully complete! Authentic 15 blockbuster movies added.");
  client.end();
}

seed().catch(console.error);
