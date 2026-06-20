const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
c.connect().then(()=>c.query("SELECT * FROM screens")).then(res=>{
  console.log(res.rows);
  return c.query("SELECT * FROM theatres");
}).then(res=>{
  console.log(res.rows);
  c.end();
}).catch(e=>{console.log(e); c.end()});
