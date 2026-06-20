const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
async function checkMovie() {
  await c.connect();
  const res = await c.query("SELECT id, title FROM movies WHERE id = '0ff94098-8a32-48ca-b0d9-2026519407f1'");
  console.log('Movie:', res.rows[0]);
  await c.end();
}
checkMovie().catch(e=>console.error(e));
