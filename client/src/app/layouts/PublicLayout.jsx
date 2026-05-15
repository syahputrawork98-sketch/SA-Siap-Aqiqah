import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Basic Navbar Placeholder */}
      <header className="navbar bg-base-200 border-b border-base-300 px-4 md:px-8">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-primary">SA-Siap-Aqiqah</Link>
        </div>
        <div className="flex-none gap-2">
          <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
          <Link to="/admin" className="btn btn-ghost btn-sm">Admin</Link>
          <Link to="/superadmin" className="btn btn-ghost btn-sm">Superadmin</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Basic Footer Placeholder */}
      <footer className="footer footer-center p-4 bg-base-200 text-base-content border-t border-base-300">
        <div>
          <p>Copyright © 2026 - SA-Siap-Aqiqah (Migration Phase)</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
