const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
});

async function fixCrewImages() {
  await client.connect();
  console.log("Connected to DB.");

  const { rows } = await client.query('SELECT id, name FROM crew');
  console.log(`Found ${rows.length} crew members.`);

  for (const crew of rows) {
    try {
      const res = await fetch(`https://api.tvmaze.com/search/people?q=${encodeURIComponent(crew.name)}`);
      const data = await res.json();
      
      if (data && data.length > 0 && data[0].person && data[0].person.image && data[0].person.image.medium) {
        const imageUrl = data[0].person.image.medium;
        await client.query('UPDATE crew SET photo_url = $1 WHERE id = $2', [imageUrl, crew.id]);
        console.log(`Updated ${crew.name} -> ${imageUrl}`);
      } else {
        console.log(`No image found for ${crew.name}`);
      }
    } catch (e) {
      console.error(`Error fetching for ${crew.name}: ${e.message}`);
    }
  }

  await client.end();
  console.log("Finished updating crew images.");
}

fixCrewImages().catch(console.error);
