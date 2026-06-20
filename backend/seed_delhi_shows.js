const {Client} = require('pg');
const crypto = require('crypto');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
async function seedDelhi() {
  await c.connect();
  const delhiTheatreId = '387b1be2-90f0-4a50-92fb-7d38d483ff2d';
  const screenId = crypto.randomUUID();
  await c.query("INSERT INTO screens (id, name, seat_capacity, theatre_id) VALUES ($1, 'Screen 2 - Luxe', 150, $2)", [screenId, delhiTheatreId]);
  
  const moviesRes = await c.query("SELECT id FROM movies");
  const dates = [];
  for(let i=0; i<7; i++) {
    const d = new Date();
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  for (const movie of moviesRes.rows) {
    for (const date of dates) {
       await c.query(`INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) VALUES ($1, $2, $3, $4, $5, $6), ($7, $8, $9, $10, $11, $12)`, 
        [crypto.randomUUID(), movie.id, screenId, date, '14:00:00', 300, crypto.randomUUID(), movie.id, screenId, date, '20:30:00', 350]);
    }
  }
  console.log("Seeded Delhi shows");
  await c.end();
}
seedDelhi().catch(console.error);
