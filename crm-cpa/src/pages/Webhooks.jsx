import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Webhook, Database, MessageSquare, Send, CheckCircle, Copy, RefreshCw, ChevronRight } from 'lucide-react';
import { webhookEvents } from '../data/data';

export default function Webhooks() {
  const [logs, setLogs] = useState(webhookEvents);
  const [simulating, setSimulating] = useState(false);
  const [copied, setCopied] = useState(false);
  const pageRef = useRef(null);

  const postbackUrl = 'https://crm-cpa.app/api/postback?token=sk_live_abc123xyz';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current.children, {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      const newEvent = {
        id: logs.length + 1,
        timestamp: new Date().toLocaleString('pt-BR', { hour12: false }).replace(',', ''),
        tipo: 'postback',
        origem: 'Simulação Manual',
        status: 'sucesso',
        payload: '{"event":"test_conversion","cpa_id":"TXN-SIM-' + Math.floor(Math.random() * 9999) + '"}',
      };
      setLogs(prev => [newEvent, ...prev]);
      setSimulating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(postbackUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const integrations = [
    { name: 'Perfect Pay', icon: Webhook, status: 'conectado', desc: 'Postback ativo para conversões e FTDs', color: '#22C55E' },
    { name: 'Google Sheets', icon: Database, status: 'conectado', desc: 'Espelhamento automático a cada 15min', color: '#3B82F6' },
    { name: 'Telegram Bot', icon: MessageSquare, status: 'conectado', desc: 'Alertas em 50, 100 e 200 CPAs', color: '#A78BFA' },
    { name: 'Slack', icon: Send, status: 'desconectado', desc: 'Notificações de equipe', color: '#F59E0B' },
  ];

  return (
    <div ref={pageRef} className="max-w-[1440px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Integrações & Webhooks</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Configure postbacks, espelhamento e notificações em tempo real</p>
      </div>

      {/* Postback URL */}
      <div className="glass-card p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>URL de Postback</span>
          <span className="manage-link">Manage <ChevronRight size={12} /></span>
        </div>
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>Use esta URL nas plataformas de afiliados para receber dados em tempo real</p>
        <div className="flex gap-2">
          <div className="flex-1 rounded-xl px-4 py-3 font-mono text-xs overflow-x-auto whitespace-nowrap" style={{ background: 'var(--color-bg-input)', border: '1px solid var(--color-border)', color: '#A78BFA' }}>
            {postbackUrl}
          </div>
          <button onClick={handleCopy} className="btn-primary flex items-center gap-2 whitespace-nowrap">
            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {integrations.map((int) => (
          <div key={int.name} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${int.color}18` }}>
                <int.icon size={16} style={{ color: int.color }} />
              </div>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{int.name}</h4>
            </div>
            <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>{int.desc}</p>
            <div className="flex items-center gap-2">
              <span className={`pulse-dot ${int.status === 'conectado' ? 'pulse-dot-green' : 'pulse-dot-red'}`} />
              <span className="text-xs font-medium" style={{ color: int.status === 'conectado' ? '#22C55E' : '#EF4444' }}>
                {int.status === 'conectado' ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Event Log */}
      <div className="glass-card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Log de Eventos</span>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{logs.length} eventos</p>
          </div>
          <button onClick={handleSimulate} disabled={simulating} className="btn-primary flex items-center gap-2">
            <RefreshCw size={14} className={simulating ? 'animate-spin' : ''} />
            {simulating ? 'Simulando...' : 'Simular Webhook'}
          </button>
        </div>
        <div className="space-y-1.5 max-h-[350px] overflow-y-auto">
          {logs.map((event) => (
            <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl transition-colors" style={{ background: 'rgba(255,255,255,0.015)' }}>
              <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${event.status === 'sucesso' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-semibold uppercase" style={{ color: 'var(--color-text-secondary)' }}>{event.tipo}</span>
                  <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>·</span>
                  <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{event.origem}</span>
                </div>
                <p className="text-[11px] font-mono truncate" style={{ color: 'var(--color-text-muted)' }}>{event.payload}</p>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h4 className="text-sm font-semibold mb-3" style={{ color: '#A78BFA' }}>🔄 Make.com / Zapier</h4>
          <ul className="text-xs space-y-2 list-disc list-inside" style={{ color: 'var(--color-text-secondary)' }}>
            <li>Trigger: Webhook recebe postback da plataforma</li>
            <li>Action 1: Registrar conversão no Google Sheets</li>
            <li>Action 2: Atualizar contagem de CPA</li>
            <li>Action 3: Se CPA ≥ 50/100/200 → alerta Telegram</li>
            <li>Action 4: Se meta batida → notificar Slack</li>
          </ul>
        </div>
        <div className="glass-card p-5">
          <h4 className="text-sm font-semibold mb-3" style={{ color: '#A78BFA' }}>🛠 Ferramentas No-Code</h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              ['Airtable', 'Banco de dados relacional com views e automações'],
              ['Softr', 'Interface web com login e dashboards'],
              ['Bubble', 'App builder completo para CRM escalável'],
            ].map(([name, desc]) => (
              <div key={name} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>{name}</p>
                <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
