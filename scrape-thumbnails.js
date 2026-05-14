const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { resolve(false); return; }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(true); });
      ws.on('error', (e) => { fs.unlinkSync(dest); reject(e); });
    }).on('error', reject);
  });
}

async function scrapePage(pageNum) {
  const url = pageNum === 1
    ? 'https://familylifecrc.org/news/'
    : `https://familylifecrc.org/news/page/${pageNum}/`;
  
  console.log(`Scraping page ${pageNum}: ${url}`);
  const html = await fetch(url);
  
  // Extract article blocks - each article has a link and a thumbnail
  const articles = [];
  
  // Pattern: find article links and their associated thumbnail images
  // The old site uses WordPress with featured images in <article> or post blocks
  // Look for patterns like <a href="https://familylifecrc.org/SLUG/"><img src="THUMBNAIL" ...
  
  // Method 1: Find all <article> blocks
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/gi;
  let match;
  while ((match = articleRegex.exec(html)) !== null) {
    const block = match[1];
    
    // Extract the article URL
    const linkMatch = block.match(/href="(https:\/\/familylifecrc\.org\/[^"]+)"/);
    if (!linkMatch) continue;
    const articleUrl = linkMatch[1].replace(/\/$/, '');
    
    // Extract thumbnail image - look for img tags with src
    const imgMatch = block.match(/(?:src|data-src)="([^"]+\.(?:jpg|jpeg|png|gif|webp)[^"]*)"/i);
    if (!imgMatch) continue;
    
    let thumbUrl = imgMatch[1];
    // Clean up any resize params to get full-size image
    // WordPress often adds -NNNxNNN before the extension
    
    articles.push({ url: articleUrl, thumbnail: thumbUrl });
  }
  
  // Method 2: If no articles found via <article>, try a simpler pattern
  if (articles.length === 0) {
    // Look for post listing patterns
    const postRegex = /<div[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
    while ((match = postRegex.exec(html)) !== null) {
      const block = match[1];
      const linkMatch = block.match(/href="(https:\/\/familylifecrc\.org\/[^"]+)"/);
      const imgMatch = block.match(/(?:src|data-src)="([^"]+\.(?:jpg|jpeg|png|gif|webp)[^"]*)"/i);
      if (linkMatch && imgMatch) {
        articles.push({ url: linkMatch[1].replace(/\/$/, ''), thumbnail: imgMatch[1] });
      }
    }
  }
  
  return articles;
}

async function main() {
  const allThumbnails = [];
  
  for (let page = 1; page <= 10; page++) {
    try {
      const articles = await scrapePage(page);
      console.log(`  Found ${articles.length} articles with thumbnails`);
      allThumbnails.push(...articles);
    } catch (e) {
      console.log(`  Error on page ${page}: ${e.message}`);
    }
  }
  
  console.log(`\nTotal thumbnails found: ${allThumbnails.length}`);
  
  // Load our existing articles
  const newsData = JSON.parse(fs.readFileSync('newsData.json', 'utf8'));
  console.log(`Existing articles: ${newsData.length}`);
  
  // Match thumbnails to our articles by URL
  let matched = 0;
  let downloaded = 0;
  const imgDir = path.join(__dirname, 'public', 'images', 'news');
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
  
  for (const article of newsData) {
    const articleUrl = article.link.replace(/\/$/, '');
    const thumb = allThumbnails.find(t => t.url === articleUrl);
    
    if (thumb) {
      matched++;
      const ext = path.extname(new URL(thumb.thumbnail).pathname).split('?')[0] || '.jpg';
      const filename = `thumb-${article.slug}${ext}`;
      const destPath = path.join(imgDir, filename);
      
      // Download the thumbnail
      try {
        const ok = await downloadFile(thumb.thumbnail, destPath);
        if (ok) {
          article.image = `/images/news/${filename}`;
          downloaded++;
          console.log(`  ✓ ${article.slug} -> ${filename}`);
        } else {
          console.log(`  ✗ Failed to download for ${article.slug}`);
        }
      } catch (e) {
        console.log(`  ✗ Error downloading for ${article.slug}: ${e.message}`);
      }
    } else {
      console.log(`  ? No thumbnail match for: ${articleUrl}`);
    }
  }
  
  console.log(`\nMatched: ${matched}/${newsData.length}`);
  console.log(`Downloaded: ${downloaded}`);
  
  // Save updated data
  fs.writeFileSync('newsData.json', JSON.stringify(newsData, null, 2));
  console.log('Updated newsData.json with new thumbnail paths');
}

main().catch(console.error);
