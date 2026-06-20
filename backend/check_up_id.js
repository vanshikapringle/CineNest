const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
c.connect().then(()=>c.query("SELECT id FROM movies WHERE title = 'Up'")).then(res=>{
  if (res.rows.length === 0) { console.log('Movie not found'); return; }
  console.log('ID:', res.rows[0].id);
  c.end();
}).catch(e=>{console.log(e); c.end()});
