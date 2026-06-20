const fs = require('fs');
const https = require('https');

const API_URL = 'https://itunes.apple.com/search?term=marvel&entity=movie&limit=30';

https.get(API_URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const results = JSON.parse(data).results;
      const movies = results.map(item => ({
        id: item.trackId.toString(),
        title: item.trackName,
        description: item.longDescription || item.shortDescription || 'An amazing cinematic experience.',
        releaseDate: item.releaseDate,
        duration: Math.floor((item.trackTimeMillis || 0) / 60000),
        language: 'English',
        posterUrl: item.artworkUrl100.replace('100x100', '600x900'), // Get high-res poster
        trailerUrl: item.previewUrl,
        imdbRating: 8.5,
        genres: [{ name: item.primaryGenreName }]
      }));

      const mockDataContent = `export const MOCK_MOVIES = ${JSON.stringify(movies, null, 2)};

export const MOCK_THEATRES = [
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

      fs.writeFileSync('./frontend/src/services/mockData.ts', mockDataContent, 'utf8');
      console.log('Successfully wrote real movies to mockData.ts');
    } catch (e) {
      console.error(e);
    }
  });
}).on('error', (e) => {
  console.error(e);
});
