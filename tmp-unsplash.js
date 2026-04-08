const https = require('https');

const keywords = [
  "education students", 
  "event crowd banquet",
  "news press conference",
  "banquet hall venue",
  "customer support office",
  "volunteer community",
  "charity donation",
  "partnership handshake",
  "modern building growth",
  "sunrise vision",
  "team meeting",
  "financial charts",
  "strategic planning whiteboard",
  "office desk hiring"
];

let requests = keywords.map(kw => {
  return new Promise(resolve => {
    https.get(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(kw)}&orientation=landscape&per_page=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (res) => {
      let raw = '';
      res.on('data', d => raw += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(raw);
          const r = json.results[0];
          console.log(`PAGE: ${kw}`);
          console.log(`ID: ${r.id}`);
          console.log(`Description: ${r.alt_description}`);
          console.log('---');
        } catch(e) {}
        resolve();
      });
    }).on('error', resolve);
  });
});

Promise.all(requests).then(() => console.log("Done"));
