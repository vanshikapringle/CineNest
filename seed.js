const http = require('http');
const fs = require('fs');

const moviesData = JSON.parse(fs.readFileSync('./backend/movie-service/src/main/resources/movies.json', 'utf8'));

// Post first 5 movies
const moviesToPost = moviesData.slice(0, 5);

moviesToPost.forEach(movie => {
  const data = JSON.stringify(movie);
  const req = http.request({
    hostname: 'localhost',
    port: 8082,
    path: '/api/movies',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  }, (res) => {
    console.log(`Movie ${movie.title} posted with status: ${res.statusCode}`);
  });
  
  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });
  
  req.write(data);
  req.end();
});
