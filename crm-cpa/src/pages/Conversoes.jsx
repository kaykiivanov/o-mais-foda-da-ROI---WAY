import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, CheckCircle, Clock, XCircle } from 'lucide-react';
import { conversoes } from '../data/data';

export default function Conversoes() {
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [busca, setBusca] = useState('');
  const pageRef = useRef(null);

  const filtered = conversoes.filter(c => {
    const matchStatus = filtroStatus === 'todos' || c.statusCPA === filtroStatus;
    const matchBusca = c.influencer.toLowerCase().includes(busca.toLowerCase()) || c.id.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  const aprovados = conversoes.filter(c => c.statusCPA === 'aprovado').length;
  const pendentes = conversoes.filter(c => c.statusCPA === 'pendente').length;
  const rejeitados = conversoes.filter(c => c.statusCPA === 'rejeitado').length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current, { y: 15, opacity: 0, duration: 0.5, ease: 'power3.out' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="max-w-[1440px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Conversões</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Acompanhe todas as transações e status de CPA</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
            <CheckCircle size={16} style={{ color: '#22C55E' }} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Aprovados</p>
            <p className="text-xl font-bold" style={{ color: '#22C55E' }}>{aprovados}</p>
          </div>
        </div>
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.12)' }}>
            <Clock size={16} style={{ color: '#3B82F6' }} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Pendentes</p>
            <p className="text-xl font-bold" style={{ color: '#3B82F6' }}>{pendentes}</p>
          </div>
        </div>
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)' }}>
            <XCircle size={16} style={{ color: '#EF4444' }} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Rejeitados</p>
            <p className="text-xl font-bold" style={{ color: '#EF4444' }}>{rejeitados}</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar por ID ou influencer..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-search"
          />
        </div>
        <div className="flex gap-2">
          {['todos', 'aprovado', 'pendente', 'rejeitado'].map(s => (
            <button
              key={s}
              onClick={() => setFiltroStatus(s)}
              className="text-xs px-3 py-2 rounded-lg font-medium transition-all cursor-pointer"
              style={{
                background: filtroStatus === s ? 'linear-gradient(135deg, #7C3AED, #9333EA)' : 'rgba(255,255,255,0.03)',
                color: filtroStatus === s ? 'white' : 'var(--color-text-muted)',
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID Transação</th>
                <th>Data/Hora</th>
                <th>Influencer</th>
                <th>Campanha</th>
                <th>Depósito</th>
                <th>Status CPA</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((conv) => (
                <tr key={conv.id}>
                  <td className="font-mono text-xs" style={{ color: '#A78BFA' }}>{conv.id}</td>
                  <td className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>{conv.dataHora}</td>
                  <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{conv.influencer}</td>
                  <td className="text-xs">{conv.campanha}</td>
                  <td className="font-mono">
                    {conv.valorDeposito > 0 ? (
                      <span style={{ color: '#22C55E' }}>R$ {conv.valorDeposito.toLocaleString('pt-BR')}</span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                    )}
                  </td>
                  <td><span className={`status-badge status-${conv.statusCPA}`}>{conv.statusCPA}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
