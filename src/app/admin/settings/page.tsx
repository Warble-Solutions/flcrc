"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { fallbackSettings } from "@/lib/fallback-data";
import type { SiteSettings } from "@/lib/supabase/types";
import { Save, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const supabase = createClient();
      const { data } = await supabase.from("site_settings").select("*").single();
      
      if (data) {
        setSettings(data);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    
    const supabase = createClient();
    
    // If we have an ID, update, else insert
    // Since it's a single row, we just upsert or update the first record
    let result;
    
    const { id, updated_at, ...updateData } = settings;
    
    if (settings.id && settings.id !== "1") {
       result = await supabase.from("site_settings").update(updateData).eq("id", settings.id);
    } else {
       // First time creating the record in the real DB since fallback has id='1'
       result = await supabase.from("site_settings").insert({
           ...updateData
       });
    }

    if (!result.error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      // Fetch latest ID
      const { data } = await supabase.from("site_settings").select("*").single();
      if (data) setSettings(data);
    } else {
      console.error(result.error);
    }
    
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8 text-slate-400">Loading settings...</div>;
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Site Settings</h1>
          <p className="text-slate-400">Manage global contact information and social media links.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Contact Info */}
        <div className="bg-[#12192b] border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                <Phone size={16} /> Phone Number
              </label>
              <input type="text" value={settings.phone || ""} onChange={e => setSettings({...settings, phone: e.target.value})}
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#6fa8dc] focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input type="email" value={settings.email || ""} onChange={e => setSettings({...settings, email: e.target.value})}
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#6fa8dc] focus:outline-none transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                <MapPin size={16} /> Physical Address
              </label>
              <input type="text" value={settings.address || ""} onChange={e => setSettings({...settings, address: e.target.value})}
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#6fa8dc] focus:outline-none transition-colors" />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-[#12192b] border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Social Media Links</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                <Facebook size={16} /> Facebook URL
              </label>
              <input type="url" value={settings.facebook || ""} onChange={e => setSettings({...settings, facebook: e.target.value})} placeholder="https://facebook.com/..."
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#6fa8dc] focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                <Instagram size={16} /> Instagram URL
              </label>
              <input type="url" value={settings.instagram || ""} onChange={e => setSettings({...settings, instagram: e.target.value})} placeholder="https://instagram.com/..."
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#6fa8dc] focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                <Youtube size={16} /> YouTube URL
              </label>
              <input type="url" value={settings.youtube || ""} onChange={e => setSettings({...settings, youtube: e.target.value})} placeholder="https://youtube.com/..."
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#6fa8dc] focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                <Twitter size={16} /> X (Twitter) URL
              </label>
              <input type="url" value={settings.x_twitter || ""} onChange={e => setSettings({...settings, x_twitter: e.target.value})} placeholder="https://x.com/..."
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#6fa8dc] focus:outline-none transition-colors" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#6fa8dc] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5b93c7] transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? "Saving..." : "Save Settings"}
          </button>
          
          {success && (
            <span className="text-emerald-400 flex items-center gap-2 text-sm font-bold">
              <Check size={16} /> Settings saved successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
