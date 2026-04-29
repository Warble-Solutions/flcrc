"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const tagOptions = ["Youth", "Community", "Education", "Health", "Family"];
const iconOptions = ["GraduationCap", "Zap", "RefreshCw", "MessageCircle", "Shield", "BookOpen", "Trophy", "Sun", "Heart"];
const colorOptions = [
  { label: "Blue", value: "bg-blue-600" },
  { label: "Lime", value: "bg-purple-600" },
  { label: "Green", value: "bg-emerald-600" },
  { label: "Gold", value: "bg-[#d4b828]" },
  { label: "Coral", value: "bg-rose-600" },
];

export default function NewProgramPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tag: "Youth",
    icon: "GraduationCap",
    color: "bg-blue-600",
    is_featured: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const supabase = createClient();
    const { error } = await supabase.from("programs").insert({
      title: form.title,
      description: form.description || null,
      tag: form.tag,
      icon: form.icon,
      color: form.color,
      is_featured: form.is_featured,
      slug: generateSlug(form.title),
    });

    if (error) { setError(error.message); setSaving(false); return; }
    router.push("/admin/programs");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/admin/programs" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Programs
      </Link>
      <h2 className="text-2xl font-bold text-white">Create Program</h2>

      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
          <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50"
            placeholder="e.g. Y.A.L.E. Program" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tag</label>
            <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50 [color-scheme:dark]">
              {tagOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
            <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50 [color-scheme:dark]">
              {iconOptions.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((opt) => (
              <button key={opt.value} type="button" onClick={() => setForm({ ...form, color: opt.value })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all ${form.color === opt.value ? "border-[#6fa8dc] bg-[#6fa8dc]/10 text-[#6fa8dc]" : "border-white/10 text-gray-400 hover:border-white/20"}`}>
                <div className={`w-4 h-4 rounded-full ${opt.value}`} /> {opt.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
            className="w-4 h-4 accent-[#6fa8dc]" />
          <span className="text-sm text-gray-300">Featured on homepage</span>
        </label>

        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

        <button type="submit" disabled={saving}
          className="flex items-center gap-2 bg-[#6fa8dc] hover:bg-[#5b93c7] text-[#1b2847] font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 cursor-pointer">
          <Save size={16} /> {saving ? "Saving..." : "Create Program"}
        </button>
      </form>
    </div>
  );
}
