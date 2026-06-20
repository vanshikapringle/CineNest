const fs = require('fs');
const https = require('https');

https.get('https://api.tvmaze.com/shows', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const shows = JSON.parse(data).slice(0, 40);
    
    let mockMoviesStr = `export const MOCK_MOVIES = [\n`;
    
    shows.forEach((show, idx) => {
      const year = show.premiered ? show.premiered.split('-')[0] : '2024';
      const rating = show.rating?.average || 7.5;
      const rtom = Math.floor(rating * 10) + '%';
      
      let synopsis = show.summary ? show.summary.replace(/<[^>]*>?/gm, '').replace(/"/g, '\\"').replace(/\n/g, ' ') : "A great cinematic experience.";
      if (synopsis.length > 150) synopsis = synopsis.substring(0, 147) + '...';
      
      const genres = show.genres.slice(0, 2).map(g => `{ name: "${g}" }`).join(', ');
      
      const poster = show.image?.original || show.image?.medium || "https://picsum.photos/400/600";
      
      mockMoviesStr += `  {
    id: "mock-movie-${idx}",
    title: "${show.name.replace(/"/g, '\\"')}",
    synopsis: "${synopsis}",
    posterUrl: "${poster}",
    bannerUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
    runtimeMins: ${show.runtime || 120},
    releaseDate: "${show.premiered || '2024-01-01'}",
    language: "English",
    status: "NOW_SHOWING",
    imdbRating: ${rating},
    rottenTomatoesRating: "${rtom}",
    genres: [${genres}],
    crew: []
  },\n`;
    });
    
    mockMoviesStr += `];\n\n`;
    
    mockMoviesStr += `export const MOCK_THEATRES = [
  { id: "mock-theatre-1", name: "CineNest Prime - Mumbai", city: "Mumbai", address: "123 Andheri West, Mumbai, MH", amenities: '{"parking": true, "food": true, "dolby_atmos": true}' },
  { id: "mock-theatre-2", name: "CineNest Luxe - Delhi", city: "Delhi", address: "456 Connaught Place, New Delhi", amenities: '{"parking": true, "food": true, "recliner": true}' },
  { id: "mock-theatre-3", name: "CineNest IMAX - Bangalore", city: "Bangalore", address: "789 MG Road, Bangalore", amenities: '{"parking": true, "food": true, "imax": true}' },
  { id: "mock-theatre-4", name: "CineNest Classic - Chennai", city: "Chennai", address: "101 Anna Salai, Chennai", amenities: '{"parking": false, "food": true, "dolby": true}' },
];

export const MOCK_SHOWS = MOCK_MOVIES.map((movie, idx) => {
  return [
    { id: \`show-\${movie.id}-1\`, screenId: "screen-1", movieId: movie.id, theatreId: "mock-theatre-1", showDate: "2024-12-01", showTime: "10:30:00", basePrice: 250.0 },
    { id: \`show-\${movie.id}-2\`, screenId: "screen-1", movieId: movie.id, theatreId: "mock-theatre-1", showDate: "2024-12-01", showTime: "18:00:00", basePrice: 350.0 },
    { id: \`show-\${movie.id}-3\`, screenId: "screen-2", movieId: movie.id, theatreId: "mock-theatre-2", showDate: "2024-12-01", showTime: "14:15:00", basePrice: 400.0 },
    { id: \`show-\${movie.id}-4\`, screenId: "screen-3", movieId: movie.id, theatreId: "mock-theatre-3", showDate: "2024-12-01", showTime: "21:30:00", basePrice: 500.0 },
  ];
}).flat();

export const MOCK_SEATS = Array.from({ length: 100 }).map((_, idx) => {
  const rowChar = String.fromCharCode(65 + Math.floor(idx / 10)); // A-J
  const number = (idx % 10) + 1; // 1-10
  
  let category = "REGULAR";
  if (rowChar === 'I' || rowChar === 'J') category = "PREMIUM";
  if (rowChar === 'A') category = "RECLINER";

  return {
    id: \`seat-\${rowChar}-\${number}\`,
    row: rowChar,
    number: number,
    category: category,
    status: "AVAILABLE"
  };
});

export const MOCK_UNAVAILABLE_SEATS = ["seat-F-5", "seat-F-6", "seat-H-8", "seat-J-1"];
`;

    fs.writeFileSync('frontend/src/services/mockData.ts', mockMoviesStr);
    console.log('Successfully updated mockData.ts with real TVMaze posters!');
  });
}).on('error', (err) => {
  console.log('Error fetching data: ' + err.message);
});
