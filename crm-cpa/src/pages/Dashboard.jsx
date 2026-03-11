import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Target, DollarSign, TrendingUp, Percent, Crown, Clock, ChevronRight, ChevronLeft, Settings } from 'lucide-react';
import KPICard from '../components/KPICard';
import { influencers, cpaDiario, funnelData, conversoes, financeiro } from '../data/data';

/* ===== CALENDAR ===== */
function Calendar() {
  const year = 2026;
  const month = 2; // March
  const today = 11;
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = startDay - 1; i >= 0; i--) days.push({ day: daysInPrevMonth - i, current: false });
  for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, current: true, isToday: i === today });
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) days.push({ day: i, current: false });

  const highlightDays = [7, 14, 20, 22];

  return (
    <div className="glass-card" style={{ padding: '20px', height: '100%' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
        <button style={{ width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
          <ChevronLeft size={14} />
        </button>
        <span className="font-semibold" style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)' }}>
          {monthNames[month]}, {year}
        </span>
        <button style={{ width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
          <ChevronRight size={14} />
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
        {['SE', 'TE', 'QU', 'QI', 'SE', 'SA', 'DO'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '10px', fontWeight: 600, padding: '4px 0', color: 'var(--color-text-muted)' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              padding: '6px 0',
              borderRadius: '8px',
              cursor: d.current ? 'pointer' : 'default',
              opacity: d.current ? 1 : 0.2,
              fontWeight: d.isToday || (d.current && highlightDays.includes(d.day)) ? 700 : 400,
              background: d.isToday ? 'linear-gradient(135deg, #7C3AED, #9333EA)' : d.current && highlightDays.includes(d.day) ? 'rgba(124,58,237,0.12)' : 'transparent',
              color: d.isToday ? 'white' : d.current && highlightDays.includes(d.day) ? '#A78BFA' : d.current ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
              transition: 'background 0.2s ease',
            }}
          >
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== DASHBOARD ===== */
export default function Dashboard() {
  const headerRef = useRef(null);

  // Calculate metrics
  const totalCPAs = influencers.reduce((sum, i) => sum + i.cpas, 0);
  const totalCliques = influencers.reduce((sum, i) => sum + i.cliques, 0);
  const totalCadastros = influencers.reduce((sum, i) => sum + i.cadastros, 0);
  const cr = totalCliques > 0 ? ((totalCadastros / totalCliques) * 100) : 0;
  const totalFTDs = influencers.reduce((sum, i) => sum + i.ftds, 0);
  const ftdRate = totalCadastros > 0 ? ((totalFTDs / totalCadastros) * 100) : 0;
  const valorReceber = financeiro.saldoAcumulado;
  const topInfluencers = [...influencers].sort((a, b) => b.cpas - a.cpas).slice(0, 5);
  const recentConversoes = conversoes.slice(0, 6);
  const progressPercent = ((financeiro.cpasAtuais / financeiro.metaCPAs) * 100);
  const circumference = 2 * Math.PI * 50;
  const offset = circumference * (1 - financeiro.cpasAtuais / financeiro.metaCPAs);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { y: -15, opacity: 0, duration: 0.5, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div ref={headerRef} className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
        <h1 className="font-bold" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>Dashboard</h1>
        <button className="btn-ghost flex items-center gap-2">
          <Settings size={14} />
          Configure Screen
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <KPICard icon={Target} label="CPAs do Mês" value={totalCPAs} change="+12.5%" changeType="up" color="#7C3AED" delay={0.05} gradient />
        <KPICard icon={DollarSign} label="Valor a Receber" value={valorReceber} prefix="R$ " change="+8.3%" changeType="up" color="#22C55E" delay={0.1} />
        <KPICard icon={TrendingUp} label="Conversion Rate" value={parseFloat(cr.toFixed(1))} suffix="%" change="+2.1%" changeType="up" color="#3B82F6" delay={0.15} />
        <KPICard icon={Percent} label="FTD Rate" value={parseFloat(ftdRate.toFixed(1))} suffix="%" change="-0.8%" changeType="down" color="#F59E0B" delay={0.2} />
      </div>

      {/* Main Row: Progress + Finance Chart + Calendar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 0.8fr', gap: '16px', marginBottom: '20px' }}>
        {/* Circular Progress */}
        <div className="card-purple-gradient kpi-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Meta CPAs</span>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <p style={{ fontSize: '0.6875rem', color: '#A78BFA', marginBottom: '12px' }}>200 CPAs = R$ 1.500,00</p>
          <div className="flex-1 flex items-center justify-center">
            <div style={{ position: 'relative', width: '130px', height: '130px' }}>
              <svg width="130" height="130" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(124,58,237,0.12)" strokeWidth="7" />
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke="url(#pgGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                />
                <defs>
                  <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Current</span>
                <span className="font-bold" style={{ fontSize: '1.75rem', color: 'var(--color-text-primary)' }}>{progressPercent.toFixed(0)}%</span>
                <span style={{ fontSize: '10px', color: '#A78BFA' }}>Max. 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Finance Chart */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Finance</span>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <div className="flex items-baseline gap-3" style={{ marginBottom: '12px' }}>
            <span className="font-bold" style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>
              R$ {valorReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="font-semibold" style={{ fontSize: '0.6875rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>↑ 80.8%</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={cpaDiario}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="dia" tick={{ fill: '#5E5C72', fontSize: 10 }} axisLine={false} tickLine={false} interval={5} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#1A1A3E', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', color: '#F1F0F5', fontSize: '0.75rem' }} />
              <Area type="monotone" dataKey="cpas" stroke="#7C3AED" strokeWidth={2} fill="url(#aGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-2 justify-end" style={{ marginTop: '8px' }}>
            {['1H', '1D', '1M', '1Y'].map((p, i) => (
              <button key={p} style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '6px', fontWeight: 500, cursor: 'pointer', border: 'none', background: i === 2 ? 'rgba(124,58,237,0.2)' : 'transparent', color: i === 2 ? '#A78BFA' : 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}>{p}</button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <Calendar />
      </div>

      {/* Second Row: Leaderboard + Recent Conversions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {/* Leaderboard */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <div className="flex items-center gap-2">
              <Crown size={14} style={{ color: '#A78BFA' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Top Influencers</span>
            </div>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <div className="flex flex-col gap-2">
            {topInfluencers.map((inf, i) => {
              const roi = inf.ganhoGerado - inf.custoTotal;
              return (
                <div key={inf.id} className="flex items-center gap-3" style={{ padding: '10px 12px', borderRadius: '12px', background: i === 0 ? 'rgba(124,58,237,0.06)' : 'transparent', transition: 'background 0.2s ease', cursor: 'pointer' }}>
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, background: i === 0 ? 'linear-gradient(135deg, #7C3AED, #9333EA)' : 'rgba(255,255,255,0.04)', color: i === 0 ? 'white' : 'var(--color-text-muted)' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <p className="font-medium" style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inf.nome}</p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{inf.handle}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold" style={{ fontSize: '0.8125rem', color: '#A78BFA' }}>{inf.cpas} CPAs</p>
                    <p className="font-mono" style={{ fontSize: '0.6875rem', color: '#22C55E' }}>+R$ {roi.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Conversions */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: '#A78BFA' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Conversões Recentes</span>
            </div>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Influencer</th>
                <th>Data</th>
                <th>Depósito</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentConversoes.map((conv) => (
                <tr key={conv.id}>
                  <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{conv.influencer}</td>
                  <td className="font-mono" style={{ fontSize: '0.75rem' }}>{conv.dataHora.split(' ')[0]}</td>
                  <td className="font-mono">
                    {conv.valorDeposito > 0 ? (
                      <span style={{ color: '#22C55E' }}>R$ {conv.valorDeposito}</span>
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

      {/* Third Row: Funnel + Performance Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
        {/* Funnel */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Funil de Vendas</span>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <div className="flex flex-col gap-3">
            {funnelData.map((item, i) => {
              const widthPercent = (item.valor / funnelData[0].valor) * 100;
              const colors = ['#7C3AED', '#A78BFA', '#22C55E', '#3B82F6'];
              return (
                <div key={item.etapa}>
                  <div className="flex justify-between" style={{ fontSize: '0.75rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{item.etapa}</span>
                    <span className="font-mono font-semibold" style={{ color: colors[i] }}>{item.valor.toLocaleString('pt-BR')}</span>
                  </div>
                  <div style={{ height: '28px', borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center" style={{ height: '100%', width: `${Math.max(widthPercent, 10)}%`, borderRadius: '8px', background: `linear-gradient(90deg, ${colors[i]}20, ${colors[i]}40)`, borderRight: `2px solid ${colors[i]}`, paddingLeft: '10px', transition: 'width 1s ease' }}>
                      <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                        {i > 0 ? `${((item.valor / funnelData[i - 1].valor) * 100).toFixed(1)}%` : '100%'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Alerts */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Controle de Performance</span>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Métrica</th>
                <th>O que ela te diz?</th>
                <th>Sinal de Alerta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold" style={{ color: '#A78BFA' }}>Click-to-Reg</td>
                <td>O influencer sabe vender a ideia?</td>
                <td><span className="status-badge status-rejeitado">Abaixo de 10% é ruim</span></td>
              </tr>
              <tr>
                <td className="font-semibold" style={{ color: '#A78BFA' }}>Reg-to-CPA</td>
                <td>O público dele tem dinheiro/perfil?</td>
                <td><span className="status-badge status-pausado">Ninguém deposita</span></td>
              </tr>
              <tr>
                <td className="font-semibold" style={{ color: '#A78BFA' }}>Custo por Lead</td>
                <td>Quanto custa trazer esse público?</td>
                <td><span className="status-badge status-rejeitado">Margem de R$7,50 some</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
