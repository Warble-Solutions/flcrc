import { createClient } from "@/lib/supabase/server";
import { Calendar, BookOpen, Users, Inbox } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch counts
  const [eventsRes, programsRes, teamRes, submissionsRes] = await Promise.all([
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("programs").select("id", { count: "exact", head: true }),
    supabase.from("team_members").select("id", { count: "exact", head: true }),
    supabase
      .from("form_submissions")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
  ]);

  const stats = [
    {
      label: "Events",
      count: eventsRes.count ?? 0,
      icon: Calendar,
      color: "text-[#6fa8dc]",
      bg: "bg-[#6fa8dc]/10",
      href: "/admin/events",
    },
    {
      label: "Programs",
      count: programsRes.count ?? 0,
      icon: BookOpen,
      color: "text-[#e6c830]",
      bg: "bg-[#e6c830]/10",
      href: "/admin/programs",
    },
    {
      label: "Team Members",
      count: teamRes.count ?? 0,
      icon: Users,
      color: "text-[#9fbf45]",
      bg: "bg-[#9fbf45]/10",
      href: "/admin/team",
    },
    {
      label: "Unread Messages",
      count: submissionsRes.count ?? 0,
      icon: Inbox,
      color: "text-[#e87d4a]",
      bg: "bg-[#e87d4a]/10",
      href: "/admin/submissions",
    },
  ];

  // Recent submissions
  const { data: recentSubmissions } = await supabase
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stat.count}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </a>
        ))}
      </div>

      {/* Recent Submissions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Recent Submissions</h2>
        </div>
        <div className="divide-y divide-white/5">
          {recentSubmissions && recentSubmissions.length > 0 ? (
            recentSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    sub.is_read ? "bg-gray-500" : "bg-[#6fa8dc]"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm truncate">
                      {sub.name}
                    </span>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400 capitalize">
                      {sub.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {sub.message || sub.email}
                  </p>
                </div>
                <span className="text-xs text-gray-500 shrink-0">
                  {new Date(sub.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-gray-500 text-sm">
              No submissions yet. Form submissions from the contact and rental
              pages will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
