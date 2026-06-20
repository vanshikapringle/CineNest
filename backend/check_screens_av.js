const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
async function checkScreens() {
  await c.connect();
  const sc = await c.query('SELECT * FROM screens');
  console.log('Screens:', sc.rows);
  
  const m = await c.query("SELECT id FROM movies WHERE title = 'Avengers: Endgame'");
  if (m.rows.length === 0) return;
  
  const sh = await c.query(`SELECT DISTINCT screen_id FROM shows WHERE movie_id = '${m.rows[0].id}'`);
  console.log('Screens with Avengers:', sh.rows);
  await c.end();
}
checkScreens().catch(e=>console.error(e));
