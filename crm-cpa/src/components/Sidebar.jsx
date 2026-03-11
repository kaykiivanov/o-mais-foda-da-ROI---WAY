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
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/influencers', icon: Users, label: 'Influencers' },
  { to: '/campanhas', icon: Megaphone, label: 'Campanhas' },
  { to: '/conversoes', icon: ArrowRightLeft, label: 'Conversões' },
  { to: '/financeiro', icon: Wallet, label: 'Financeiro' },
  { to: '/webhooks', icon: Webhook, label: 'Integrações' },
];

export default function Sidebar({ onLogout }) {
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          style={{ display: 'block' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full z-40 flex flex-col items-center py-5"
        style={{
          width: '72px',
          background: 'var(--color-bg-secondary)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-center"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
            marginBottom: '32px',
          }}
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
          {onLogout && (
            <button onClick={onLogout} className="sidebar-icon-btn" style={{ border: 'none', background: 'none' }}>
              <LogOut size={18} />
              <span className="tooltip">Sair</span>
            </button>
          )}
          <div
            className="flex items-center justify-center text-xs font-bold"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
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
