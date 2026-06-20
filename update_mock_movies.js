const fs = require('fs');
const https = require('https');

https.get('https://itunes.apple.com/search?term=movie&media=movie&limit=40', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const results = JSON.parse(data).results;
    
    let mockMoviesStr = `export const MOCK_MOVIES = [\n`;
    
    results.forEach((movie, idx) => {
      const year = movie.releaseDate ? movie.releaseDate.split('-')[0] : '2024';
      const rating = 8.5 - (idx % 20) / 10;
      const rtom = Math.floor(rating * 10) + '%';
      
      let synopsis = movie.longDescription || movie.shortDescription || "A great cinematic experience.";
      if (synopsis.length > 150) synopsis = synopsis.substring(0, 147) + '...';
      synopsis = synopsis.replace(/"/g, '\\"').replace(/\n/g, ' ');
      
      const genre = movie.primaryGenreName || 'Drama';
      
      let poster = movie.artworkUrl100 || "https://picsum.photos/400/600";
      poster = poster.replace('100x100bb', '600x900bb'); // Get high res image
      
      mockMoviesStr += `  {
    id: "mock-movie-${idx}",
    title: "${movie.trackName.replace(/"/g, '\\"')}",
    synopsis: "${synopsis}",
    posterUrl: "${poster}",
    bannerUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
    runtimeMins: ${movie.trackTimeMillis ? Math.floor(movie.trackTimeMillis / 60000) : 120},
    releaseDate: "${movie.releaseDate || '2024-01-01'}",
    language: "English",
    status: "NOW_SHOWING",
    imdbRating: ${rating},
    rottenTomatoesRating: "${rtom}",
    genres: [{ name: "${genre}" }],
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
    console.log('Successfully updated mockData.ts with real iTunes movies!');
  });
}).on('error', (err) => {
  console.log('Error fetching data: ' + err.message);
});
