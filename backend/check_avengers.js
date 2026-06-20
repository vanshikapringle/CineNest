const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
async function checkAvengers() {
  await c.connect();
  const res = await c.query("SELECT id FROM movies WHERE title = 'Avengers: Endgame'");
  const id = res.rows[0].id;
  const showsRes = await c.query(`SELECT count(*) FROM shows WHERE movie_id = '${id}' AND screen_id = (SELECT id FROM screens WHERE name = 'Screen 2 - Luxe')`);
  console.log('Luxe Shows in DB for Avengers:', showsRes.rows[0].count);
  await c.end();
}
checkAvengers().catch(e=>console.error(e));
