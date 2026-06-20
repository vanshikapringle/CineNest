

async function seedTheatres() {
  const cities = ['Bengaluru', 'Hyderabad', 'Pune', 'Chennai'];
  const baseUrl = 'http://localhost:8083/api';

  for (const city of cities) {
    console.log(`Creating theatre in ${city}...`);
    try {
      // 1. Create Theatre
      const tReq = await fetch(`${baseUrl}/theatres`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `CineNest Signature - ${city}`,
          city: city,
          address: `100 Main St, ${city}`,
          latitude: 12.9716,
          longitude: 77.5946,
          amenities: ['IMAX', 'Dolby Atmos', 'Recliners', 'Gourmet Food']
        })
      });
      const theatre = await tReq.json();
      
      // 2. Create Screens
      for (let i = 1; i <= 3; i++) {
        const sReq = await fetch(`${baseUrl}/theatres/screens`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            theatreId: theatre.id,
            name: `Screen ${i}`,
            seatCapacity: 120
          })
        });
        const screen = await sReq.json();
        
        // 3. Get all movies and schedule shows
        const mReq = await fetch('http://localhost:8082/api/movies?page=1&size=10');
        const moviesData = await mReq.json();
        // Adjust based on if it's a Page object or List
        const movies = moviesData.content ? moviesData.content : moviesData;

        // Take 5 movies
        const moviesToSchedule = movies.slice(0, 5);

        // Schedule for next 7 days
        for (let d = 0; d < 7; d++) {
          const date = new Date();
          date.setDate(date.getDate() + d);
          const dateStr = date.toISOString().split('T')[0];

          for (let m = 0; m < moviesToSchedule.length; m++) {
            const movie = moviesToSchedule[m];
            const timeStr = `${10 + m * 3}:00:00`; // 10:00, 13:00, 16:00 etc

            await fetch(`${baseUrl}/shows`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                screenId: screen.id,
                movieId: movie.id,
                showDate: dateStr,
                showTime: timeStr,
                basePrice: 300 + (m * 50)
              })
            });
          }
        }
      }
      console.log(`Successfully seeded ${city}`);
    } catch (e) {
      console.error(`Error seeding ${city}:`, e);
    }
  }
}

seedTheatres();
