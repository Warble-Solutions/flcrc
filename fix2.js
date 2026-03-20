const fs = require('fs');
const files = [
  'src/app/volunteer/page.tsx',
  'src/app/sponsorship/page.tsx',
  'src/app/donate/page.tsx',
  'src/app/campaign/page.tsx',
];

for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  
  // Fix: the script wrote:   return (\n    <>\n<div className="pt-...
  // We want:                  return (\n    <div className="pt-...
  // Replace  <>  then newline then <div  with just <div
  c = c.replace(/return \(\n    <>\n<div/g, 'return (\n    <div');
  
  // Fix closing: some files have    </div>\n</>\n  ); 
  // Should be                       </div>\n  );
  c = c.replace(/\n<\/>\n  \);/g, '\n  );');
  
  fs.writeFileSync(f, c);
  console.log('Fixed:', f);
}
console.log('Done');
