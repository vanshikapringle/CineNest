const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
  keepAlive: true,
});

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function seedShows() {
  await client.connect();
  console.log("Connected to Supabase!");

  const moviesRes = await client.query('SELECT id, title FROM movies');
  const movies = moviesRes.rows;

  const screensRes = await client.query(`
    SELECT s.id 
    FROM screens s 
    JOIN theatres t ON s.theatre_id = t.id 
    WHERE t.city = 'Chandigarh'
  `);
  const screens = screensRes.rows;

  if (screens.length === 0) {
    console.log("No Chandigarh screens found!");
    return;
  }

  // Removed duplicate check so it can seed Chandigarh

  // 3. Generate Shows for next 7 days for ALL movies
  const dates = ['2026-06-19', '2026-06-20', '2026-06-21', '2026-06-22', '2026-06-23']; // Reduced to 5 days
  console.log("Inserting shows for all movies...");
  
  let showCount = 0;
  for (const m of movies) {
    const mScreens = [screens[Math.floor(Math.random() * screens.length)].id, screens[Math.floor(Math.random() * screens.length)].id];
    
    for (const screenId of mScreens) {
      for (const date of dates) {
         try {
           await client.query(`
              INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
              VALUES 
              ($1, $2, $3, $4, $5, $6),
              ($7, $8, $9, $10, $11, $12)
           `, [
              crypto.randomUUID(), m.id, screenId, date, '10:30:00', 250,
              crypto.randomUUID(), m.id, screenId, date, '18:45:00', 300
           ]);
           showCount += 2;
         } catch(e) {
             console.error("Error inserting show", e.message);
         }
      }
    }
    // Small delay to prevent connection drop
    await delay(100);
  }

  console.log(`Successfully generated ${showCount} shows!`);
  await client.end();
}

seedShows().catch(console.error);
