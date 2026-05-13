import type { Event, Program, TeamMember, SiteSettings } from "./supabase/types";

/** Fallback events when Supabase is unavailable */
export const fallbackEvents: Event[] = [
  {
    id: "1",
    title: "Back-to-School Parent Chat",
    date: "2026-08-01",
    time: "TBA",
    location: "FLCRC Main Hall",
    color: "from-[#6fa8dc] to-[#5b93c7]",
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
    color: "from-[#9fbf45] to-[#6fa8dc]",
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
    color: "from-[#e87d4a] to-[#e6c830]",
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
    color: "from-[#e6c830] to-[#9fbf45]",
    description: null,
    is_sold_out: false,
    created_at: "",
  },
];

/** Fallback featured programs (homepage) */
export const fallbackFeaturedPrograms: Array<{ title: string; description: string | null; icon: string | null; color: string | null; tag: string | null; slug?: string | null }> = [
  {
    title: "Y.A.L.E. Program",
    description:
      "Youth Ambassador Leadership Education — providing area-wide leadership opportunities for students 5th grade through college to develop skills through community initiatives.",
    icon: "GraduationCap",
    color: "bg-[#5b93c7]",
    tag: "Youth",
    slug: "yale-leadership",
  },
  {
    title: "GRIT / Victim Services",
    description:
      "Certified mental health professionals provide free, confidential services to crime victims. Finding Your GRIT motivates student victims with healing through action.",
    icon: "Zap",
    color: "bg-[#d4b828]",
    tag: "Community",
    slug: "grit-program",
  },
  {
    title: "RPYL Program",
    description:
      "Restorative Practices & Youth Leadership — a framework-based program promoting conflict resolution in schools, workplaces, and communities.",
    icon: "RefreshCw",
    color: "bg-[#8aad3a]",
    tag: "Education",
    slug: "restorative-practices",
  },
];

/** Fallback programs (full list for programs page) */
export const fallbackPrograms: Program[] = [
  { id: "1", title: "YALE Leadership", slug: "yale-leadership", description: "Youth Ambassador Leadership Education — civic engagement & mentorship for tomorrow's leaders.", tag: "Youth", icon: "GraduationCap", color: "bg-blue-600", is_featured: true, sort_order: 0, created_at: "" },
  { id: "2", title: "Restorative Practices", slug: "restorative-practices", description: "Conflict resolution training that heals rather than punishes. For schools, workplaces, and homes.", tag: "Community", icon: "RefreshCw", color: "bg-purple-600", is_featured: true, sort_order: 1, created_at: "" },
  { id: "3", title: "Parent Chat", slug: "parent-chat", description: "Support circles where parents connect, share experiences, and learn together.", tag: "Family", icon: "MessageCircle", color: "bg-emerald-600", is_featured: false, sort_order: 2, created_at: "" },
  { id: "4", title: "GRIT Program", slug: "grit-program", description: "Growth Rewarding Insight Tools — building resilience in at-risk youth.", tag: "Youth", icon: "Zap", color: "bg-[#d4b828]", is_featured: true, sort_order: 3, created_at: "" },
  { id: "5", title: "Victim Services", slug: "victim-services", description: "Confidential crisis intervention, counseling, and legal advocacy for crime victims.", tag: "Community", icon: "Shield", color: "bg-rose-600", is_featured: false, sort_order: 4, created_at: "" },
  { id: "6", title: "Scholarships", slug: "scholarships", description: "Financial aid and awards to support students pursuing higher education.", tag: "Family", icon: "BookOpen", color: "bg-emerald-600", is_featured: false, sort_order: 5, created_at: "" },
];

/** Fallback team members */
export const fallbackTeam: TeamMember[] = [
  { id: "1", name: "Ilene Harper, Ph.D.", role: "Founder & Executive Director", bio: "Dr. Harper founded FLCRC in 2013. She brings 29 years in education and has presented at a Congressional Briefing on School Discipline in Washington, DC.", category: "leadership", sort_order: 0, created_at: "" },
  { id: "2", name: "Denise Bean", role: "Project & Volunteer Manager", bio: "A retired State of Texas Social Worker with 27 years advocating for children. Denise leads projects and volunteers at FLCRC.", category: "staff", sort_order: 1, created_at: "" },
  { id: "3", name: "Sharon Delesbore, Ph.D.", role: "Program Coordinator", bio: "Dr. Delesbore brings 30 years in public education leadership, serving as teacher, principal, and dean of instruction.", category: "staff", sort_order: 2, created_at: "" },
  { id: "4", name: "Cleo Wadley, Ed.D.", role: "Board President", bio: "Dr. Wadley brings 30+ years in public education. He serves as Officer of Leadership Development for Harris County Dept. of Education.", category: "board", sort_order: 3, created_at: "" },
];

export const newsArticles = [
  {
    title: "FLCRC Insights Winter 2025-26",
    date: "March 4, 2026",
    categories: ["Annual Banquet", "Bullying Awareness", "Insights Newsletter", "Y.A.L.E."],
    excerpt:
      "In this issue: Annual Banquet, 2025 Community Survey feedback, and more!",
    image: "https://familylifecrc.org/wp-content/uploads/2026/03/12035-FLCRC.Winter.2026.Newsletter-BlogThumb.jpg",
    link: "https://familylifecrc.org/flcrc-insights-winter-2025-26/",
    featured: true,
  },
  {
    title: "2025 Community Survey",
    date: "March 4, 2026",
    categories: ["Community"],
    excerpt:
      "We conducted our annual community survey this winter. 45 respondents shared helpful insights into 2025 programs and services.",
    image: "https://familylifecrc.org/wp-content/uploads/2026/03/community-survey-2.jpg",
    link: "https://familylifecrc.org/2025survey/",
  },
  {
    title: "An Evening of Celebration and Gratitude",
    date: "December 18, 2025",
    categories: ["Annual Banquet", "FLCRC", "Y.A.L.E."],
    excerpt:
      "On Saturday, December 6, 2025, 140 staff, volunteers, supporters and friends of FLCRC gathered to celebrate another year of growth and impact in Fort Bend County.",
    image: "https://familylifecrc.org/wp-content/uploads/2025/12/9th-banquet-feat-img.jpg",
    link: "https://familylifecrc.org/an-evening-of-celebration-and-gratitude/",
  },
  {
    title: "2025 Volunteer of the Year: Loretta Butler",
    date: "December 6, 2025",
    categories: ["FLCRC"],
    excerpt:
      "We are pleased to announce the FLCRC 2025 Volunteer of the Year, Mrs. Loretta Butler. This award honors a very service-oriented volunteer.",
    image: "https://familylifecrc.org/wp-content/uploads/2025/12/loretta-butler-feat-img.jpg",
    link: "https://familylifecrc.org/2025-volunteer-of-the-year/",
  },
  {
    title: "FLCRC Insights Fall 2025",
    date: "November 24, 2025",
    categories: ["Back-2-School Parent Chat", "Insights Newsletter", "Y.A.L.E."],
    excerpt:
      "In this issue: Back-to-School Parent Chat, Y.A.L.E. Volunteerism and more!",
    image: "https://familylifecrc.org/wp-content/uploads/2025/11/12013-FLCRC.Fall_.2025.Newsletter-FeatImg.jpg",
    link: "https://familylifecrc.org/flcrc-insights-fall-2025/",
  },
  {
    title: "Back-to-School Parent Chat 2025",
    date: "August 3, 2025",
    categories: ["Back-2-School Parent Chat", "Community Resources", "Education"],
    excerpt:
      "We hosted our 21st Annual Back-to-School Parent Chat July 30-August 2, 2025, offering both in-person and virtual sessions and distributing over 150 backpacks with essential school supplies to students.",
    image: "https://familylifecrc.org/wp-content/uploads/2025/10/chat-3.jpg",
    link: "https://familylifecrc.org/back-to-school-parent-chat-2025/",
  },
  {
    title: "FLCRC Insights Summer 2025",
    date: "July 23, 2025",
    categories: ["Insights Newsletter", "Y.A.L.E."],
    excerpt:
      "In this issue: Hat & Tea Soirée, Summer Enrichment Camp and more!",
    image: "https://familylifecrc.org/wp-content/uploads/2025/07/1980-FLCRC.Summer.2025.Newsletter-Feat-Img.jpg",
    link: "https://familylifecrc.org/flcrc-insights-summer-2025/",
  },
  {
    title: "Camp with FLCRC – A Week of Fun and Learning",
    date: "June 21, 2025",
    categories: ["Education", "Summer Enrichment Camp", "Y.A.L.E."],
    excerpt:
      "Twenty-five students enjoyed a fun and interactive week at our Summer Enrichment Camp, 'Camp with FLCRC,' June 16-20.",
    image: "https://familylifecrc.org/wp-content/uploads/2025/06/feat-image.jpg",
    link: "https://familylifecrc.org/camp-with-y-a-l-e-2025-a-week-of-fun-and-learning/",
  },
  {
    title: "FLCRC Insights Spring 2025",
    date: "May 24, 2025",
    categories: ["Insights Newsletter", "Y.A.L.E."],
    excerpt:
      "In this issue: Y.A.L.E. Members Leading and Shining in 2025, Black History Month Celebration, and more!",
    image: "https://familylifecrc.org/wp-content/uploads/2025/05/1952-FLCRC.Spring.2025.Newsletter-FeatImg.jpg",
    link: "https://familylifecrc.org/flcrc-insights-spring-2025/",
  },
  {
    title: "Girls with Pearls: Women Leading & Soaring",
    date: "May 4, 2025",
    categories: ["Entrepreneurship"],
    excerpt:
      "On May 3rd, 2025, we hosted the 2nd annual FLCRC Hat & Tea Soirée, Girls with Pearls: Women Leading & Soaring. Guests were inspired by a panel discussion with four 'women in business.'",
    image: "https://familylifecrc.org/wp-content/uploads/2026/03/soiree6-900x550.jpg",
    link: "https://familylifecrc.org/girls-with-pearls-women-leading-soaring/",
  },
];

/** Fallback site settings */
export const fallbackSettings: SiteSettings = {
  id: "1",
  phone: "(281) 402-6269",
  email: "info@familylifecrc.org",
  address: "821 E Highway 90A, Suite 104, Richmond, Texas 77406",
  facebook: "https://www.facebook.com/FLCRCRichmond/",
  instagram: "https://www.instagram.com/flcrc.richmond/",
  youtube: "https://www.youtube.com/channel/UC1lc1ZAp8HyQys_oL-5Vajg",
  x_twitter: "https://x.com/flcrc",
  updated_at: new Date().toISOString()
};
