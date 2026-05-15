import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl font-bold text-primary">SA-Siap-Aqiqah</h2>
          <p className="py-4">
            Fondasi Frontend (React + Vite + Tailwind) berhasil disiapkan.
          </p>
          <div className="stats shadow my-4">
            <div className="stat">
              <div className="stat-title">Counter Test</div>
              <div className="stat-value text-secondary">{count}</div>
            </div>
          </div>
          <div className="card-actions">
            <button 
              className="btn btn-primary"
              onClick={() => setCount((count) => count + 1)}
            >
              Increment
            </button>
          </div>
          <div className="divider">Batch 2</div>
          <p className="text-sm opacity-70">
            Siap untuk migrasi fitur dari SIQAH Frontend.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
