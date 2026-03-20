require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {  console.error("Missing supabase credentials in .env.local");  process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const scrapedData = JSON.parse(fs.readFileSync('./scraped.json', 'utf8'));
  const scrapedTeam = scrapedData['https://familylifecrc.org/our-team/'].team;
  
  const { data: dbTeam } = await supabase.from('team_members').select('*');
  
  const missing = scrapedTeam.filter(st => !dbTeam.find(dt => dt.name.includes(st.name.split(',')[0])));
  console.log("\n--- MISSING ---", missing.length);
  
  if (missing.length > 0) {
    let sortOrderOffset = dbTeam.length;
    for (const m of missing) {
      sortOrderOffset++;
      const res = await supabase.from('team_members').insert({
        name: m.name, role: m.role || 'Staff Member', bio: m.bio || '',
        category: m.name.toLowerCase().includes('board') ? 'board' : 'staff',
        sort_order: sortOrderOffset,
      });
      if (res.error) console.error("Error inserting", m.name, res.error.message);
      else console.log("Inserted", m.name);
    }
  }
}

main().catch(console.error);
