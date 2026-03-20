"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Program } from "@/lib/supabase/types";
import { Plus, Pencil, Trash2, BookOpen, Star, StarOff } from "lucide-react";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchPrograms = async () => {
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true });
    setPrograms(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from("programs").update({ is_featured: !current }).eq("id", id);
    fetchPrograms();
  };

  const deleteProgram = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    await supabase.from("programs").delete().eq("id", id);
    fetchPrograms();
  };

  if (loading)
    return <div className="text-gray-400 text-center py-20">Loading programs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Programs</h2>
          <p className="text-sm text-gray-400 mt-1">{programs.length} program{programs.length !== 1 && "s"}</p>
        </div>
        <Link href="/admin/programs/new" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Add Program
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {programs.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
            <p>No programs yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Program</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Tag</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Featured</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {programs.map((prog) => (
                  <tr key={prog.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{prog.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 max-w-md truncate">{prog.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      {prog.tag && <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400">{prog.tag}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFeatured(prog.id, prog.is_featured)}
                        className={`cursor-pointer ${prog.is_featured ? "text-amber-400" : "text-gray-600 hover:text-gray-400"}`}
                      >
                        {prog.is_featured ? <Star size={18} /> : <StarOff size={18} />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/programs/${prog.id}/edit`} className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all">
                          <Pencil size={16} />
                        </Link>
                        <button onClick={() => deleteProgram(prog.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
