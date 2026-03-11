import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, Calendar, ArrowUpRight, ChevronRight } from 'lucide-react';
import { financeiro, influencers } from '../data/data';

export default function Financeiro() {
  const pageRef = useRef(null);

  const progressPercent = ((financeiro.cpasAtuais / financeiro.metaCPAs) * 100).toFixed(0);
  const projecaoMensal = (financeiro.cpasAtuais / 11 * 30 * financeiro.valorPorCPA).toFixed(2);

  const monthlyData = [
    { mes: 'Out', valor: 975 },
    { mes: 'Nov', valor: 1350 },
    { mes: 'Dez', valor: 2325 },
    { mes: 'Jan', valor: 1875 },
    { mes: 'Fev', valor: 1500 },
    { mes: 'Mar', valor: financeiro.saldoAcumulado },
  ];

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
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Financeiro</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Controle de saldo, metas e histórico de pagamentos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-purple-gradient kpi-card p-5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(124,58,237,0.2)' }}>
            <Wallet size={16} style={{ color: '#A78BFA' }} />
          </div>
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Saldo Acumulado</p>
          <p className="text-xl font-bold" style={{ color: '#A78BFA' }}>R$ {financeiro.saldoAcumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="kpi-card p-5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(34,197,94,0.12)' }}>
            <TrendingUp size={16} style={{ color: '#22C55E' }} />
          </div>
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Projeção Mensal</p>
          <p className="text-xl font-bold" style={{ color: '#22C55E' }}>R$ {parseFloat(projecaoMensal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="kpi-card p-5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(59,130,246,0.12)' }}>
            <Calendar size={16} style={{ color: '#3B82F6' }} />
          </div>
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Último Saque</p>
          <p className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{financeiro.ultimoSaque}</p>
          <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>R$ {financeiro.valorUltimoSaque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="kpi-card p-5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(245,158,11,0.12)' }}>
            <ArrowUpRight size={16} style={{ color: '#F59E0B' }} />
          </div>
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Valor por CPA</p>
          <p className="text-xl font-bold" style={{ color: '#F59E0B' }}>R$ {financeiro.valorPorCPA.toFixed(2)}</p>
        </div>
      </div>

      {/* Meta Progress */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Meta de CPAs</h3>
            <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>200 CPAs = R$ 1.500,00 de comissão</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: '#A78BFA' }}>{financeiro.cpasAtuais}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>de {financeiro.metaCPAs}</p>
          </div>
        </div>
        <div className="progress-track" style={{ height: '12px' }}>
          <div className="progress-fill" style={{ width: `${progressPercent}%`, height: '12px' }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>{progressPercent}% concluído</span>
          <span className="text-xs font-mono" style={{ color: '#A78BFA' }}>Faltam {financeiro.metaCPAs - financeiro.cpasAtuais} CPAs</span>
        </div>

        <div className="flex gap-3 mt-5">
          {[50, 100, 150, 200].map(m => {
            const reached = financeiro.cpasAtuais >= m;
            return (
              <div
                key={m}
                className="flex-1 text-center p-3 rounded-xl transition-all"
                style={{ background: reached ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.03)' }}
              >
                <p className="text-base font-bold" style={{ color: reached ? '#A78BFA' : 'var(--color-text-muted)' }}>{m}</p>
                <p className="text-[10px] uppercase" style={{ color: 'var(--color-text-muted)' }}>CPAs</p>
                {reached && <span className="text-[10px]" style={{ color: '#22C55E' }}>✓ Atingido</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Receita Mensal</span>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="mes" tick={{ fill: '#5E5C72', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5E5C72', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                contentStyle={{
                  background: '#1A1A3E',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '0.5rem',
                  color: '#F1F0F5',
                  fontSize: '0.75rem',
                }}
              />
              <Bar dataKey="valor" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Histórico de Saques</span>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <div className="space-y-2.5">
            {financeiro.historicoSaques.map((saque, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <Wallet size={14} style={{ color: '#22C55E' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{saque.data}</p>
                    <p className="text-[11px] font-mono" style={{ color: 'var(--color-text-muted)' }}>{saque.metodo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: '#22C55E' }}>R$ {saque.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className={`status-badge ${saque.status === 'pago' ? 'status-aprovado' : 'status-pendente'}`}>{saque.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
