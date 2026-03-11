import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Search } from 'lucide-react';

function ProtectedLayout() {

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 min-h-screen flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between"
          style={{ 
            background: 'var(--color-bg-primary)', 
            borderBottom: '1px solid var(--color-border)',
            padding: '24px 48px'
          }}
        >
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '28px', height: '28px' }}>
              <path d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z" stroke="#00FF41" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L16 8L23 12L9 20L16 24L23 20" stroke="#00FF41" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Scalei<span style={{ color: '#00FF41' }}>Hub</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#00FF41]" style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Buscar..."
                className="input-search transition-all outline-none"
                style={{ 
                  width: '260px', 
                  padding: '0.625rem 1rem 0.625rem 2.75rem', 
                  fontSize: '0.8125rem',
                  borderRadius: '1.5rem',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00FF41'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
            
            <div className="h-6 w-px" style={{ background: 'var(--color-border)' }}></div>

            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', color: 'white', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)' }}
            >
              K
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1" style={{ padding: '32px 48px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <ProtectedLayout />;
}
