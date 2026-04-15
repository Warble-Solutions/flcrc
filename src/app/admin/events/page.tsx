"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Event } from "@/lib/supabase/types";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    setEvents(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSoldOut = async (id: string, current: boolean) => {
    await supabase.from("events").update({ is_sold_out: !current }).eq("id", id);
    fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  if (loading)
    return (
      <div className="text-gray-400 text-center py-20">Loading events...</div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Events</h2>
          <p className="text-sm text-gray-400 mt-1">
            {events.length} event{events.length !== 1 && "s"}
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-[#94cdff] hover:bg-[#8cb6ec] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Event
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {events.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Calendar size={40} className="mx-auto mb-4 opacity-40" />
            <p>No events yet. Create your first event.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Event
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Location
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {events.map((evt) => (
                  <tr
                    key={evt.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{evt.title}</div>
                      {evt.time && (
                        <div className="text-xs text-gray-500 mt-0.5">
                          {evt.time}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(evt.date + "T00:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {evt.location || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleSoldOut(evt.id, evt.is_sold_out)}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full cursor-pointer ${
                          evt.is_sold_out
                            ? "bg-red-500/10 text-red-400"
                            : "bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {evt.is_sold_out ? (
                          <ToggleRight size={14} />
                        ) : (
                          <ToggleLeft size={14} />
                        )}
                        {evt.is_sold_out ? "Sold Out" : "Available"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/events/${evt.id}/edit`}
                          className="p-2 text-gray-400 hover:text-[#94cdff] hover:bg-white/5 rounded-lg transition-all"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => deleteEvent(evt.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                        >
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

