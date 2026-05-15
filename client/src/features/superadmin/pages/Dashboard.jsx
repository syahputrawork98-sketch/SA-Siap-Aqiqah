import React from "react";
import { Users, ShoppingBag, CreditCard, Bell } from "lucide-react";
import { Card, CardContent, EmptyState } from "@/shared/ui";
import { formatCurrencyIdr } from "@/shared/lib";
import { DEFAULT_SUPERADMIN_DASHBOARD, MOCK_CHART_DATA } from "../model/superadminDashboardData";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#45624B", "#B9914D", "#EBD9B4"];

export default function Dashboard() {
  // Using static mock data for Batch 8
  const data = DEFAULT_SUPERADMIN_DASHBOARD;
  const dataChart = MOCK_CHART_DATA;

  return (
    <div
      className="space-y-10 p-8 rounded-2xl"
      style={{
        backgroundImage: "linear-gradient(to bottom, #fefbf7, #f9f6ef)",
      }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#45624B]">
          Dashboard <span className="siqah-accent-text">Superadmin</span>
        </h1>
        <p className="text-sm text-[#6f6b5b]">
          Ringkasan aktivitas sistem dan performa operasional Siqah Aqiqah (Mock Data)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="text-[#45624B]" />}
          title="Total Pengguna"
          value={data.totalUsers}
          colorFrom="#E3EBD2"
          colorTo="#F5F0E1"
        />
        <StatCard
          icon={<ShoppingBag className="siqah-accent-text" />}
          title="Total Pesanan"
          value={data.totalOrders}
          colorFrom="#FAF6E7"
          colorTo="#EBD9B4"
        />
        <StatCard
          icon={<CreditCard className="text-[#45624B]" />}
          title="Total Pendapatan"
          value={formatCurrencyIdr(data.totalRevenue)}
          colorFrom="#EAE8E2"
          colorTo="#F8F4E3"
        />
        <StatCard
          icon={<Bell className="siqah-accent-text" />}
          title="Notifikasi Baru"
          value={data.newNotifications}
          colorFrom="#F8F4E3"
          colorTo="#E9D5B4"
        />
      </div>

      <Card className="rounded-2xl shadow-md border-0 bg-white">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-[#45624B]">
            Distribusi Aktivitas Sistem
          </h2>
          {dataChart.every((item) => item.value === 0) ? (
            <EmptyState message="Belum ada data distribusi aktivitas." />
          ) : (
            <div className="w-full h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={dataChart}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {dataChart.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      border: "1px solid #EBD9B4",
                      color: "#45624B",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, title, value, colorFrom, colorTo }) {
  return (
    <Card
      className="rounded-2xl border-0 shadow-sm hover:shadow-md transition-all"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${colorFrom}, ${colorTo})`,
      }}
    >
      <CardContent className="flex items-center gap-4 p-6">
        <div className="p-3 bg-white/70 rounded-xl border border-[#E7E1D8] shadow-sm">
          {icon}
        </div>
        <div>
          <p className="text-sm text-[#6f6b5b]">{title}</p>
          <p className="text-xl font-semibold text-[#45624B]">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
