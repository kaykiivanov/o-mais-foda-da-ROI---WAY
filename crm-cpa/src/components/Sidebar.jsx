import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Megaphone,
  ArrowRightLeft,
  Wallet,
  Webhook,
  Menu,
  X,
  Activity,
  Settings,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/influencers', icon: Users, label: 'Influencers' },
  { to: '/campanhas', icon: Megaphone, label: 'Campanhas' },
  { to: '/conversoes', icon: ArrowRightLeft, label: 'Conversões' },
  { to: '/financeiro', icon: Wallet, label: 'Financeiro' },
  { to: '/webhooks', icon: Webhook, label: 'Integrações' },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="sidebar-mobile-toggle fixed top-4 left-4 z-50 p-2.5 rounded-xl"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — Minimal Icon Style */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          w-[68px] flex flex-col items-center py-5
          transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        style={{ background: 'var(--color-bg-secondary)', borderRight: '1px solid var(--color-border)' }}
      >
        {/* Logo */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-8"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #9333EA)' }}
        >
          <Activity size={18} className="text-white" />
        </div>

        {/* Nav Icons */}
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `sidebar-icon-btn ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <item.icon size={18} />
              <span className="tooltip">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-3 mt-auto">
          <div className="sidebar-icon-btn">
            <Settings size={18} />
            <span className="tooltip">Configurações</span>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #C084FC)',
              color: 'white',
            }}
          >
            K
          </div>
        </div>
      </aside>
    </>
  );
}
