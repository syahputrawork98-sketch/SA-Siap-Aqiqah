import React from "react";
import { Card, CardContent, EmptyState } from "@/shared/ui";
import { Warehouse, Drumstick, UtensilsCrossed, Package, Grid } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MOCK_DATA_MASTER_DASHBOARD } from "../../model/adminDataMasterData";

export default function DashboardData() {
  const data = MOCK_DATA_MASTER_DASHBOARD;
  const COLORS = ["#e2b97f", "#caa268", "#f6e7c2"];
  
  const cards = [
    { title: "Total Catering", value: data.counts.catering, icon: UtensilsCrossed, color: "from-[#fff7e8] to-[#fbeed7]" },
    { title: "Total Kandang", value: data.counts.kandang, icon: Warehouse, color: "from-[#eafaf3] to-[#dcf7ec]" },
    { title: "Total Hewan", value: data.counts.hewan, icon: Drumstick, color: "from-[#f8ecf8] to-[#f3def4]" },
    { title: "Total Paket", value: data.counts.paket, icon: Package, color: "from-[#e9f2fb] to-[#dceaf9]" },
    { title: "Total Menu", value: data.counts.menu, icon: Grid, color: "from-[#fff4eb] to-[#fdebdc]" },
  ];

  return (
    <div className="p-6 space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-[#3b3b3b] mb-2">Dashboard Data Master</h1>
        <p className="text-sm text-[#7a7368]">Lihat ringkasan data master yang dikelola oleh tim operasional (Mock Data).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className={`shadow-sm border border-[#eee6da] bg-gradient-to-br ${card.color} rounded-2xl hover:shadow-md transition-all duration-300`}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#7a7368] uppercase tracking-wider">{card.title}</p>
                  <h2 className="text-3xl font-bold text-[#3b3b3b] mt-1">{card.value}</h2>
                </div>
                <div className="p-3 bg-white/60 rounded-xl shadow-inner">
                  <Icon size={28} className="text-[#e2b97f]" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Card */}
        <div className="bg-white/80 backdrop-blur-md border border-[#eee6da] rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#3b3b3b] mb-6">Distribusi Hewan per Jenis</h3>
          {data.chartData.length === 0 ? (
            <EmptyState message="Data distribusi hewan belum tersedia." />
          ) : (
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={data.chartData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60}
                    outerRadius={90} 
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Activities Table Card */}
        <div className="bg-white/80 backdrop-blur-md border border-[#eee6da] rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-[#3b3b3b] mb-6">Aktivitas Terbaru Mitra</h3>
          {data.activities.length === 0 ? (
            <EmptyState message="Belum ada aktivitas terbaru mitra." />
          ) : (
            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
              <table className="w-full text-sm">
                <thead className="text-[#7a7368] border-b border-[#eee6da] sticky top-0 bg-white/90 backdrop-blur-sm z-10">
                  <tr>
                    <th className="text-left py-3 font-semibold">Tanggal</th>
                    <th className="text-left py-3 font-semibold">Mitra</th>
                    <th className="text-left py-3 font-semibold">Aktivitas</th>
                  </tr>
                </thead>
                <tbody>
                  {data.activities.map((act, i) => (
                    <tr key={i} className="border-b border-[#f0ebe2] hover:bg-[#f9f6ef]/40 transition-colors">
                      <td className="py-3 text-[#7a7368]">{act.tanggal}</td>
                      <td className="py-3 font-medium text-[#3b3b3b]">{act.mitra}</td>
                      <td className="py-3 text-[#555]">{act.aktivitas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
