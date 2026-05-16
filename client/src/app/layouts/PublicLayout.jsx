import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from "@/features/public/ui/Footer";
import Navbar from "@/features/public/ui/Navbar";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--core-public-bg-start)] text-[var(--color-text-default)]">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
