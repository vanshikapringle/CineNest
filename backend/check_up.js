const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
c.connect().then(()=>c.query("SELECT id FROM movies WHERE title = 'Up'")).then(res=>{
  if (res.rows.length === 0) { console.log('Movie not found'); return; }
  const id=res.rows[0].id;
  return c.query(`SELECT COUNT(*) FROM shows WHERE movie_id = '${id}'`);
}).then(res=>{
  if(res) console.log('Shows for Up:', res.rows[0].count);
  c.end();
}).catch(e=>{console.log(e); c.end()});
