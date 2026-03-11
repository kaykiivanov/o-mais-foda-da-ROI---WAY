import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Influencers from './pages/Influencers';
import Campanhas from './pages/Campanhas';
import Conversoes from './pages/Conversoes';
import Financeiro from './pages/Financeiro';
import Webhooks from './pages/Webhooks';
import { Search, ChevronRight } from 'lucide-react';

const pageNames = {
  '/': 'Dashboard',
  '/influencers': 'Influencers',
  '/campanhas': 'Campanhas',
  '/conversoes': 'Conversões',
  '/financeiro': 'Financeiro',
  '/webhooks': 'Integrações',
};

export default function App() {
  const location = useLocation();
  const currentPage = pageNames[location.pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-[68px] min-h-screen flex flex-col">
        {/* Top Header Bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b"
          style={{ background: 'var(--color-bg-primary)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[var(--color-text-muted)]">Home</span>
            <ChevronRight size={14} className="text-[var(--color-text-muted)]" />
            <span className="text-[var(--color-text-primary)] font-medium">{currentPage}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search..."
                className="input-search w-[220px] text-xs"
                style={{ padding: '0.5rem 1rem 0.5rem 2.25rem' }}
              />
            </div>

            {/* User */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #C084FC)', color: 'white' }}
              >
                K
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-5 md:p-7">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/campanhas" element={<Campanhas />} />
            <Route path="/conversoes" element={<Conversoes />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/webhooks" element={<Webhooks />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
