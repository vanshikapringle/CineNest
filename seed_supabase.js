const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
});

async function seed() {
  try {
    await client.connect();
    console.log("Connected to Supabase!");

    const movieId1 = '11111111-1111-1111-1111-111111111111';
    const movieId2 = '22222222-2222-2222-2222-222222222222';
    
    await client.query(`
      INSERT INTO movies (id, title, description, release_date, duration, poster_url, status, imdb_rating, rotten_tomatoes_rating) 
      VALUES 
      ('${movieId1}', 'Dune: Part Two', 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.', '2024-03-01', 166, 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop', 'NOW_SHOWING', 8.8, '97%'),
      ('${movieId2}', 'Oppenheimer', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', '2023-07-21', 180, 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop', 'NOW_SHOWING', 8.4, '93%')
      ON CONFLICT (id) DO NOTHING;
    `);

    const theatreId1 = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    await client.query(`
      INSERT INTO theatres (id, name, city, address, amenities) 
      VALUES ('${theatreId1}', 'CineNest Prime', 'Mumbai', '123 Andheri', '{"parking": true, "food": true}')
      ON CONFLICT (id) DO NOTHING;
    `);

    const screenId1 = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
    await client.query(`
      INSERT INTO screens (id, name, theatre_id) 
      VALUES ('${screenId1}', 'Screen 1', '${theatreId1}')
      ON CONFLICT (id) DO NOTHING;
    `);

    const showId1 = 'cccccccc-cccc-cccc-cccc-cccccccccccc';
    const showId2 = 'dddddddd-dddd-dddd-dddd-dddddddddddd';
    await client.query(`
      INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, base_price) 
      VALUES 
      ('${showId1}', '${movieId1}', '${screenId1}', '2024-12-01', '10:30:00', 250),
      ('${showId2}', '${movieId2}', '${screenId1}', '2024-12-01', '14:00:00', 300)
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insert mock seats for the shows so we can book them!
    const seats = [];
    const rows = ['A', 'B', 'C', 'D'];
    rows.forEach((r, rowIdx) => {
      for(let n=1; n<=10; n++) {
         seats.push(`('${rowIdx * 10 + n}-1', '${showId1}', '${r}', ${n}, 'REGULAR')`);
         seats.push(`('${rowIdx * 10 + n}-2', '${showId2}', '${r}', ${n}, 'REGULAR')`);
      }
    });
    // This is managed by the SeatLockManager now, we just need to ensure Seat instances exist if using persistence for seats.
    // Actually, theatre-service doesn't auto-create seats, it just fetches them.
    // I will skip generating thousands of seats manually for now. Wait, SeatLockManager gets seats from DB?
    // Let's just create 5 seats.
    console.log("Seeding complete!");
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}
seed();
