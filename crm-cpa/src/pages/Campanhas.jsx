import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Zap, Pause, TrendingUp, ChevronRight } from 'lucide-react';
import { campanhas } from '../data/data';

export default function Campanhas() {
  const pageRef = useRef(null);

  const ativas = campanhas.filter(c => c.status === 'ativa').length;
  const finalizadas = campanhas.filter(c => c.status === 'finalizada').length;
  const totalConversoes = campanhas.reduce((s, c) => s + c.conversoes, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current.children, {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="max-w-[1440px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Campanhas</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Gerencie suas campanhas de CPA ativas e finalizadas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
            <Zap size={16} style={{ color: '#22C55E' }} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Ativas</p>
            <p className="text-xl font-bold" style={{ color: '#22C55E' }}>{ativas}</p>
          </div>
        </div>
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Pause size={16} style={{ color: 'var(--color-text-muted)' }} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Finalizadas</p>
            <p className="text-xl font-bold" style={{ color: 'var(--color-text-secondary)' }}>{finalizadas}</p>
          </div>
        </div>
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.12)' }}>
            <TrendingUp size={16} style={{ color: '#A78BFA' }} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Total Conversões</p>
            <p className="text-xl font-bold" style={{ color: '#A78BFA' }}>{totalConversoes}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campanhas.map((camp) => (
          <div key={camp.id} className="glass-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{camp.nome}</h3>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Início: {camp.dataInicio}</p>
              </div>
              <span className={`status-badge ${camp.status === 'ativa' ? 'status-ativo' : 'status-pausado'}`}>
                {camp.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Plataforma</p>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{camp.plataforma}</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>CPA Acordado</p>
                <p className="text-sm font-bold" style={{ color: '#A78BFA' }}>R$ {camp.cpaAcordado.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Conversões</p>
                <p className="text-sm font-bold" style={{ color: '#22C55E' }}>{camp.conversoes}</p>
              </div>
            </div>
            <div className="progress-track" style={{ height: '5px' }}>
              <div className="progress-fill" style={{ width: `${Math.min((camp.conversoes / 200) * 100, 100)}%`, height: '5px' }} />
            </div>
            <p className="text-[10px] font-mono mt-1 text-right" style={{ color: 'var(--color-text-muted)' }}>
              {camp.conversoes}/200 meta geral
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
