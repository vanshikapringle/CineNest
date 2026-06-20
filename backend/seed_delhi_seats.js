const {Client} = require('pg');
const c = new Client({connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'});
async function seedDelhiSeats() {
  await c.connect();
  const res = await c.query("SELECT id FROM screens WHERE name = 'Screen 2 - Luxe'");
  if (res.rows.length === 0) return;
  const screenId = res.rows[0].id;
  
  // Create seats A to J, 1 to 15
  const rows = ['A','B','C','D','E','F','G','H','I','J'];
  for (const row of rows) {
    for (let i = 1; i <= 15; i++) {
      let category = 'STANDARD';
      if (row === 'H' || row === 'I') category = 'PREMIUM';
      if (row === 'J') category = 'RECLINER';
      
      await c.query(`INSERT INTO seats (id, screen_id, seat_row, seat_number, category) VALUES (gen_random_uuid(), $1, $2, $3, $4)`, 
        [screenId, row, i, category]);
    }
  }
  console.log("Seeded Delhi seats");
  await c.end();
}
seedDelhiSeats().catch(e=>console.error(e));
