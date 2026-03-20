const fs = require('fs');
const https = require('https');
const path = require('path');

const data = JSON.parse(fs.readFileSync('scraped.json', 'utf8'));
const team = data['https://familylifecrc.org/our-team/']?.team || [];
const destDir = path.join(__dirname, 'public', 'images', 'team');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

team.forEach(member => {
  if (member.image) {
    // clean url params and use the name or just grab filename
    let filename = member.image.split('/').pop().split('?')[0]; 
    if (!filename || filename === '') {
      filename = member.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.jpg';
    }
    const dest = path.join(destDir, filename);
    const file = fs.createWriteStream(dest);
    https.get(member.image, function(response) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} for ${member.name}`);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${filename}: ${err.message}`);
    });
  }
});
