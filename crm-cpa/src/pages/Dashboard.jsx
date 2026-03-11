import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Target, DollarSign, TrendingUp, Percent, Crown, Clock, ChevronRight, ChevronLeft, Settings } from 'lucide-react';
import KPICard from '../components/KPICard';
import { influencers, cpaDiario, funnelData, conversoes, financeiro } from '../data/data';

// Mini Calendar Component
function Calendar() {
  const [currentDate] = useState(new Date(2026, 2, 11));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];
  const startDay = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, current: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, current: true, today: i === today });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, current: false });
  }

  const highlightDays = [7, 14, 20, 22];

  return (
    <div className="glass-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
          <ChevronLeft size={14} />
        </button>
        <h3 className="text-sm font-semibold capitalize" style={{ color: 'var(--color-text-primary)' }}>{monthName}</h3>
        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['SE', 'TE', 'QU', 'QI', 'SE', 'SA', 'DO'].map(d => (
          <div key={d} className="text-center text-[10px] font-semibold py-1" style={{ color: 'var(--color-text-muted)' }}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {days.map((d, i) => (
          <div
            key={i}
            className={`
              text-center text-xs py-1.5 rounded-lg cursor-pointer transition-all duration-200
              ${!d.current ? 'opacity-20' : ''}
              ${d.today ? 'text-white font-bold' : ''}
              ${d.current && highlightDays.includes(d.day) && !d.today ? 'font-semibold' : ''}
            `}
            style={{
              background: d.today ? 'linear-gradient(135deg, #7C3AED, #9333EA)' : d.current && highlightDays.includes(d.day) ? 'rgba(124,58,237,0.15)' : 'transparent',
              color: d.today ? 'white' : d.current && highlightDays.includes(d.day) ? '#A78BFA' : d.current ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
            }}
          >
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const totalCPAs = influencers.reduce((sum, i) => sum + i.cpas, 0);
  const totalCliques = influencers.reduce((sum, i) => sum + i.cliques, 0);
  const totalCadastros = influencers.reduce((sum, i) => sum + i.cadastros, 0);
  const cr = ((totalCadastros / totalCliques) * 100).toFixed(1);
  const totalFTDs = influencers.reduce((sum, i) => sum + i.ftds, 0);
  const ftdRate = ((totalFTDs / totalCadastros) * 100).toFixed(1);
  const valorReceber = financeiro.saldoAcumulado;
  const topInfluencers = [...influencers].sort((a, b) => b.cpas - a.cpas).slice(0, 5);
  const recentConversoes = conversoes.slice(0, 6);
  const progressPercent = ((financeiro.cpasAtuais / financeiro.metaCPAs) * 100).toFixed(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { y: -15, opacity: 0, duration: 0.5, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Header */}
      <div ref={headerRef} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Dashboard</h1>
        </div>
        <button className="btn-ghost flex items-center gap-2">
          <Settings size={14} />
          Configure Screen
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={Target} label="CPAs do Mês" value={totalCPAs} change="+12.5%" changeType="up" color="#7C3AED" delay={0.05} gradient />
        <KPICard icon={DollarSign} label="Valor a Receber" value={valorReceber} prefix="R$ " change="+8.3%" changeType="up" color="#22C55E" delay={0.1} />
        <KPICard icon={TrendingUp} label="Conversion Rate" value={parseFloat(cr)} suffix="%" change="+2.1%" changeType="up" color="#3B82F6" delay={0.15} />
        <KPICard icon={Percent} label="FTD Rate" value={parseFloat(ftdRate)} suffix="%" change="-0.8%" changeType="down" color="#F59E0B" delay={0.2} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Progress Card */}
        <div className="lg:col-span-4 card-purple-gradient kpi-card p-5 flex flex-col justify-between" style={{ minHeight: '220px' }}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Meta CPAs</span>
              <span className="manage-link">Manage <ChevronRight size={12} /></span>
            </div>
            <p className="text-xs mb-4" style={{ color: '#A78BFA' }}>200 CPAs = R$ 1.500,00</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {/* Circular Progress */}
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - financeiro.cpasAtuais / financeiro.metaCPAs)}`}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Current</span>
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{progressPercent}%</span>
                <span className="text-[10px]" style={{ color: '#A78BFA' }}>Max. 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Finance Chart */}
        <div className="lg:col-span-5 glass-card p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Finance</span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  R$ {valorReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>↑ 80.8%</span>
              </div>
            </div>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={cpaDiario}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="dia" tick={{ fill: '#5E5C72', fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: '#1A1A3E',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '0.5rem',
                  color: '#F1F0F5',
                  fontSize: '0.75rem',
                }}
              />
              <Area type="monotone" dataKey="cpas" stroke="#7C3AED" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-2 justify-end mt-2">
            {['1H', '1D', '1M', '1Y'].map((period, i) => (
              <button
                key={period}
                className="text-[10px] px-2 py-1 rounded-md font-medium transition-all cursor-pointer"
                style={{
                  background: i === 2 ? 'rgba(124,58,237,0.2)' : 'transparent',
                  color: i === 2 ? '#A78BFA' : 'var(--color-text-muted)',
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="lg:col-span-3">
          <Calendar />
        </div>
      </div>

      {/* Second Row: Planner + Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Leaderboard as Planner style */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Crown size={14} style={{ color: '#A78BFA' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Top Influencers</span>
            </div>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <div className="space-y-2">
            {topInfluencers.map((inf, i) => {
              const roi = inf.ganhoGerado - inf.custoTotal;
              return (
                <div
                  key={inf.id}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer"
                  style={{ background: i === 0 ? 'rgba(124,58,237,0.08)' : 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = i === 0 ? 'rgba(124,58,237,0.08)' : 'transparent'}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: i === 0 ? 'linear-gradient(135deg, #7C3AED, #9333EA)' : 'rgba(255,255,255,0.05)',
                      color: i === 0 ? 'white' : 'var(--color-text-muted)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{inf.nome}</p>
                    <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{inf.handle}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{ color: '#A78BFA' }}>{inf.cpas} CPAs</p>
                    <p className="text-[11px] font-mono" style={{ color: '#22C55E' }}>+R$ {roi.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Conversions as Table */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: '#A78BFA' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Conversões Recentes</span>
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
                  <td className="font-mono text-xs">{conv.dataHora.split(' ')[0]}</td>
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

      {/* Funnel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Funnel */}
        <div className="lg:col-span-5 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Funil de Vendas</span>
            <span className="manage-link">Manage <ChevronRight size={12} /></span>
          </div>
          <div className="space-y-3">
            {funnelData.map((item, i) => {
              const widthPercent = (item.valor / funnelData[0].valor) * 100;
              const colors = ['#7C3AED', '#A78BFA', '#22C55E', '#3B82F6'];
              return (
                <div key={item.etapa}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{item.etapa}</span>
                    <span className="font-mono font-semibold" style={{ color: colors[i] }}>
                      {item.valor.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="h-7 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div
                      className="h-full rounded-lg flex items-center px-3 transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.max(widthPercent, 10)}%`,
                        background: `linear-gradient(90deg, ${colors[i]}20, ${colors[i]}40)`,
                        borderRight: `2px solid ${colors[i]}`,
                      }}
                    >
                      <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
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
        <div className="lg:col-span-7 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Controle de Performance</span>
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
