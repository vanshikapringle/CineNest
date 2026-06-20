const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
  keepAlive: true,
});

const moviesToSeed = [
  { title: "Inception", language: "English", duration: 148, certification: "U/A", releaseDate: "2010-07-16", imdb: 8.8, rt: "87%", status: "NOW_SHOWING" },
  { title: "The Dark Knight", language: "English", duration: 152, certification: "U/A", releaseDate: "2008-07-18", imdb: 9.0, rt: "94%", status: "NOW_SHOWING" },
  { title: "Interstellar", language: "English", duration: 169, certification: "U/A", releaseDate: "2014-11-07", imdb: 8.7, rt: "73%", status: "NOW_SHOWING" },
  { title: "Gladiator", language: "English", duration: 155, certification: "U/A", releaseDate: "2000-05-05", imdb: 8.5, rt: "80%", status: "NOW_SHOWING" },
  { title: "The Shawshank Redemption", language: "English", duration: 142, certification: "A", releaseDate: "1994-09-23", imdb: 9.3, rt: "91%", status: "NOW_SHOWING" },
  { title: "Pulp Fiction", language: "English", duration: 154, certification: "A", releaseDate: "1994-10-14", imdb: 8.9, rt: "92%", status: "NOW_SHOWING" },
  { title: "Forrest Gump", language: "English", duration: 142, certification: "U/A", releaseDate: "1994-07-06", imdb: 8.8, rt: "71%", status: "NOW_SHOWING" },
  { title: "The Matrix", language: "English", duration: 136, certification: "U/A", releaseDate: "1999-03-31", imdb: 8.7, rt: "83%", status: "NOW_SHOWING" },
  { title: "Goodfellas", language: "English", duration: 145, certification: "A", releaseDate: "1990-09-19", imdb: 8.7, rt: "95%", status: "NOW_SHOWING" },
  { title: "Se7en", language: "English", duration: 127, certification: "A", releaseDate: "1995-09-22", imdb: 8.6, rt: "83%", status: "NOW_SHOWING" },
  { title: "The Silence of the Lambs", language: "English", duration: 118, certification: "A", releaseDate: "1991-02-14", imdb: 8.6, rt: "95%", status: "NOW_SHOWING" },
  { title: "City of God", language: "Portuguese", duration: 130, certification: "A", releaseDate: "2002-08-30", imdb: 8.6, rt: "91%", status: "NOW_SHOWING" },
  { title: "The Green Mile", language: "English", duration: 189, certification: "A", releaseDate: "1999-12-10", imdb: 8.6, rt: "79%", status: "NOW_SHOWING" },
  { title: "Saving Private Ryan", language: "English", duration: 169, certification: "A", releaseDate: "1998-07-24", imdb: 8.6, rt: "94%", status: "NOW_SHOWING" },
  { title: "Parasite", language: "Korean", duration: 132, certification: "A", releaseDate: "2019-05-30", imdb: 8.5, rt: "99%", status: "NOW_SHOWING" },
  { title: "Spirited Away", language: "Japanese", duration: 125, certification: "U", releaseDate: "2001-07-20", imdb: 8.5, rt: "97%", status: "NOW_SHOWING" },
  { title: "The Lion King", language: "English", duration: 89, certification: "U", releaseDate: "1994-06-15", imdb: 8.5, rt: "93%", status: "NOW_SHOWING" },
  { title: "The Prestige", language: "English", duration: 130, certification: "U/A", releaseDate: "2006-10-20", imdb: 8.5, rt: "77%", status: "NOW_SHOWING" },
  { title: "Apocalypse Now", language: "English", duration: 147, certification: "A", releaseDate: "1979-08-15", imdb: 8.4, rt: "98%", status: "NOW_SHOWING" },
  { title: "Memento", language: "English", duration: 113, certification: "U/A", releaseDate: "2000-09-05", imdb: 8.4, rt: "93%", status: "NOW_SHOWING" },
  { title: "Joker", language: "English", duration: 122, certification: "A", releaseDate: "2019-10-04", imdb: 8.4, rt: "69%", status: "NOW_SHOWING" },
  { title: "Spider-Man: Into the Spider-Verse", language: "English", duration: 117, certification: "U", releaseDate: "2018-12-14", imdb: 8.4, rt: "97%", status: "NOW_SHOWING" },
  { title: "Coco", language: "English", duration: 105, certification: "U", releaseDate: "2017-11-22", imdb: 8.4, rt: "97%", status: "NOW_SHOWING" },
  { title: "WALL·E", language: "English", duration: 98, certification: "U", releaseDate: "2008-06-27", imdb: 8.4, rt: "95%", status: "NOW_SHOWING" },
  { title: "Avengers: Endgame", language: "English", duration: 181, certification: "U/A", releaseDate: "2019-04-26", imdb: 8.4, rt: "94%", status: "NOW_SHOWING" },
  { title: "Oldboy", language: "Korean", duration: 120, certification: "A", releaseDate: "2003-11-21", imdb: 8.3, rt: "82%", status: "NOW_SHOWING" },
  { title: "Your Name.", language: "Japanese", duration: 106, certification: "U", releaseDate: "2016-08-26", imdb: 8.3, rt: "98%", status: "NOW_SHOWING" },
  { title: "Amélie", language: "French", duration: 122, certification: "U/A", releaseDate: "2001-04-25", imdb: 8.3, rt: "89%", status: "NOW_SHOWING" },
  { title: "Toy Story", language: "English", duration: 81, certification: "U", releaseDate: "1995-11-22", imdb: 8.3, rt: "100%", status: "NOW_SHOWING" },
  { title: "Inglourious Basterds", language: "English", duration: 153, certification: "A", releaseDate: "2009-08-21", imdb: 8.3, rt: "89%", status: "NOW_SHOWING" },
  { title: "Good Will Hunting", language: "English", duration: 126, certification: "A", releaseDate: "1997-12-05", imdb: 8.3, rt: "97%", status: "NOW_SHOWING" },
  { title: "Requiem for a Dream", language: "English", duration: 102, certification: "A", releaseDate: "2000-10-27", imdb: 8.3, rt: "78%", status: "NOW_SHOWING" },
  { title: "2001: A Space Odyssey", language: "English", duration: 149, certification: "U", releaseDate: "1968-04-03", imdb: 8.3, rt: "92%", status: "NOW_SHOWING" },
  { title: "Eternal Sunshine of the Spotless Mind", language: "English", duration: 108, certification: "A", releaseDate: "2004-03-19", imdb: 8.3, rt: "92%", status: "NOW_SHOWING" },
  { title: "A Clockwork Orange", language: "English", duration: 136, certification: "A", releaseDate: "1971-12-19", imdb: 8.3, rt: "89%", status: "NOW_SHOWING" },
  { title: "Up", language: "English", duration: 96, certification: "U", releaseDate: "2009-05-29", imdb: 8.3, rt: "98%", status: "NOW_SHOWING" },
  { title: "Die Hard", language: "English", duration: 132, certification: "A", releaseDate: "1988-07-15", imdb: 8.2, rt: "94%", status: "NOW_SHOWING" },
  { title: "Heat", language: "English", duration: 170, certification: "A", releaseDate: "1995-12-15", imdb: 8.3, rt: "88%", status: "NOW_SHOWING" },
  { title: "Dune: Part Two", language: "English", duration: 166, certification: "U/A", releaseDate: "2024-03-01", imdb: 8.6, rt: "93%", status: "NOW_SHOWING" },
  { title: "Oppenheimer", language: "English", duration: 180, certification: "U/A", releaseDate: "2023-07-21", imdb: 8.4, rt: "93%", status: "NOW_SHOWING" }
];

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  await client.connect();
  console.log("Connected to Supabase!");

  const insertedMovieIds = [];

  for (const m of moviesToSeed) {
    // Generate simple generic placeholders for metadata to quickly seed them
    const desc = `${m.title} is a critically acclaimed ${m.language} film released in ${m.releaseDate.substring(0,4)}. Enjoy this cinematic masterpiece.`;
    const poster = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${crypto.randomBytes(4).toString('hex')}.jpg`; // Fake TMDB url structure
    const id = crypto.randomUUID();
    
    // Check if movie title already exists
    const existing = await client.query('SELECT id FROM movies WHERE title = $1', [m.title]);
    if (existing.rows.length === 0) {
      await client.query(`
        INSERT INTO movies (
          id, title, description, language, duration, release_date,
          certification, status, poster_url, imdb_rating, rotten_tomatoes_rating
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        id, m.title, desc, m.language, m.duration, m.releaseDate,
        m.certification, m.status, poster, m.imdb, m.rt
      ]);
      insertedMovieIds.push(id);
      console.log(`Inserted ${m.title}`);
    } else {
        console.log(`Movie ${m.title} already exists, skipping.`);
    }
  }

  // Generate Shows for next 7 days for ALL movies
  const screensRes = await client.query('SELECT id FROM screens');
  const screens = screensRes.rows;

  if (screens.length === 0) {
    console.log("No screens found! Cannot insert shows.");
    await client.end();
    return;
  }

  const allMoviesRes = await client.query('SELECT id FROM movies');
  const allMovies = allMoviesRes.rows;

  // Next 7 days
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  console.log("Inserting shows for all movies across next 7 days...");
  
  let showCount = 0;
  // Let's ensure each movie gets at least some shows, but don't overwhelm DB
  for (const m of allMovies) {
    const mScreens = [screens[Math.floor(Math.random() * screens.length)].id];
    
    for (const screenId of mScreens) {
      for (const date of dates) {
         try {
           await client.query(`
              INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
              VALUES 
              ($1, $2, $3, $4, $5, $6),
              ($7, $8, $9, $10, $11, $12)
           `, [
              crypto.randomUUID(), m.id, screenId, date, '11:00:00', 250,
              crypto.randomUUID(), m.id, screenId, date, '20:00:00', 350
           ]);
           showCount += 2;
         } catch(e) {
             // Ignore duplicate unique constraints or constraints
         }
      }
    }
    await delay(20);
  }

  console.log(`Successfully generated ${showCount} shows!`);
  await client.end();
}

run().catch(console.error);
