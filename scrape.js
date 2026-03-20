const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");
const fs = require("fs");

const urls = [
  'https://familylifecrc.org/program-coordinator/',
  'https://familylifecrc.org/donate/',
  'https://familylifecrc.org/sponsorship/',
  'https://familylifecrc.org/volunteer/',
  'https://familylifecrc.org/our-mission-and-vision/',
  'https://familylifecrc.org/our-team/',
  'https://familylifecrc.org/our-financials/',
  'https://familylifecrc.org/strategic-plan/',
  'https://familylifecrc.org/campaign/',
  'https://familylifecrc.org/facility-rental/'
];

async function run() {
  const results = {};
  for (const url of urls) {
    try {
      console.log("Fetching", url);
      const res = await fetch(url);
      const html = await res.text();
      const doc = new JSDOM(html, { url });
      
      const team = [];
      if (url.includes('our-team')) {
        const imageBoxes = doc.window.document.querySelectorAll('.elementor-widget-image-box');
        imageBoxes.forEach(m => {
          const img = m.querySelector('img');
          const title = m.querySelector('.elementor-image-box-title');
          const p = m.querySelector('.elementor-image-box-description');
          if (title && title.textContent) {
            team.push({
              name: title.textContent.trim(),
              image: img && img.src ? img.src : null,
              desc: p ? p.textContent.trim() : ''
            });
          }
        });
      }

      const reader = new Readability(doc.window.document);
      const article = reader.parse();
      results[url] = {
        title: article ? article.title : '',
        textContent: article ? article.textContent : '',
        team
      };
    } catch (e) {
      console.error("Error fetching", url, e.message);
    }
  }
  fs.writeFileSync("scraped.json", JSON.stringify(results, null, 2));
  console.log("Done scraping to scraped.json");
}

run();
