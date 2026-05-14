const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('temp_article.html', 'utf8');
const $ = cheerio.load(html);

console.log('TITLE:', $('title').text());
console.log('H1:', $('h1').text());
console.log('H2:', $('h2').text());
console.log('OG IMAGE:', $('meta[property="og:image"]').attr('content'));
console.log('OG TITLE:', $('meta[property="og:title"]').attr('content'));
console.log('ENTRY CONTENT HTML LENGTH:', $('div.entry-content').html() ? $('div.entry-content').html().length : 0);
console.log('ARTICLE HTML LENGTH:', $('article').html() ? $('article').html().length : 0);
