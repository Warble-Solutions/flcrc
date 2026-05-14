const cheerio = require('cheerio');
async function test() {
  const r = await fetch("https://familylifecrc.org/flcrc-insights-spring-2026/");
  const html = await r.text();
  const $ = cheerio.load(html);
  
  const title = $('title').text().split('|')[1]?.trim();
  const img = $('div.entry-content img').first().attr('src');
  
  console.log("TITLE:", title);
  console.log("FIRST IMG:", img);
}
test();
