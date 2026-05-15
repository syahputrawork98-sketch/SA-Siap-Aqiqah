import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <div className="alert alert-info shadow-lg mb-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Admin Role Detected.</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="opacity-75">Ini adalah placeholder untuk Dashboard Admin. Fitur manajemen akan dimigrasi bertahap.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="stats shadow bg-base-200">
          <div className="stat">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value text-primary">0</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
