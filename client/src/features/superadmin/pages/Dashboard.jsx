import React from 'react';

const SuperadminDashboard = () => {
  return (
    <div className="p-6">
      <div className="alert alert-warning shadow-lg mb-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <span>Superadmin Role Detected. High Privileges.</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-accent">Superadmin Control Center</h1>
      <p className="opacity-75">Ini adalah placeholder untuk Dashboard Superadmin. Fitur master data dan sistem akan dimigrasi bertahap.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">System Health</h2>
            <p>Status: Monitoring placeholder active.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;
