"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { TeamMember } from "@/lib/supabase/types";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", bio: "", category: "staff" });
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const fetchMembers = async () => {
    const { data } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true });
    setMembers(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const openAdd = () => { setEditId(null); setForm({ name: "", role: "", bio: "", category: "staff" }); setShowForm(true); };
  const openEdit = (m: TeamMember) => { setEditId(m.id); setForm({ name: m.name, role: m.role, bio: m.bio ?? "", category: m.category }); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { name: form.name, role: form.role, bio: form.bio || null, category: form.category };

    if (editId) {
      await supabase.from("team_members").update(payload).eq("id", editId);
    } else {
      await supabase.from("team_members").insert(payload);
    }

    setSaving(false);
    setShowForm(false);
    fetchMembers();
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Delete team member?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    fetchMembers();
  };

  if (loading) return <div className="text-gray-400 text-center py-20">Loading...</div>;

  const categories = ["leadership", "board", "staff"] as const;
  const categoryLabels = { leadership: "Leadership", board: "Board of Directors", staff: "Staff" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Team</h2>
          <p className="text-sm text-gray-400 mt-1">{members.length} member{members.length !== 1 && "s"}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#6fa8dc] hover:bg-[#5b93c7] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Inline Form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">{editId ? "Edit" : "Add"} Team Member</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50" />
            <input type="text" required placeholder="Role / Title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50" />
          </div>
          <textarea rows={3} placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50 resize-none" />
          <div className="flex items-center gap-4">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50 [color-scheme:dark]">
              <option value="leadership">Leadership</option>
              <option value="board">Board</option>
              <option value="staff">Staff</option>
            </select>
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-[#6fa8dc] hover:bg-[#5b93c7] text-white font-bold px-5 py-3 rounded-xl transition-colors disabled:opacity-50 cursor-pointer">
              {saving ? "Saving..." : editId ? "Update" : "Add"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-sm cursor-pointer">Cancel</button>
          </div>
        </form>
      )}

      {/* Team by Category */}
      {categories.map((cat) => {
        const catMembers = members.filter((m) => m.category === cat);
        if (catMembers.length === 0) return null;
        return (
          <div key={cat} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{categoryLabels[cat]}</h3>
            </div>
            <div className="divide-y divide-white/5">
              {catMembers.map((m) => (
                <div key={m.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white">{m.name}</div>
                    <div className="text-xs text-gray-500">{m.role}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEdit(m)} className="p-2 text-gray-400 hover:text-[#6fa8dc] hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => deleteMember(m.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {members.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Users size={40} className="mx-auto mb-4 opacity-40" />
          <p>No team members yet.</p>
        </div>
      )}
    </div>
  );
}

