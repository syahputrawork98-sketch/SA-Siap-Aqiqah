import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const RoleLayout = ({ roleTitle }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col md:flex-row">
      {/* Sidebar Placeholder */}
      <aside className="w-full md:w-64 bg-base-300 flex flex-col border-r border-base-content/10">
        <div className="p-4 bg-primary text-primary-content font-bold text-center">
          {roleTitle} Panel
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link to="/" className="btn btn-ghost btn-sm w-full justify-start">← Back to Public</Link>
          <div className="divider">Menu</div>
          <button className="btn btn-ghost btn-sm w-full justify-start active">Dashboard</button>
          <button className="btn btn-ghost btn-sm w-full justify-start opacity-50 cursor-not-allowed">Profile (Coming Soon)</button>
        </nav>
        <div className="p-4 border-t border-base-content/10">
          <button 
            className="btn btn-outline btn-error btn-sm w-full"
            onClick={() => {
              localStorage.removeItem('user_role');
              navigate('/');
            }}
          >
            Logout (Mock)
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Simple Topbar */}
        <header className="h-16 bg-base-200 flex items-center px-6 border-b border-base-content/10 justify-between">
          <div className="font-medium text-lg">Dashboard</div>
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span>U</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RoleLayout;
