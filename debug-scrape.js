const cheerio = require('cheerio');
async function test() {
  const r = await fetch("https://familylifecrc.org/flcrc-insights-spring-2026/");
  const html = await r.text();
  const $ = cheerio.load(html);
  
  const title1 = $('title').text();
  const title2 = $('h1').text();
  const title3 = $('h2.elementor-heading-title').text();
  
  const img1 = $('meta[property="og:image"]').attr('content');
  const img2 = $('img.attachment-large').attr('src');
  
  const content1 = $('div.entry-content').html();
  const content2 = $('div.elementor-widget-theme-post-content').html();
  const content3 = $('main').html();
  
  console.log("TITLE1:", title1);
  console.log("TITLE2:", title2);
  console.log("TITLE3:", title3);
  console.log("IMG1:", img1);
  console.log("IMG2:", img2);
  console.log("CONTENT1 len:", content1 ? content1.length : 0);
  console.log("CONTENT2 len:", content2 ? content2.length : 0);
  console.log("CONTENT3 len:", content3 ? content3.length : 0);
}
test();
