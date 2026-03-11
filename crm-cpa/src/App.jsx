import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Influencers from './pages/Influencers';
import Campanhas from './pages/Campanhas';
import Conversoes from './pages/Conversoes';
import Financeiro from './pages/Financeiro';
import Webhooks from './pages/Webhooks';
import Login from './pages/Login';
import { Search, ChevronRight } from 'lucide-react';

const pageNames = {
  '/': 'Dashboard',
  '/influencers': 'Influencers',
  '/campanhas': 'Campanhas',
  '/conversoes': 'Conversões',
  '/financeiro': 'Financeiro',
  '/webhooks': 'Integrações',
};

function ProtectedLayout({ onLogout }) {
  const location = useLocation();
  const currentPage = pageNames[location.pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={onLogout} />

      <div className="flex-1 min-h-screen flex flex-col" style={{ marginLeft: '72px' }}>
        {/* Top Header Bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-8 py-3"
          style={{ background: 'var(--color-bg-primary)', borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2 text-sm">
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>Home</span>
            <ChevronRight size={12} style={{ color: 'var(--color-text-muted)' }} />
            <span className="font-medium" style={{ color: 'var(--color-text-primary)', fontSize: '0.8125rem' }}>{currentPage}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search..."
                className="input-search"
                style={{ width: '200px', padding: '0.5rem 1rem 0.5rem 2.25rem', fontSize: '0.75rem' }}
              />
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #C084FC)', color: 'white' }}
            >
              K
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1" style={{ padding: '24px 32px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/campanhas" element={<Campanhas />} />
            <Route path="/conversoes" element={<Conversoes />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/webhooks" element={<Webhooks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
      </Routes>
    );
  }

  return <ProtectedLayout onLogout={() => setIsLoggedIn(false)} />;
}
