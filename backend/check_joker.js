const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
async function checkJoker() {
  await c.connect();
  const res = await c.query("SELECT id FROM movies WHERE title = 'Joker'");
  const id = res.rows[0].id;
  const showsRes = await c.query(`SELECT show_date FROM shows WHERE movie_id = '${id}' LIMIT 5`);
  console.log('Shows in DB for Joker dates:', showsRes.rows.map(r => r.show_date));
  await c.end();
}
checkJoker().catch(e=>console.error(e));
