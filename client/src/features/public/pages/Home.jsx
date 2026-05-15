
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-primary mb-4">Selamat Datang di Siap-Aqiqah</h1>
      <p className="text-lg opacity-80 text-center max-w-lg">
        Ini adalah halaman utama (Home) placeholder. Migrasi fitur Landing Page akan dilakukan pada Batch berikutnya.
      </p>
      <div className="mt-8 flex gap-4">
        <a href="/admin" className="btn btn-outline btn-secondary">Go to Admin Dashboard</a>
        <a href="/superadmin" className="btn btn-outline btn-accent">Go to Superadmin Dashboard</a>
      </div>
    </div>
  );
};

export default Home;
