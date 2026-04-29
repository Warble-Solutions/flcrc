"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Event } from "@/lib/supabase/types";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const colorOptions = [
  { label: "Blue", value: "from-[#6fa8dc] to-[#5b93c7]" },
  { label: "Lime → Blue", value: "from-[#9fbf45] to-[#6fa8dc]" },
  { label: "Coral → Gold", value: "from-[#e87d4a] to-[#e6c830]" },
  { label: "Gold → Lime", value: "from-[#e6c830] to-[#9fbf45]" },
  { label: "Gold", value: "from-[#e6c830] to-[#d4b828]" },
];

export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    color: "from-[#6fa8dc] to-[#5b93c7]",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single() as { data: Event | null };

      if (data) {
        setForm({
          title: data.title,
          description: data.description ?? "",
          date: data.date,
          time: data.time ?? "",
          location: data.location ?? "",
          color: data.color,
        });
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase
      .from("events")
      .update({
        title: form.title,
        description: form.description || null,
        date: form.date,
        time: form.time || null,
        location: form.location || null,
        color: form.color,
      })
      .eq("id", id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/events");
    router.refresh();
  };

  if (loading)
    return (
      <div className="text-gray-400 text-center py-20">Loading event...</div>
    );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/events"
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Events
      </Link>

      <h2 className="text-2xl font-bold text-white">Edit Event</h2>

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
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50"
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
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50 resize-none"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50 [color-scheme:dark]"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50"
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
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6fa8dc]/50"
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
                    ? "border-[#6fa8dc] bg-[#6fa8dc]/10 text-[#6fa8dc]"
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
          className="flex items-center gap-2 bg-[#6fa8dc] hover:bg-[#5b93c7] text-white font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Update Event"}
        </button>
      </form>
    </div>
  );
}
