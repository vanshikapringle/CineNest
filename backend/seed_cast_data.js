const { Client } = require('pg');

const connectionString = 'postgres://postgres.wbkevavrnhowvlimsqlx:Vanshika%4004@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres';

// We map a few known movies to their cast
const castMap = {
  "Avengers: Endgame": [
    { name: "Robert Downey Jr.", characterName: "Tony Stark / Iron Man", imageUrl: "https://image.tmdb.org/t/p/w200/im9SAqJPZKEbVJDieEQSbwq4b32.jpg", role: "CAST" },
    { name: "Chris Evans", characterName: "Steve Rogers / Captain America", imageUrl: "https://image.tmdb.org/t/p/w200/3bOGNsHlrswhyW79zXfA9qCqvwu.jpg", role: "CAST" },
    { name: "Mark Ruffalo", characterName: "Bruce Banner / Hulk", imageUrl: "https://image.tmdb.org/t/p/w200/z3dvKqMNDQWk3XnINc180xXjXj.jpg", role: "CAST" },
    { name: "Chris Hemsworth", characterName: "Thor", imageUrl: "https://image.tmdb.org/t/p/w200/oSZto1nQOawTWeFmX8wP7dFm7jY.jpg", role: "CAST" },
    { name: "Scarlett Johansson", characterName: "Natasha Romanoff / Black Widow", imageUrl: "https://image.tmdb.org/t/p/w200/601J28q4R9aYIfRItlT8G08Xv5D.jpg", role: "CAST" }
  ],
  "The Dark Knight": [
    { name: "Christian Bale", characterName: "Bruce Wayne / Batman", imageUrl: "https://image.tmdb.org/t/p/w200/qCpZncsgIscLyluIunxO2tFp19e.jpg", role: "CAST" },
    { name: "Heath Ledger", characterName: "Joker", imageUrl: "https://image.tmdb.org/t/p/w200/50lyeXhX21FhH1n6hLWeBap0s5b.jpg", role: "CAST" },
    { name: "Aaron Eckhart", characterName: "Harvey Dent / Two-Face", imageUrl: "https://image.tmdb.org/t/p/w200/jL8q1692K8F9jQ1D1lX9l8s1Ea2.jpg", role: "CAST" },
    { name: "Michael Caine", characterName: "Alfred Pennyworth", imageUrl: "https://image.tmdb.org/t/p/w200/bZ00jE1TDEE4K0yAtyW5V8U21vM.jpg", role: "CAST" },
    { name: "Maggie Gyllenhaal", characterName: "Rachel Dawes", imageUrl: "https://image.tmdb.org/t/p/w200/hyl1oQj3l4ZfTz3r9Yl8S0zZ2i7.jpg", role: "CAST" }
  ],
  "Inception": [
    { name: "Leonardo DiCaprio", characterName: "Dom Cobb", imageUrl: "https://image.tmdb.org/t/p/w200/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg", role: "CAST" },
    { name: "Joseph Gordon-Levitt", characterName: "Arthur", imageUrl: "https://image.tmdb.org/t/p/w200/q3S9W8fP9Zk9PZc5s7sM9G1x0zQ.jpg", role: "CAST" },
    { name: "Elliot Page", characterName: "Ariadne", imageUrl: "https://image.tmdb.org/t/p/w200/w2M5T8jZ3g0M0z8C6W6y7rQ4N6P.jpg", role: "CAST" },
    { name: "Tom Hardy", characterName: "Eames", imageUrl: "https://image.tmdb.org/t/p/w200/yVuB00H65s7h7g1wZp7G0A6J8oX.jpg", role: "CAST" },
    { name: "Ken Watanabe", characterName: "Saito", imageUrl: "https://image.tmdb.org/t/p/w200/xZ0oPZ2jA2Y6XN1N9C5jU9xH6sO.jpg", role: "CAST" }
  ]
};

async function seedCast() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    // Create table if not exists (JPA might have already done this)
    await client.query(`
      CREATE TABLE IF NOT EXISTS cast_members (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        character_name VARCHAR(255),
        image_url VARCHAR(255),
        role VARCHAR(255) NOT NULL,
        movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE
      )
    `);

    // Fetch all movies
    const { rows: movies } = await client.query('SELECT id, title FROM movies');

    for (const movie of movies) {
      const cast = castMap[movie.title];
      if (cast) {
        console.log(`Seeding cast for ${movie.title}...`);
        for (const member of cast) {
          const id = crypto.randomUUID();
          await client.query(
            'INSERT INTO cast_members (id, name, character_name, image_url, role, movie_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [id, member.name, member.characterName, member.imageUrl, member.role, movie.id]
          );
        }
      } else {
        // Generate mock cast for other movies so UI isn't empty
        const id = crypto.randomUUID();
        await client.query(
            'INSERT INTO cast_members (id, name, character_name, image_url, role, movie_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [id, 'Generic Actor', 'Main Lead', 'https://i.pravatar.cc/150?img=1', 'CAST', movie.id]
        );
      }
    }
    
    console.log('Cast seeding complete.');
  } catch (err) {
    console.error('Error seeding cast:', err);
  } finally {
    await client.end();
  }
}

seedCast();
