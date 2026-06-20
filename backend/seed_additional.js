const { Client } = require('pg');
const crypto = require('crypto');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
});

async function seedAdditional() {
  await client.connect();
  console.log("Connected to Supabase!");

  // 1. Add new Theatres in Chandigarh
  const newTheatres = [
    { id: crypto.randomUUID(), name: 'PVR: VR Punjab, Mohali', city: 'Chandigarh', address: 'VR Punjab Mall, Mohali', amenities: '{"parking": true, "food": true, "imax": true}' },
    { id: crypto.randomUUID(), name: 'Cinepolis: Bestech Square Mall', city: 'Chandigarh', address: 'Bestech Square Mall, Sector 66', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'Piccadily Square Mall', city: 'Chandigarh', address: 'Sector 34', amenities: '{"parking": true, "food": true}' },
    { id: crypto.randomUUID(), name: 'PVR: Centra Mall', city: 'Chandigarh', address: 'Centra Mall, Industrial Area Phase 1', amenities: '{"parking": true, "food": true}' },
  ];

  console.log("Inserting new Chandigarh theatres...");
  const addedScreenIds = [];
  for (const t of newTheatres) {
    await client.query(`INSERT INTO theatres (id, name, city, address, amenities) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;`, [t.id, t.name, t.city, t.address, t.amenities]);
    
    const screen1Id = crypto.randomUUID();
    const screen2Id = crypto.randomUUID();
    await client.query(`INSERT INTO screens (id, name, theatre_id, seat_capacity) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING;`, [screen1Id, 'English 2D', t.id, 150]);
    await client.query(`INSERT INTO screens (id, name, theatre_id, seat_capacity) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING;`, [screen2Id, 'Dolby Atmos 3D', t.id, 150]);
    addedScreenIds.push(screen1Id, screen2Id);
  }

  // 2. Fetch movies to create shows for the new theatres
  const movieRes = await client.query('SELECT id FROM movies');
  const movies = movieRes.rows;
  const dates = ['2026-06-06', '2026-06-07', '2026-06-08', '2026-06-09', '2026-06-10'];
  
  if (movies.length > 0) {
    console.log("Inserting shows for new theatres...");
    for (const screenId of addedScreenIds) {
      for (const date of dates) {
         // pick 3 random movies
         const m1 = movies[Math.floor(Math.random() * movies.length)].id;
         const m2 = movies[Math.floor(Math.random() * movies.length)].id;
         const m3 = movies[Math.floor(Math.random() * movies.length)].id;
         
         await client.query(`
            INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
            VALUES 
            ($1, $2, $3, $4, $5, $6),
            ($7, $8, $9, $10, $11, $12),
            ($13, $14, $15, $16, $17, $18)
         `, [
            crypto.randomUUID(), m1, screenId, date, '10:33:00', 250,
            crypto.randomUUID(), m2, screenId, date, '15:58:00', 300,
            crypto.randomUUID(), m3, screenId, date, '19:45:00', 350
         ]);
      }
    }
  }

  // 3. Generate seats for ALL screens in the database
  console.log("Checking and generating seats for all screens...");
  const allScreensRes = await client.query('SELECT id FROM screens');
  for (const screen of allScreensRes.rows) {
    const seatCountRes = await client.query('SELECT COUNT(*) FROM seats WHERE screen_id = $1', [screen.id]);
    if (parseInt(seatCountRes.rows[0].count) === 0) {
      console.log(`Generating seats for screen ${screen.id}...`);
      const seatValues = [];
      const seatArgs = [];
      let paramCount = 1;
      
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      for (const row of rows) {
        let category = 'REGULAR';
        if (['E', 'F', 'G', 'H'].includes(row)) category = 'PREMIUM';
        if (['I', 'J'].includes(row)) category = 'RECLINER';
        
        for (let num = 1; num <= 15; num++) {
           const seatId = crypto.randomUUID();
           seatValues.push(`($${paramCount++}, $${paramCount++}, $${paramCount++}, $${paramCount++}, $${paramCount++})`);
           seatArgs.push(seatId, screen.id, row, num, category);
        }
      }
      
      // Batch insert seats for this screen
      const query = `INSERT INTO seats (id, screen_id, seat_row, seat_number, category) VALUES ${seatValues.join(', ')}`;
      await client.query(query, seatArgs);
    }
  }

  console.log("Done! Additional data seeded successfully.");
  await client.end();
}

seedAdditional().catch(console.error);
