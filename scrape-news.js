const fs = require('fs');
const path = require('path');
const https = require('https');
const cheerio = require('cheerio');

const urls = [
  "https://familylifecrc.org/flcrc-insights-spring-2026/",
  "https://familylifecrc.org/keeping-black-history-alive-in-2026/",
  "https://familylifecrc.org/2025survey/",
  "https://familylifecrc.org/flcrc-insights-winter-2025-26/",
  "https://familylifecrc.org/2025-volunteer-of-the-year/",
  "https://familylifecrc.org/an-evening-of-celebration-and-gratitude/",
  "https://familylifecrc.org/back-to-school-parent-chat-2025/",
  "https://familylifecrc.org/flcrc-insights-fall-2025/",
  "https://familylifecrc.org/camp-with-y-a-l-e-2025-a-week-of-fun-and-learning/",
  "https://familylifecrc.org/flcrc-insights-summer-2025/",
  "https://familylifecrc.org/flcrc-insights-spring-2025/",
  "https://familylifecrc.org/girls-with-pearls-women-leading-soaring/",
  "https://familylifecrc.org/flcrc-insights-winter-2024-25/",
  "https://familylifecrc.org/2024survey/",
  "https://familylifecrc.org/black-history-program-2025/",
  "https://familylifecrc.org/2024-volunteer-of-the-year-dr-sharon-delesbore/",
  "https://familylifecrc.org/8th-annual-banquet-a-sold-out-success/",
  "https://familylifecrc.org/flcrc-insights-fall-2024/",
  "https://familylifecrc.org/standing-against-bullying-in-2024/",
  "https://familylifecrc.org/insights-summer-2024/",
  "https://familylifecrc.org/back-to-school-parent-chat-2024/",
  "https://familylifecrc.org/summer-enrichment-with-y-a-l-e/",
  "https://familylifecrc.org/insights-winter-2023-24/",
  "https://familylifecrc.org/insights-spring-2024/",
  "https://familylifecrc.org/yale-2023-survey/",
  "https://familylifecrc.org/2023survey/",
  "https://familylifecrc.org/insights-fall-2023/",
  "https://familylifecrc.org/flcrc-7th-annual-banquet-a-sold-out-evening-of-celebration-and-gratitude/",
  "https://familylifecrc.org/insights-newsletter-summer-2023/",
  "https://familylifecrc.org/back-to-school-parent-chat-2023/",
  "https://familylifecrc.org/youth-on-the-horizon-students-have-a-blast-at-summer-enrichment-camp/",
  "https://familylifecrc.org/hat-and-tea-soiree-2023/",
  "https://familylifecrc.org/insights-newsletter-winter-2022-23/",
  "https://familylifecrc.org/insights-spring-2023/",
  "https://familylifecrc.org/fighting-bullying-together/",
  "https://familylifecrc.org/banquet2022/",
  "https://familylifecrc.org/insights-newsletter-fall-2022/",
  "https://familylifecrc.org/18th-annual-back-2-school-parent-chat/",
  "https://familylifecrc.org/insights-summer-2022/",
  "https://familylifecrc.org/summercamp2022/",
  "https://familylifecrc.org/insights-spring-2022/",
  "https://familylifecrc.org/insights-newsletter-winter-2021-22/",
  "https://familylifecrc.org/yale-2021-survey/",
  "https://familylifecrc.org/flcrc-5th-annual-banquet-a-sold-out-evening/",
  "https://familylifecrc.org/insights-newsletter-fall-2021/",
  "https://familylifecrc.org/going-orange-in-october/",
  "https://familylifecrc.org/17th-annual-back-2-school-parent-chat/",
  "https://familylifecrc.org/insights-newsletter-summer-2021/",
  "https://familylifecrc.org/insights-newsletter-spring-2021/",
  "https://familylifecrc.org/camp2021/",
  "https://familylifecrc.org/flcrc-virtual-banquet-is-a-success/",
  "https://familylifecrc.org/insights-newsletter-winter-2020-21/",
  "https://familylifecrc.org/flcrc-stands-against-bullying-virtually/",
  "https://familylifecrc.org/flcrc-launches-tv-ad-campaign/",
  "https://familylifecrc.org/teen-talk-party-affiliations/",
  "https://familylifecrc.org/insights-newsletter-fall-2020/",
  "https://familylifecrc.org/scholarship-application-period-now-open-through-oct-31st/",
  "https://familylifecrc.org/entrepreneurship-investing-in-yourself-training/",
  "https://familylifecrc.org/social-justice-teen-talk-3/",
  "https://familylifecrc.org/social-justice-teen-talk-4/",
  "https://familylifecrc.org/16th-annual-back-2-school-parent-chat/",
  "https://familylifecrc.org/dr-harper-on-educating-during-covid-19/",
  "https://familylifecrc.org/social-justice-teen-talk-2/",
  "https://familylifecrc.org/insights-summer-2020/",
  "https://familylifecrc.org/learning-polls/",
  "https://familylifecrc.org/breakfree2020/",
  "https://familylifecrc.org/celebrating-juneteenth/",
  "https://familylifecrc.org/social-justice-teen-talk-1/",
  "https://familylifecrc.org/lets-keep-the-conversation-going/",
  "https://familylifecrc.org/social-justice-talks-kick-off/",
  "https://familylifecrc.org/dr-harper-speaks-at-community-town-hall/",
  "https://familylifecrc.org/congratulations-2020-graduates/",
  "https://familylifecrc.org/jade-trading-company-joins-the-fight-against-covid-19/",
  "https://familylifecrc.org/insights-newsletter-spring-2020/",
  "https://familylifecrc.org/a-fantastic-ending-to-2019/",
  "https://familylifecrc.org/yale-china-experience-2019/",
  "https://familylifecrc.org/now-hiring/",
  "https://familylifecrc.org/standing-against-bullying-together/",
  "https://familylifecrc.org/2019-summer-enrichment-camp/",
  "https://familylifecrc.org/back-2-school-parent-chat-2019-highlights/",
  "https://familylifecrc.org/a-fun-day-of-touring-at-tsu/",
  "https://familylifecrc.org/y-a-l-e-students-visit-the-texas-state-capitol-3/",
  "https://familylifecrc.org/flcrc-holiday-giftwrap-fundraiser-2018-highlights/",
  "https://familylifecrc.org/flcrc-banquet-2018/",
  "https://familylifecrc.org/national-bullying-awareness-event-2018/",
  "https://familylifecrc.org/back-2-school-parent-chat-2018-highlights/",
  "https://familylifecrc.org/2018-community-conference-highlights/",
  "https://familylifecrc.org/support-miss-houston/",
  "https://familylifecrc.org/yale-serves-with-habitat-for-humanity/",
  "https://familylifecrc.org/y-a-l-e-students-visit-the-texas-state-capitol-2/",
  "https://familylifecrc.org/y-a-l-e-students-visit-the-texas-state-capitol/",
  "https://familylifecrc.org/flcrc-banquet-2017/",
  "https://familylifecrc.org/national-bullying-awareness-event-2017-highlights/",
  "https://familylifecrc.org/flcrc-grand-opening-celebration/",
  "https://familylifecrc.org/summer-2017-community-conference/",
  "https://familylifecrc.org/back-2-school-parent-chat-2017/",
  "https://familylifecrc.org/back-2-school-parent-chat-2016/",
  "https://familylifecrc.org/college-and-career-readiness-seminars/"
];

const destDir = path.join(__dirname, 'public', 'images', 'news');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(destDir, filename);
    if (fs.existsSync(dest)) return resolve(`/images/news/${filename}`); // already downloaded
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(`/images/news/${filename}`);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function decodeEntities(encodedString) {
  return encodedString.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
                      .replace(/&amp;/g, '&')
                      .replace(/&quot;/g, '"')
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')
                      .replace(/&#8217;/g, "'")
                      .replace(/&#8220;/g, '"')
                      .replace(/&#8221;/g, '"')
                      .replace(/&#8211;/g, "-")
                      .replace(/&#8212;/g, "—")
                      .replace(/&nbsp;/g, ' ');
}

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function scrape() {
  const articles = [];
  console.log(`Starting scrape of ${urls.length} articles...`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i+1}/${urls.length}] Scraping ${url}`);
    
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      
      let titleParts = $('title').text().split('|');
      let title = decodeEntities(titleParts.length > 1 ? titleParts[1].trim() : titleParts[0].trim());
      
      let date = $('time.entry-date').text() || $('meta[property="article:published_time"]').attr('content');
      if (date && date.includes('T')) {
        const d = new Date(date);
        date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
      if (!date) date = "Recent";

      let excerpt = "";
      $('div.entry-content p').each((i, el) => {
        const txt = $(el).text().trim();
        if (txt.length > 50 && excerpt === "") {
          excerpt = txt;
        }
      });
      excerpt = decodeEntities(excerpt).substring(0, 150) + "...";
      if (excerpt === "...") excerpt = "Read more about this article on our website.";

      let imgUrl = $('meta[property="og:image"]').attr('content') || $('div.entry-content img').first().attr('src');
      let localImage = "/images/headers/news.jpg"; // fallback
      
      if (imgUrl) {
        let filename = imgUrl.split('/').pop().split('?')[0];
        if (!filename) filename = `news-${i}.jpg`;
        try {
          localImage = await downloadImage(imgUrl, filename);
        } catch (e) {
          console.error("Failed to download image:", e.message);
        }
      }

      // Infer categories roughly from title or URL
      let categories = ["Community"];
      if (url.includes('newsletter') || url.includes('insights')) categories.push("Newsletter");
      if (url.includes('survey')) categories = ["Education", "Community"];
      if (url.includes('banquet') || url.includes('soiree')) categories = ["Events"];
      if (url.includes('camp') || url.includes('yale') || url.includes('parent-chat') || url.includes('teen-talk')) categories = ["Y.A.L.E.", "Youth"];

      const content = $('div.entry-content').html() || "";
      const slug = generateSlug(title) || `article-${i}`;

      articles.push({
        title,
        slug,
        date,
        excerpt,
        image: localImage,
        link: url,
        categories: [...new Set(categories)],
        content: content.trim()
      });

    } catch (e) {
      console.error(`Failed to scrape ${url}:`, e.message);
    }
  }

  fs.writeFileSync('newsData.json', JSON.stringify(articles, null, 2));
  console.log("Scraping complete. Data saved to newsData.json");
}

scrape();
