const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
async function check() {
  await c.connect();
  const m = await c.query("SELECT id FROM movies WHERE title = 'Avengers: Endgame'");
  const avengersId = m.rows[0].id;
  console.log('Avengers DB ID:', avengersId);
  const r = await fetch('http://localhost:8083/api/shows/theatre/387b1be2-90f0-4a50-92fb-7d38d483ff2d');
  const d = await r.json();
  console.log('Delhi Shows for Avengers from API:', d.filter(s => s.movieId === avengersId).length);
  const mumbair = await fetch('http://localhost:8083/api/shows/theatre/d364eebf-1ce5-4a39-843c-4af062c02975');
  const mumbaid = await mumbair.json();
  console.log('Mumbai Shows for Avengers from API:', mumbaid.filter(s => s.movieId === avengersId).length);
  await c.end();
}
check().catch(e=>console.error(e));
