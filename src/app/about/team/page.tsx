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
      <GlassCard className="h-full border border-white/5 hover:border-luminous-cyan/40 transition-all group overflow-hidden flex flex-col">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
            <p className="text-luminous-cyan text-sm font-bold uppercase tracking-wider">{member.role}</p>
          </div>
        </div>
        <div className="p-6 flex-grow">
          <p className="text-luminous-muted text-sm leading-relaxed">{member.bio}</p>
        </div>
      </GlassCard>
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
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
      />
      <div className="pb-20 px-4 pt-16">
        <div className="max-w-6xl mx-auto">

        <div className="mb-24">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Leadership &amp; Staff</h2>
          </ScrollReveal>
          {loading ? (
            <div className="text-center py-12 text-luminous-muted">Loading team...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((m, i) => <MemberCard key={m.id} member={m} index={i} />)}
            </div>
          )}
        </div>

        <div>
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
      </div>
    </div>
    </>
  );
}
