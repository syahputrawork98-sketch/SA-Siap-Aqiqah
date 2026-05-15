import React from "react";
import { Card, CardContent } from "@/shared/ui";
import { Terminal } from "lucide-react";

export default function DataMasterPlaceholder({ title }) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#3b3b3b] mb-2">{title}</h1>
        <p className="text-sm text-[#7a7368]">Manajemen data master {title.toLowerCase()}.</p>
      </div>

      <Card className="border-dashed border-2 border-[#eee6da] bg-[#fefbf7]">
        <CardContent className="p-12 flex flex-col items-center text-center">
          <div className="p-4 bg-amber-50 rounded-full mb-4">
            <Terminal size={40} className="text-amber-600" />
          </div>
          <h3 className="text-lg font-bold text-[#3b3b3b] mb-2">Modul Sedang Dikembangkan</h3>
          <p className="text-sm text-[#7a7368] max-w-md">
            Halaman <strong>{title}</strong> saat ini masih dalam tahap migrasi UI foundation. 
            Fitur CRUD (Create, Read, Update, Delete) dan integrasi database akan tersedia pada batch pengerjaan selanjutnya.
          </p>
          <div className="mt-6 px-4 py-2 bg-white border border-[#eee6da] rounded-lg text-xs font-mono text-[#7a7368]">
            Status: Frontend-only Placeholder (Batch 14)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
