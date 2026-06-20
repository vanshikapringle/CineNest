const https = require('https');

async function scrape(query) {
    return new Promise((resolve) => {
        https.get(`https://www.themoviedb.org/search?query=${encodeURIComponent(query)}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const imgMatch = data.match(/src="([^"]+\.jpg)"/);
                if (imgMatch) {
                    resolve("https://www.themoviedb.org" + imgMatch[1]);
                } else {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

scrape('Oppenheimer').then(console.log);
