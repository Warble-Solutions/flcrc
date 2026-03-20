#!/usr/bin/env node
// Script to strip layout wrappers from subpage files
const fs = require('fs');
const path = require('path');

const files = [
  'src/app/volunteer/page.tsx',
  'src/app/sponsorship/page.tsx',
  'src/app/donate/page.tsx',
  'src/app/campaign/page.tsx',
  'src/app/facility-rentals/page.tsx',
  'src/app/about/team/page.tsx',
  'src/app/about/strategic-plan/page.tsx',
  'src/app/about/mission-vision/page.tsx',
  'src/app/about/financials/page.tsx',
  'src/app/about/coordinator/page.tsx',
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove layout imports
  content = content.replace(/import AnimatedBackground from [^\r\n]+[\r\n]+/g, '');
  content = content.replace(/import Navigation from [^\r\n]+[\r\n]+/g, '');
  content = content.replace(/import Footer from [^\r\n]+[\r\n]+/g, '');
  
  // Remove showDonate state (but keep other useState calls)
  content = content.replace(/\s*const \[showDonate, setShowDonate\] = useState\(false\);\s*/g, '\n');
  
  // Replace the wrapper div + AnimatedBackground + Navigation + main + Footer pattern
  // Pattern: <div className="min-h-screen flex flex-col relative text-luminous-text">
  //            <AnimatedBackground />
  //            <Navigation onDonate={...} />
  //            <main className="flex-grow z-10...">
  //              ...content...
  //            </main>
  //            <Footer />
  //          </div>
  
  // Remove <AnimatedBackground /> line
  content = content.replace(/\s*<AnimatedBackground \/>\s*/g, '\n');
  
  // Remove <Navigation onDonate={...} /> line  
  content = content.replace(/\s*<Navigation onDonate=\{[^}]*\} \/>\s*/g, '\n');
  
  // Remove <Footer /> line
  content = content.replace(/\s*<Footer \/>\s*/g, '\n');
  
  // Replace the outer wrapper div
  content = content.replace(/<div className="min-h-screen flex flex-col relative text-luminous-text">/g, '<>');
  
  // Replace main wrapper with just the div content
  content = content.replace(/<main className="flex-grow z-10 pt-(\d+) pb-(\d+) px-(\d+)">/g, '<div className="pt-$1 pb-$2 px-$3">');
  content = content.replace(/<main className="flex-grow z-10">/g, '<>');
  
  // Fix closing tags - replace </main> with </div> (for the ones that had pt/pb/px)
  content = content.replace(/<\/main>/g, '</div>');
  
  // Replace the closes for the wrappers
  // The outer </div> that was the min-h-screen wrapper at the very end
  // We need to find the last </div> before the closing of return and replace with </>
  // This is tricky - let's find the pattern of the closing
  
  // Replace the outer closing </div> (the min-h-screen one) with </>
  // It's typically the very last </div> before );
  content = content.replace(/(<\/div>\s*\n\s*)\);(\s*\n\s*\})/g, '</>\n  );$2');
  
  // Handle the setShowDonate references - replace with useDonate
  if (content.includes('setShowDonate(true)') || content.includes('setShowDonate')) {
    // Add useDonate import if not already present
    if (!content.includes('useDonate')) {
      content = content.replace(
        /("use client";\s*\n)/,
        '$1\nimport { useDonate } from "@/components/layout/DonateProvider";\n'
      );
    }
    
    // Add the hook call at the beginning of the component function
    content = content.replace(
      /(export default function \w+\([^)]*\)\s*\{)/,
      '$1\n  const { openDonate } = useDonate();'
    );
    
    // Replace setShowDonate(true) with openDonate()
    content = content.replace(/\(\) => setShowDonate\(true\)/g, 'openDonate');
    content = content.replace(/setShowDonate\(true\)/g, 'openDonate()');
    
    // Remove showDonate Modal blocks (Donate Modal at the end)
    content = content.replace(/\s*\{\/\* Donate Modal \*\/\}[\s\S]*?<\/Modal>/g, '');
  }
  
  // Remove unused useState import if showDonate was the only state
  // Check if useState is still used somewhere else
  const usesStateElsewhere = content.match(/useState/g);
  if (!usesStateElsewhere || usesStateElsewhere.length === 0) {
    content = content.replace(/import \{ useState \} from "react";\s*\n/, '');
    content = content.replace(', useState', '');
  }
  
  // Clean up double blank lines
  content = content.replace(/\n{3,}/g, '\n\n');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed:', file);
}

console.log('Done!');
