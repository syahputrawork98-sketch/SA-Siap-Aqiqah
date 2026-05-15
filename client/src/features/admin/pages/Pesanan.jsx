import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardContent } from "@/shared/ui";
import { Search, Filter, Eye, CheckCircle, Clock, Package } from "lucide-react";
import { MOCK_ORDERS } from "../model/adminOrdersData";

export default function Pesanan() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [dataPesanan] = useState(MOCK_ORDERS);

  const filteredData = dataPesanan.filter((p) => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "Semua" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Judul halaman */}
      <div>
        <h2 className="text-xl font-semibold text-[#3b3b3b] tracking-wide">
          Manajemen <span className="siqah-accent-text">Pesanan</span>
        </h2>
        <p className="text-sm text-[#7a7368]">
          Lihat, filter, dan kelola data pesanan konsumen (Mock Data).
        </p>
      </div>

      {/* Filter dan pencarian */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-1/3">
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-[#7a7368]"
          />
          <input
            type="text"
            placeholder="Cari nama konsumen..."
            className="w-full pl-9 pr-3 py-2 border border-[#eee6da] rounded-lg text-sm bg-white/70 focus:ring-2 focus:ring-[#e2b97f]/40 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[#7a7368]" />
          <select
            className="border border-[#eee6da] bg-white/70 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-[#e2b97f]/40 focus:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* Tabel pesanan */}
      <Card className="bg-white/80 backdrop-blur-md border border-[#eee6da] shadow-sm">
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#3b3b3b]">
            Daftar Pesanan
          </h3>
          <p className="text-sm text-[#7a7368]">
            Menampilkan {filteredData.length} pesanan.
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-sm text-[#7a7368] border-b border-[#eee6da]">
                  <th className="py-2 px-3 text-left font-semibold">ID Pesanan</th>
                  <th className="py-2 px-3 text-left font-semibold">Nama Konsumen</th>
                  <th className="py-2 px-3 text-left font-semibold">Tanggal</th>
                  <th className="py-2 px-3 text-left font-semibold">Total</th>
                  <th className="py-2 px-3 text-left font-semibold">Status</th>
                  <th className="py-2 px-3 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-[#f0ebe2] text-sm text-[#3b3b3b] hover:bg-[#f9f6ef]/60 transition-colors"
                    >
                      <td className="py-2 px-3 font-medium">{p.id}</td>
                      <td className="py-2 px-3">{p.nama}</td>
                      <td className="py-2 px-3">{p.tanggal}</td>
                      <td className="py-2 px-3">
                        Rp {p.total.toLocaleString("id-ID")}
                      </td>
                      <td className="py-2 px-3">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <Link to={`/admin/pesanan/${p.id}`}>
                          <Button variant="ghost" size="sm" className="mx-auto text-[var(--color-public-accent)] hover:text-[var(--color-public-accent-hover)]">
                            <Eye size={16} />
                            <span>Detail</span>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-[#7a7368] py-10 text-sm italic"
                    >
                      Tidak ada data pesanan yang sesuai dengan filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }) {
  const base =
    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5";
  switch (status) {
    case "Menunggu Pembayaran":
      return (
        <span className={`${base} bg-amber-50 text-amber-600 border border-amber-100`}>
          <Clock size={12} /> {status}
        </span>
      );
    case "Diproses":
      return (
        <span className={`${base} bg-blue-50 text-blue-600 border border-blue-100`}>
          <Package size={12} /> {status}
        </span>
      );
    case "Selesai":
      return (
        <span className={`${base} bg-emerald-50 text-emerald-600 border border-emerald-100`}>
          <CheckCircle size={12} /> {status}
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-50 text-gray-600 border border-gray-100`}>{status}</span>
      );
  }
}
