global.localStorage = { getItem: () => null };
import { getShowsByTheatre } from './src/services/api.js';

async function test() {
  const shows = await getShowsByTheatre('387b1be2-90f0-4a50-92fb-7d38d483ff2d');
  const s = shows.filter(s => s.movieId === 'd066bdf2-b878-4abf-a75a-e4d09139fb3c');
  console.log('Total shows:', shows.length);
  console.log('Avengers shows:', s.length);
  if (s.length > 0) {
    console.log(s[0]);
  }
}
test().catch(console.error);
