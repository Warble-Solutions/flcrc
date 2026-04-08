import type { Event, Program, TeamMember } from "./supabase/types";

/** Fallback events when Supabase is unavailable */
export const fallbackEvents: Event[] = [
  {
    id: "1",
    title: "Back-to-School Parent Chat",
    date: "2026-08-01",
    time: "TBA",
    location: "FLCRC Main Hall",
    color: "from-cyan-500 to-blue-500",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
  {
    id: "2",
    title: "Senior Social Mixer",
    date: "2026-09-26",
    time: "TBA",
    location: "FLCRC Main Hall",
    color: "from-violet-500 to-purple-500",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
  {
    id: "3",
    title: "Dakota Merriweather 5K Walk/Run",
    date: "2026-11-14",
    time: "8:00 AM",
    location: "Community Park",
    color: "from-amber-400 to-rose-500",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
  {
    id: "4",
    title: "10th Annual Banquet",
    date: "2026-12-05",
    time: "6:00 PM",
    location: "FLCRC Grand Hall",
    color: "from-emerald-500 to-teal-500",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
];

/** Fallback featured programs (homepage) */
export const fallbackFeaturedPrograms: Array<{ title: string; description: string | null; icon: string | null; color: string | null; tag: string | null }> = [
  {
    title: "Y.A.L.E. Program",
    description:
      "Youth Ambassador Leadership Education — providing area-wide leadership opportunities for students 5th grade through college to develop skills through community initiatives.",
    icon: "GraduationCap",
    color: "bg-[#8cb6ec]",
    tag: "Youth",
  },
  {
    title: "GRIT / Victim Services",
    description:
      "Certified mental health professionals provide free, confidential services to crime victims. Finding Your GRIT motivates student victims with healing through action.",
    icon: "Zap",
    color: "bg-[#eed02e]",
    tag: "Community",
  },
  {
    title: "RPYL Program",
    description:
      "Restorative Practices & Youth Leadership — a framework-based program promoting conflict resolution in schools, workplaces, and communities.",
    icon: "RefreshCw",
    color: "bg-[#b2c84e]",
    tag: "Education",
  },
];

/** Fallback programs (full list for programs page) */
export const fallbackPrograms: Program[] = [
  { id: "1", title: "YALE Leadership", description: "Youth Ambassador Leadership Education — civic engagement & mentorship for tomorrow's leaders.", tag: "Youth", icon: "GraduationCap", color: "bg-blue-600", is_featured: true, sort_order: 0, created_at: "" },
  { id: "2", title: "Restorative Practices", description: "Conflict resolution training that heals rather than punishes. For schools, workplaces, and homes.", tag: "Community", icon: "RefreshCw", color: "bg-purple-600", is_featured: true, sort_order: 1, created_at: "" },
  { id: "3", title: "Parent Chat", description: "Support circles where parents connect, share experiences, and learn together.", tag: "Family", icon: "MessageCircle", color: "bg-emerald-600", is_featured: false, sort_order: 2, created_at: "" },
  { id: "4", title: "GRIT Program", description: "Growth Rewarding Insight Tools — building resilience in at-risk youth.", tag: "Youth", icon: "Zap", color: "bg-yellow-400", is_featured: true, sort_order: 3, created_at: "" },
  { id: "5", title: "Victim Services", description: "Confidential crisis intervention, counseling, and legal advocacy for crime victims.", tag: "Community", icon: "Shield", color: "bg-rose-600", is_featured: false, sort_order: 4, created_at: "" },
  { id: "6", title: "Scholarships", description: "Financial aid and awards to support students pursuing higher education.", tag: "Family", icon: "BookOpen", color: "bg-emerald-600", is_featured: false, sort_order: 5, created_at: "" },
];

/** Fallback team members */
export const fallbackTeam: TeamMember[] = [
  { id: "1", name: "Ilene Harper, Ph.D.", role: "Founder & Executive Director", bio: "Dr. Harper founded FLCRC in 2013. She brings 29 years in education and has presented at a Congressional Briefing on School Discipline in Washington, DC.", category: "leadership", sort_order: 0, created_at: "" },
  { id: "2", name: "Denise Bean", role: "Project & Volunteer Manager", bio: "A retired State of Texas Social Worker with 27 years advocating for children. Denise leads projects and volunteers at FLCRC.", category: "staff", sort_order: 1, created_at: "" },
  { id: "3", name: "Sharon Delesbore, Ph.D.", role: "Program Coordinator", bio: "Dr. Delesbore brings 30 years in public education leadership, serving as teacher, principal, and dean of instruction.", category: "staff", sort_order: 2, created_at: "" },
  { id: "4", name: "Cleo Wadley, Ed.D.", role: "Board President", bio: "Dr. Wadley brings 30+ years in public education. He serves as Officer of Leadership Development for Harris County Dept. of Education.", category: "board", sort_order: 3, created_at: "" },
];
