"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { createClient } from "@/lib/supabase/client";
import { Users } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  category: string;
};

const fallbackTeam: TeamMember[] = [
  { id: "1", name: "Cleo Wadley, Ed.D.", role: "President", bio: "", category: "board" },
  { id: "2", name: "Millie Chatham", role: "Vice President", bio: "", category: "board" },
  { id: "3", name: "Lacarria Green", role: "Treasurer", bio: "", category: "board" },
  { id: "4", name: "Sharon Tanner", role: "Secretary", bio: "", category: "board" },
  { id: "5", name: "Mary Sias", role: "Parliamentarian", bio: "", category: "board" },
  { id: "6", name: "Kendon Thibodeaux", role: "Youth Advisor", bio: "", category: "board" },
  { id: "7", name: "Ilene Harper, Ph.D.", role: "Executive Director", bio: "", category: "leadership" },
  { id: "8", name: "Denise Bean", role: "Project and Volunteer Manager", bio: "", category: "staff" },
  { id: "9", name: "Sharon Delesbore, Ph.D.", role: "Program Coordinator", bio: "", category: "staff" },
  { id: "10", name: "LaTarsha Brown", role: "Program Assistant", bio: "", category: "staff" },
  { id: "11", name: "Eric Harper", role: "Program Assistant", bio: "", category: "staff" },
  { id: "12", name: "Jo Trahan", role: "Administrative Assistant", bio: "", category: "staff" },
  { id: "13", name: "Wendy Terrell", role: "Certified Public Accountant", bio: "", category: "staff" },
  { id: "14", name: "Oscar White", role: "Project and Vendor Coordinator", bio: "", category: "staff" },
  { id: "15", name: "Sunday Price-Johnson, Ph.D., M.Ed", role: "Educational Specialist", bio: "", category: "staff" },
  { id: "16", name: "Janice Little, Ph.D.", role: "Volunteer Licensed Master Social Worker", bio: "", category: "staff" },
  { id: "17", name: "Jackie Thomas, BSN, RN", role: "Registered Nurse", bio: "", category: "staff" },
  { id: "18", name: "Kenae Thibodeaux", role: "Education Specialist", bio: "", category: "staff" },
  { id: "19", name: "Abby Santiago", role: "Graphic and Technology Designer", bio: "", category: "staff" },
];

const availableImages = [
  "Abby Santiago.jpg", "Cleo Wadley.jpg", "Denise Bean.jpg", "Eric Harper.jpg",
  "Ilene Harper.jpg", "Jackie Thomas.jpg", "Janice Little.jpg", "Jo Trahan.jpg",
  "Kenae Thibodeaux.jpg", "Kendon Thibodeaux.jpg", "LaTarsha Brown.jpg",
  "Lacarria Green.jpg", "Mary Sias.jpg", "Millie Chatham.jpg", "Oscar White.jpg",
  "Sharon Delesbore.jpg", "Sharon Tanner.jpg", "Sunday Price-Johnson.jpg", "Wendy Terrell.jpg",
];

function getImageForMember(name: string) {
  const parts = name.split(/[\s,.-]+/);
  for (const file of availableImages) {
    const fileBase = file.split(".")[0].toLowerCase();
    if (name.toLowerCase().includes(fileBase)) return `/images/team/${file}`;
    const lastName = parts[parts.length - 1].toLowerCase();
    const firstName =
      parts.length > 1 && parts[0].toLowerCase() === "dr"
        ? parts[1].toLowerCase()
        : parts[0].toLowerCase();
    if (fileBase.includes(lastName) && fileBase.includes(firstName))
      return `/images/team/${file}`;
  }
  return "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80";
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const imagePath = getImageForMember(member.name);
  return (
    <ScrollReveal delay={index * 100}>
      <div className="h-full rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl hover:border-luminous-cyan/40 transition-all group overflow-hidden flex flex-col bg-slate-50">
        <div className="h-64 bg-white/5 relative overflow-hidden">
          <img
            src={imagePath}
            alt={member.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80";
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-luminous-cyan transition-colors">{member.name}</h3>
            <p className="text-white/80 text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors">{member.role}</p>
          </div>
        </div>
        <div className="p-6 flex-grow bg-white group-hover:bg-slate-50 transition-colors">
          <p className="text-slate-600 text-sm leading-relaxed">{member.bio || "Bringing years of dedicated service and community expertise to our organization's mission."}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(fallbackTeam);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true });
      if (data && data.length > 0) {
        const merged = [...data];
        fallbackTeam.forEach((fb) => {
          if (!merged.find((m) => m.name === fb.name)) merged.push(fb);
        });
        setTeam(merged);
      } else {
        setTeam(fallbackTeam);
      }
      setLoading(false);
    };
    fetchTeam();
  }, []);

  const board = team.filter((m) => m.category === "board");
  const staff = team.filter((m) => m.category !== "board");

  return (
    <>
      <PageBanner 
        title="Our Team" 
        subtitle="Meet the dedicated leadership, staff, and board members driving the mission of FLCRC. We are committed to building better communities by empowering families." 
        imageSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
      />

      <section className="relative bg-white text-slate-900 py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                The People Behind the Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">Leadership & Staff</h2>
              <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed mb-4">
                Our talented staff brings decades of combined experience across education, psychology, nursing, social work, and community outreach. Daily operations and program execution are managed closely by this dedicated team.
              </p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading team...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((m, i) => <MemberCard key={m.id} member={m} index={i} />)}
            </div>
          )}
        </div>
      </section>

      <section className="relative bg-luminous-bg text-white py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Board of Directors</h2>
          </ScrollReveal>
          {loading ? (
            <div className="text-center py-12 text-luminous-muted">Loading board...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {board.map((m, i) => <MemberCard key={m.id} member={m} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
