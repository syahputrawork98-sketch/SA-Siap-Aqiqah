import React, { useState } from "react";
import { Card, CardContent, Button } from "@/shared/ui";
import { Building2, CreditCard, ShieldCheck, Save, Globe, Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS_SETTINGS } from "../model/adminSupportData";

export default function Pengaturan() {
  const [settings, setSettings] = useState(BUSINESS_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Pengaturan Berhasil Disimpan! (UI-only)");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#3b3b3b]">Pengaturan Sistem</h1>
          <p className="text-sm text-[#7a7368]">Kelola informasi bisnis, rekening, dan preferensi aplikasi.</p>
        </div>
        <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
          <Save size={18} />
          Simpan Perubahan
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Business Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-[#eee6da] shadow-sm">
            <div className="p-4 border-b border-[#eee6da] bg-[#f9f6ef] flex items-center gap-2">
              <Building2 size={18} className="text-[var(--color-brand-primary)]" />
              <h3 className="font-bold text-[#3b3b3b]">Informasi Bisnis</h3>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#7a7368] uppercase">Nama Bisnis</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 text-[#ccc]" size={16} />
                    <input 
                      className="w-full pl-10 pr-4 py-2 border border-[#eee6da] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)]"
                      value={settings.namaBisnis}
                      onChange={(e) => setSettings({...settings, namaBisnis: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#7a7368] uppercase">Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 text-[#ccc]" size={16} />
                    <input 
                      className="w-full pl-10 pr-4 py-2 border border-[#eee6da] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)]"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#7a7368] uppercase">Email Bisnis</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-[#ccc]" size={16} />
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-[#eee6da] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)]"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#7a7368] uppercase">Alamat Kantor</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-[#ccc]" size={16} />
                  <textarea 
                    className="w-full pl-10 pr-4 py-2 border border-[#eee6da] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-soft)] min-h-[80px]"
                    value={settings.alamat}
                    onChange={(e) => setSettings({...settings, alamat: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#eee6da] shadow-sm">
            <div className="p-4 border-b border-[#eee6da] bg-[#f9f6ef] flex items-center gap-2">
              <CreditCard size={18} className="text-[var(--color-brand-primary)]" />
              <h3 className="font-bold text-[#3b3b3b]">Rekening Pembayaran Utama</h3>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#7a7368] uppercase">Bank</label>
                  <input className="w-full px-4 py-2 border border-[#eee6da] rounded-lg text-sm" value="BCA" readOnly />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-[#7a7368] uppercase">Nomor Rekening</label>
                  <input className="w-full px-4 py-2 border border-[#eee6da] rounded-lg text-sm" value="1234567890" readOnly />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#7a7368] uppercase">Atas Nama</label>
                <input className="w-full px-4 py-2 border border-[#eee6da] rounded-lg text-sm font-bold" value="PT Siap Aqiqah Amanah" readOnly />
              </div>
              <p className="text-[10px] text-[#aaa] italic">* Untuk mengubah rekening, silakan hubungi tim IT (Mode UI-only).</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card className="border border-[#eee6da] shadow-sm">
            <div className="p-4 border-b border-[#eee6da] bg-[#f9f6ef] flex items-center gap-2">
              <ShieldCheck size={18} className="text-[var(--color-brand-primary)]" />
              <h3 className="font-bold text-[#3b3b3b]">Preferensi Sistem</h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#3b3b3b]">Persona Switcher</p>
                  <p className="text-xs text-[#7a7368]">Aktifkan simulasi role di dev.</p>
                </div>
                <div className="w-10 h-6 bg-green-500 rounded-full relative p-1 shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#3b3b3b]">Payment Manual</p>
                  <p className="text-xs text-[#7a7368]">Metode transfer bank aktif.</p>
                </div>
                <div className="w-10 h-6 bg-green-500 rounded-full relative p-1 shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between opacity-50">
                <div>
                  <p className="text-sm font-semibold text-[#3b3b3b]">Backend Server</p>
                  <p className="text-xs text-[#7a7368]">Status: Belum Terhubung.</p>
                </div>
                <div className="w-10 h-6 bg-gray-300 rounded-full relative p-1 shadow-inner cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#eee6da] shadow-sm">
            <CardContent className="p-6 text-center space-y-2">
              <Globe size={32} className="mx-auto text-[#ccc]" />
              <p className="text-sm font-bold text-[#3b3b3b]">Versi Aplikasi</p>
              <p className="text-xs text-[#7a7368]">v0.1.4-beta (Production Ready Candidate)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
