"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const colorOptions = [
  { label: "Cyan → Blue", value: "from-cyan-500 to-blue-500" },
  { label: "Violet → Purple", value: "from-violet-500 to-purple-500" },
  { label: "Amber → Rose", value: "from-amber-400 to-rose-500" },
  { label: "Emerald → Teal", value: "from-emerald-500 to-teal-500" },
  { label: "Pink → Fuchsia", value: "from-pink-500 to-fuchsia-500" },
];

export default function NewEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    color: "from-cyan-500 to-blue-500",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.from("events").insert({
      title: form.title,
      description: form.description || null,
      date: form.date,
      time: form.time || null,
      location: form.location || null,
      color: form.color,
    });

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/events");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/events"
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Events
      </Link>

      <h2 className="text-2xl font-bold text-white">Create Event</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            placeholder="e.g. 9th Annual Banquet"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
            placeholder="Optional description..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date *
            </label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time
            </label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              placeholder="e.g. 6:00 PM"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            placeholder="e.g. FLCRC Main Hall"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Color Theme
          </label>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm({ ...form, color: opt.value })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all ${
                  form.color === opt.value
                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                    : "border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${opt.value}`}
                />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
