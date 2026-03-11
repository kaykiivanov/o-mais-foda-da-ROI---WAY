import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, ExternalLink, AlertTriangle, TrendingUp } from 'lucide-react';
import { influencers } from '../data/data';

export default function Influencers() {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroNicho, setFiltroNicho] = useState('todos');
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const pageRef = useRef(null);

  const nichos = [...new Set(influencers.map(i => i.nicho))];

  const filtered = influencers.filter(i => {
    const matchBusca = i.nome.toLowerCase().includes(busca.toLowerCase()) || i.handle.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || i.status === filtroStatus;
    const matchNicho = filtroNicho === 'todos' || i.nicho === filtroNicho;
    return matchBusca && matchStatus && matchNicho;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current, { y: 15, opacity: 0, duration: 0.5, ease: 'power3.out' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const getCR = (i) => ((i.cadastros / i.cliques) * 100).toFixed(1);
  const getFTD = (i) => ((i.ftds / i.cadastros) * 100).toFixed(1);
  const getROI = (i) => i.ganhoGerado - i.custoTotal;

  return (
    <div ref={pageRef} className="max-w-[1440px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Influencers & Afiliados</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Gerencie e monitore a performance de cada parceiro</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.12)' }}>
            <span className="text-sm font-bold" style={{ color: '#A78BFA' }}>#</span>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Total</p>
            <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{influencers.length}</p>
          </div>
        </div>
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
            <span className="pulse-dot pulse-dot-green" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Ativos</p>
            <p className="text-xl font-bold" style={{ color: '#22C55E' }}>{influencers.filter(i => i.status === 'ativo').length}</p>
          </div>
        </div>
        <div className="kpi-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)' }}>
            <span className="pulse-dot pulse-dot-yellow" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Pausados</p>
            <p className="text-xl font-bold" style={{ color: '#F59E0B' }}>{influencers.filter(i => i.status === 'pausado').length}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar por nome ou @..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-search"
          />
        </div>
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="input-select">
          <option value="todos">Todos Status</option>
          <option value="ativo">Ativo</option>
          <option value="pausado">Pausado</option>
        </select>
        <select value={filtroNicho} onChange={(e) => setFiltroNicho(e.target.value)} className="input-select">
          <option value="todos">Todos Nichos</option>
          {nichos.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Influencer</th>
                <th>Nicho</th>
                <th>Tráfego</th>
                <th>Status</th>
                <th>CPAs</th>
                <th>CR</th>
                <th>FTD</th>
                <th>ROI</th>
                <th>Alertas</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inf) => {
                const cr = parseFloat(getCR(inf));
                const ftd = parseFloat(getFTD(inf));
                const roi = getROI(inf);
                const hasAlert = cr < 10 || ftd < 8;
                return (
                  <tr
                    key={inf.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedInfluencer(selectedInfluencer?.id === inf.id ? null : inf)}
                  >
                    <td>
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{inf.nome}</p>
                        <p className="text-[11px] font-mono" style={{ color: 'var(--color-text-muted)' }}>{inf.handle}</p>
                      </div>
                    </td>
                    <td>
                      <span className="text-[11px] font-medium px-2 py-1 rounded-md" style={{ background: 'rgba(124,58,237,0.08)', color: '#A78BFA' }}>
                        {inf.nicho}
                      </span>
                    </td>
                    <td className="text-xs">{inf.tipoTrafego}</td>
                    <td><span className={`status-badge status-${inf.status}`}>{inf.status}</span></td>
                    <td className="font-bold" style={{ color: '#A78BFA' }}>{inf.cpas}</td>
                    <td>
                      <span className="font-mono text-sm" style={{ color: cr < 10 ? '#EF4444' : '#22C55E' }}>
                        {cr}%
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-sm" style={{ color: ftd < 8 ? '#F59E0B' : '#22C55E' }}>
                        {ftd}%
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-sm font-semibold" style={{ color: roi > 0 ? '#22C55E' : '#EF4444' }}>
                        {roi > 0 ? '+' : ''}R$ {roi.toLocaleString('pt-BR')}
                      </span>
                    </td>
                    <td>
                      {hasAlert ? (
                        <AlertTriangle size={15} style={{ color: '#F59E0B' }} />
                      ) : (
                        <TrendingUp size={15} style={{ color: '#22C55E' }} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInfluencer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedInfluencer(null)}>
          <div className="glass-card p-7 max-w-lg w-full" style={{ border: '1px solid rgba(124,58,237,0.2)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{selectedInfluencer.nome}</h2>
                <p className="text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>{selectedInfluencer.handle}</p>
              </div>
              <span className={`status-badge status-${selectedInfluencer.status}`}>{selectedInfluencer.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                ['CPAs', selectedInfluencer.cpas, '#A78BFA'],
                ['Cliques', selectedInfluencer.cliques.toLocaleString('pt-BR'), null],
                ['Cadastros', selectedInfluencer.cadastros.toLocaleString('pt-BR'), null],
                ['FTDs', selectedInfluencer.ftds, null],
                ['CR', getCR(selectedInfluencer) + '%', parseFloat(getCR(selectedInfluencer)) < 10 ? '#EF4444' : '#22C55E'],
                ['ROI', 'R$ ' + getROI(selectedInfluencer).toLocaleString('pt-BR'), getROI(selectedInfluencer) > 0 ? '#22C55E' : '#EF4444'],
              ].map(([label, val, color]) => (
                <div key={label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                  <p className="text-base font-bold" style={{ color: color || 'var(--color-text-primary)' }}>{val}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono mb-5" style={{ color: 'var(--color-text-muted)' }}>
              <ExternalLink size={12} />
              <span>{selectedInfluencer.linkTracking}</span>
            </div>
            <button onClick={() => setSelectedInfluencer(null)} className="btn-primary w-full text-center">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
