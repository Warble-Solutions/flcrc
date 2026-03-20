require('dotenv').config({path: '.env.local'});
const {createClient} = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
s.from('team_members').select('*').then(r => console.log('DB count:', r.data? r.data.length: 0, r.data? r.data.map(d=>d.name): r.error));
