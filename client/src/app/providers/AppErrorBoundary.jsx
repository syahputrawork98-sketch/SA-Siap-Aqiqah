import React from 'react';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
          <div className="card w-full max-w-lg bg-error text-error-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Waduh! Ada masalah sistem.</h2>
              <p>Terjadi kesalahan yang tidak terduga. Silakan coba muat ulang halaman.</p>
              <pre className="bg-base-300 p-4 rounded-lg text-xs overflow-auto max-h-40 mt-4">
                {this.state.error?.toString()}
              </pre>
              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-ghost" 
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
