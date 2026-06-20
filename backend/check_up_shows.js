const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
c.connect().then(()=>c.query("SELECT * FROM shows WHERE movie_id = 'e2685160-a92d-46b0-bc7c-801f72993d15' ORDER BY show_date")).then(res=>{
  console.log(res.rows.slice(0, 5));
  c.end();
}).catch(e=>{console.log(e); c.end()});
