-- =============================================
-- FLCRC Database Schema
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text,
  date        date NOT NULL,
  time        text,
  location    text,
  color       text DEFAULT 'from-cyan-500 to-blue-500',
  is_sold_out boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS programs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text,
  tag         text,
  icon        text,
  color       text,
  is_featured boolean DEFAULT false,
  sort_order  int DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS team_members (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  role        text NOT NULL,
  bio         text,
  category    text DEFAULT 'staff',
  sort_order  int DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- FORM SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS form_submissions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type        text NOT NULL,
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  message     text,
  metadata    jsonb DEFAULT '{}',
  is_read     boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ (anon can read events, programs, team)
CREATE POLICY "Public can read events" ON events FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read programs" ON programs FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read team members" ON team_members FOR SELECT TO anon USING (true);

-- PUBLIC INSERT (anon can submit forms)
CREATE POLICY "Public can submit forms" ON form_submissions FOR INSERT TO anon WITH CHECK (true);

-- AUTHENTICATED FULL ACCESS (admin users)
CREATE POLICY "Admin full access events" ON events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access programs" ON programs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access team" ON team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access submissions" ON form_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =============================================
-- SEED DATA (current hardcoded content)
-- =============================================

-- Seed Events
INSERT INTO events (title, date, time, location, color) VALUES
  ('Back-to-School Parent Chat', '2025-08-02', 'TBA', 'FLCRC Main Hall', 'from-cyan-500 to-blue-500'),
  ('Senior Social Mixer', '2025-09-27', 'TBA', 'FLCRC Main Hall', 'from-violet-500 to-purple-500'),
  ('Dakota Merriweather 5K Walk/Run', '2025-11-15', '8:00 AM', 'Community Park', 'from-amber-400 to-rose-500'),
  ('9th Annual Banquet', '2025-12-06', '6:00 PM', 'FLCRC Grand Hall', 'from-emerald-500 to-teal-500');

-- Seed Programs (featured)
INSERT INTO programs (title, description, tag, icon, color, is_featured, sort_order) VALUES
  ('Y.A.L.E. Program', 'Youth Ambassador Leadership Education — providing area-wide leadership opportunities for students 5th grade through college to develop skills through community initiatives.', 'Youth', 'GraduationCap', 'bg-blue-600', true, 1),
  ('GRIT / Victim Services', 'Certified mental health professionals provide free, confidential services to crime victims. Finding Your GRIT motivates student victims with healing through action.', 'Community', 'Zap', 'bg-purple-600', true, 2),
  ('RPYL Program', 'Restorative Practices & Youth Leadership — a framework-based program promoting conflict resolution in schools, workplaces, and communities.', 'Education', 'RefreshCw', 'bg-emerald-600', true, 3);

-- Seed additional programs (non-featured)
INSERT INTO programs (title, description, tag, icon, color, is_featured, sort_order) VALUES
  ('Back-2-School Parent Chat', 'Annual event connecting parents with resources, information, and support before the school year begins.', 'Community', 'MessageCircle', 'bg-cyan-600', false, 4),
  ('Summer Enrichment Camp', 'Week-long camp providing youth with educational enrichment, leadership development, and fun activities.', 'Youth', 'Sun', 'bg-amber-600', false, 5),
  ('Bullying Awareness Conference', 'Community conference addressing bullying prevention, intervention strategies, and youth empowerment.', 'Education', 'Shield', 'bg-rose-600', false, 6),
  ('Scholarships & Awards', 'Awarding scholarships to deserving students committed to academic excellence and community service.', 'Youth', 'Trophy', 'bg-yellow-600', false, 7),
  ('College & Career Seminar', 'Preparing students for post-secondary success through college readiness workshops and career exploration.', 'Education', 'BookOpen', 'bg-indigo-600', false, 8);

-- Seed Team Members
INSERT INTO team_members (name, role, bio, category, sort_order) VALUES
  ('Cleo Wadley, Ed.D.', 'President', 'Dr. Wadley brings 30+ years in public education. He serves as Officer of Leadership Development for Harris County Dept. of Education.', 'board', 1),
  ('Millie Chatham', 'Vice President', 'Employed with Texas Health & Human Services for 24 years. Currently serves as Paraprofessional at Lamar CISD and has been with FLCRC since inception.', 'board', 2),
  ('Lacarria Green', 'Treasurer', 'A passionate volunteer recognized as the 2019 Clayton Home Owners Association Volunteer of the Year. Serves with her children to give back to the community.', 'board', 3),
  ('Sharon Tanner', 'Secretary', 'Graduated from The Ohio State University with a BS in Computer Science. Worked in Fort Bend ISD for 11 years and has been a part of Children Services Volunteer Program for 20+ years.', 'board', 4),
  ('Mary Sias', 'Parliamentarian', '', 'board', 5),
  ('Kendon Thibodeaux', 'Youth Advisor', '', 'board', 6),
  ('Ilene Harper, Ph.D.', 'Executive Director', 'Dr. Harper founded FLCRC in 2013. She brings 29 years in education and has presented at a Congressional Briefing on School Discipline in Washington, DC.', 'leadership', 7),
  ('Denise Bean', 'Project and Volunteer Manager', 'A retired State of Texas Social Worker with 27 years advocating for children. Denise leads projects and volunteers at FLCRC.', 'staff', 8),
  ('Sharon Delesbore, Ph.D.', 'Program Coordinator', 'Dr. Delesbore brings 30 years in public education leadership, serving as teacher, principal, and dean of instruction.', 'staff', 9),
  ('LaTarsha Brown', 'Program Assistant', '', 'staff', 10),
  ('Eric Harper', 'Program Assistant', '', 'staff', 11),
  ('Jo Trahan', 'Administrative Assistant', '', 'staff', 12),
  ('Wendy Terrell', 'Certified Public Accountant', '', 'staff', 13),
  ('Oscar White', 'Project and Vendor Coordinator', '', 'staff', 14),
  ('Sunday Price-Johnson, Ph.D., M.Ed', 'Educational Specialist', '', 'staff', 15),
  ('Janice Little, Ph.D.', 'Volunteer Licensed Master Social Worker', '', 'staff', 16),
  ('Jackie Thomas, BSN, RN', 'Registered Nurse', '', 'staff', 17),
  ('Kenae Thibodeaux', 'Education Specialist', '', 'staff', 18),
  ('Abby Santiago', 'Graphic and Technology Designer', '', 'staff', 19);
