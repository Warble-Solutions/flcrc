"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { FormSubmission } from "@/lib/supabase/types";
import { Inbox, Mail, MailOpen, Trash2, Filter } from "lucide-react";

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const supabase = createClient();

  const fetchSubmissions = async () => {
    let query = supabase.from("form_submissions").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("type", filter);
    const { data } = await query;
    setSubmissions(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchSubmissions(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [filter]);

  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from("form_submissions").update({ is_read: !current }).eq("id", id);
    fetchSubmissions();
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await supabase.from("form_submissions").delete().eq("id", id);
    if (selectedId === id) setSelectedId(null);
    fetchSubmissions();
  };

  const selected = submissions.find((s) => s.id === selectedId);

  if (loading) return <div className="text-gray-400 text-center py-20">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Submissions</h2>
          <p className="text-sm text-gray-400 mt-1">
            {submissions.filter((s) => !s.is_read).length} unread of {submissions.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          {["all", "contact", "rental", "program_application", "event_booking", "volunteer", "sponsor"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize cursor-pointer transition-all ${filter === f ? "bg-[#6fa8dc]/20 text-[#6fa8dc]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {submissions.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Inbox size={40} className="mx-auto mb-4 opacity-40" />
              <p>No submissions yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
              {submissions.map((sub) => (
                <button key={sub.id} onClick={() => { setSelectedId(sub.id); if (!sub.is_read) toggleRead(sub.id, false); }}
                  className={`w-full text-left px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer ${selectedId === sub.id ? "bg-white/5" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${sub.is_read ? "bg-gray-600" : "bg-[#6fa8dc]"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium text-sm truncate ${sub.is_read ? "text-gray-400" : "text-white"}`}>{sub.name}</span>
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-500 capitalize shrink-0">{sub.type}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{sub.message || sub.email}</p>
                    </div>
                    <span className="text-[10px] text-gray-600 shrink-0">{new Date(sub.created_at).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {selected ? (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                  <p className="text-sm text-gray-400">{selected.email}{selected.phone && ` • ${selected.phone}`}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleRead(selected.id, selected.is_read)}
                    className="p-2 text-gray-400 hover:text-[#6fa8dc] hover:bg-white/5 rounded-lg transition-all cursor-pointer" title={selected.is_read ? "Mark as unread" : "Mark as read"}>
                    {selected.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </button>
                  <button onClick={() => deleteSubmission(selected.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-400 capitalize">{selected.type}</span>
                <span className="text-xs text-gray-500">{new Date(selected.created_at).toLocaleString()}</span>
              </div>

              {selected.message && (
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}

              {selected.metadata && Object.keys(selected.metadata).length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Additional Details</h4>
                  <div className="bg-white/5 rounded-xl p-4 space-y-2">
                    {Object.entries(selected.metadata).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-400 capitalize">{key.replace(/_/g, " ")}</span>
                        <span className="text-white">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] text-gray-500 text-sm">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

