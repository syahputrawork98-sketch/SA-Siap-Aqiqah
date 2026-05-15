import React, { useState } from "react";
import { Card, CardContent, Button, EmptyState } from "@/shared/ui";
import { Bell, BellRing, MailOpen, Check, Trash2, Filter } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "../model/adminSupportData";

export default function Notifikasi() {
  const [filter, setFilter] = useState("Semua");
  const [data, setData] = useState(MOCK_NOTIFICATIONS);

  const filteredData = data.filter((item) => {
    if (filter === "Belum Dibaca") return !item.isRead;
    if (filter === "Dibaca") return item.isRead;
    return true;
  });

  const markAsRead = (id) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, isRead: true } : item));
  };

  const markAllAsRead = () => {
    setData(prev => prev.map(item => ({ ...item, isRead: true })));
  };

  const stats = [
    { title: "Total Notifikasi", value: data.length, icon: Bell, color: "bg-blue-50 text-blue-600" },
    { title: "Belum Dibaca", value: data.filter(n => !n.isRead).length, icon: BellRing, color: "bg-red-50 text-red-600" },
    { title: "Pembayaran", value: data.filter(n => n.kategori === 'Pembayaran Masuk').length, icon: Bell, color: "bg-amber-50 text-amber-600" },
    { title: "Pesanan", value: data.filter(n => n.kategori === 'Pesanan Baru').length, icon: Bell, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#3b3b3b]">Pusat Notifikasi</h1>
          <p className="text-sm text-[#7a7368]">Pantau aktivitas terbaru dan peringatan sistem.</p>
        </div>
        <Button variant="ghost" onClick={markAllAsRead} disabled={data.every(n => n.isRead)}>
          <Check size={18} />
          Tandai Semua Dibaca
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-[#eee6da] shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#7a7368] uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-xl font-bold text-[#3b3b3b]">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-4 rounded-xl border border-[#eee6da]">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-[#7a7368]" />
          <div className="flex bg-[#f9f6ef] p-1 rounded-lg border border-[#eee6da]">
            {["Semua", "Belum Dibaca", "Dibaca"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  filter === f ? 'bg-white text-[var(--color-brand-primary)] shadow-sm' : 'text-[#7a7368] hover:text-[#3b3b3b]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                item.isRead ? 'bg-white border-[#eee6da] opacity-75' : 'bg-[var(--color-brand-primary-soft)]/10 border-[var(--color-brand-primary-soft)]'
              }`}
            >
              <div className={`p-2 rounded-lg mt-1 ${
                item.kategori === 'Sistem' ? 'bg-gray-100 text-gray-600' :
                item.kategori === 'Pesanan Baru' ? 'bg-green-100 text-green-600' :
                item.kategori === 'Pembayaran Masuk' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <Bell size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a7368]">{item.kategori}</span>
                  <span className="text-[10px] text-[#aaa]">{item.waktu}</span>
                </div>
                <p className={`text-sm mt-1 ${item.isRead ? 'text-[#7a7368]' : 'text-[#3b3b3b] font-medium'}`}>
                  {item.pesan}
                </p>
                <div className="mt-3 flex gap-2">
                  {!item.isRead && (
                    <button 
                      onClick={() => markAsRead(item.id)}
                      className="text-[10px] font-bold text-[var(--color-brand-primary)] hover:underline flex items-center gap-1"
                    >
                      <MailOpen size={12} /> Tandai Dibaca
                    </button>
                  )}
                  <button className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1">
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState message="Tidak ada notifikasi yang sesuai filter." />
        )}
      </div>
    </div>
  );
}
