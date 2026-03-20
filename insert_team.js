require('dotenv').config({path: '.env.local'});
const {createClient} = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const members = [
  { name: 'Cleo Wadley, Ed.D.', role: 'President', category: 'board', sort_order: 1 },
  { name: 'Millie Chatham', role: 'Vice President', category: 'board', sort_order: 2 },
  { name: 'Lacarria Green', role: 'Treasurer', category: 'board', sort_order: 3 },
  { name: 'Sharon Tanner', role: 'Secretary', category: 'board', sort_order: 4 },
  { name: 'Mary Sias', role: 'Parliamentarian', category: 'board', sort_order: 5 },
  { name: 'Kendon Thibodeaux', role: 'Youth Advisor', category: 'board', sort_order: 6 },
  { name: 'Ilene Harper, Ph.D.', role: 'Executive Director', category: 'leadership', sort_order: 7 },
  { name: 'Denise Bean', role: 'Project and Volunteer Manager', category: 'staff', sort_order: 8 },
  { name: 'Sharon Delesbore, Ph.D.', role: 'Program Coordinator', category: 'staff', sort_order: 9 },
  { name: 'LaTarsha Brown', role: 'Program Assistant', category: 'staff', sort_order: 10 },
  { name: 'Eric Harper', role: 'Program Assistant', category: 'staff', sort_order: 11 },
  { name: 'Jo Trahan', role: 'Administrative Assistant', category: 'staff', sort_order: 12 },
  { name: 'Wendy Terrell', role: 'Certified Public Accountant', category: 'staff', sort_order: 13 },
  { name: 'Oscar White', role: 'Project and Vendor Coordinator', category: 'staff', sort_order: 14 },
  { name: 'Sunday Price-Johnson, Ph.D., M.Ed', role: 'Educational Specialist', category: 'staff', sort_order: 15 },
  { name: 'Janice Little, Ph.D.', role: 'Volunteer Licensed Master Social Worker', category: 'staff', sort_order: 16 },
  { name: 'Jackie Thomas, BSN, RN', role: 'Registered Nurse', category: 'staff', sort_order: 17 },
  { name: 'Kenae Thibodeaux', role: 'Education Specialist', category: 'staff', sort_order: 18 },
  { name: 'Abby Santiago', role: 'Graphic and Technology Designer', category: 'staff', sort_order: 19 }
];

async function run() {
  const { data: db } = await s.from('team_members').select('*');
  for (const m of members) {
    if (!db || !db.find(d => d.name === m.name)) {
      console.log('Inserting:', m.name);
      await s.from('team_members').insert(m);
    } else {
      console.log('Exists in DB:', m.name);
    }
  }
}
run();
