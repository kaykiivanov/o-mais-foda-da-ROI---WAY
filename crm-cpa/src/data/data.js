// ========== MOCK DATA FOR CRM CPA ==========

export const influencers = [
  { id: 1, nome: 'Lucas Mendes', handle: '@lucasmendes', nicho: 'Finanças', tipoTrafego: 'Instagram Reels', status: 'ativo', cpas: 42, cliques: 3200, cadastros: 380, ftds: 42, custoTotal: 800, ganhoGerado: 3150, linkTracking: 'https://track.link/lucas01' },
  { id: 2, nome: 'Ana Beatriz', handle: '@anabcripto', nicho: 'Crypto', tipoTrafego: 'YouTube Shorts', status: 'ativo', cpas: 67, cliques: 5100, cadastros: 620, ftds: 67, custoTotal: 1200, ganhoGerado: 5025, linkTracking: 'https://track.link/anab02' },
  { id: 3, nome: 'Rafael Costa', handle: '@rafaelbet', nicho: 'Apostas', tipoTrafego: 'TikTok', status: 'ativo', cpas: 31, cliques: 4500, cadastros: 290, ftds: 31, custoTotal: 600, ganhoGerado: 2325, linkTracking: 'https://track.link/rafa03' },
  { id: 4, nome: 'Mariana Silva', handle: '@maritrading', nicho: 'Trading', tipoTrafego: 'Telegram', status: 'pausado', cpas: 12, cliques: 1800, cadastros: 150, ftds: 12, custoTotal: 500, ganhoGerado: 900, linkTracking: 'https://track.link/mari04' },
  { id: 5, nome: 'Pedro Alves', handle: '@pedrogames', nicho: 'Games/Apostas', tipoTrafego: 'Twitch', status: 'ativo', cpas: 55, cliques: 6200, cadastros: 510, ftds: 55, custoTotal: 950, ganhoGerado: 4125, linkTracking: 'https://track.link/pedro05' },
  { id: 6, nome: 'Julia Fernandes', handle: '@juliafx', nicho: 'Forex', tipoTrafego: 'Instagram Stories', status: 'ativo', cpas: 38, cliques: 2900, cadastros: 320, ftds: 38, custoTotal: 700, ganhoGerado: 2850, linkTracking: 'https://track.link/julia06' },
  { id: 7, nome: 'Thiago Ramos', handle: '@thiagobet365', nicho: 'Apostas', tipoTrafego: 'YouTube', status: 'ativo', cpas: 89, cliques: 8700, cadastros: 870, ftds: 89, custoTotal: 1500, ganhoGerado: 6675, linkTracking: 'https://track.link/thiago07' },
  { id: 8, nome: 'Camila Nunes', handle: '@camilainvest', nicho: 'Investimentos', tipoTrafego: 'Facebook Ads', status: 'pausado', cpas: 8, cliques: 900, cadastros: 95, ftds: 8, custoTotal: 400, ganhoGerado: 600, linkTracking: 'https://track.link/camila08' },
  { id: 9, nome: 'Bruno Oliveira', handle: '@brunoslots', nicho: 'Cassino', tipoTrafego: 'TikTok', status: 'ativo', cpas: 73, cliques: 7200, cadastros: 680, ftds: 73, custoTotal: 1100, ganhoGerado: 5475, linkTracking: 'https://track.link/bruno09' },
  { id: 10, nome: 'Fernanda Lima', handle: '@fernandacpa', nicho: 'Multi-nicho', tipoTrafego: 'Instagram + TikTok', status: 'ativo', cpas: 45, cliques: 3800, cadastros: 410, ftds: 45, custoTotal: 850, ganhoGerado: 3375, linkTracking: 'https://track.link/fern10' },
];

export const campanhas = [
  { id: 1, nome: 'Blitz Verão 2026', dataInicio: '2026-01-15', plataforma: 'Multi-plataforma', cpaAcordado: 7.50, status: 'ativa', conversoes: 245 },
  { id: 2, nome: 'Push Cassino Premier', dataInicio: '2026-02-01', plataforma: 'TikTok + Instagram', cpaAcordado: 8.00, status: 'ativa', conversoes: 132 },
  { id: 3, nome: 'Crypto Wave Q1', dataInicio: '2026-01-20', plataforma: 'YouTube + Telegram', cpaAcordado: 7.50, status: 'ativa', conversoes: 98 },
  { id: 4, nome: 'Bet Weekend Rush', dataInicio: '2025-12-01', plataforma: 'Twitch + YouTube', cpaAcordado: 6.50, status: 'finalizada', conversoes: 310 },
  { id: 5, nome: 'Forex Academy', dataInicio: '2026-03-01', plataforma: 'Instagram', cpaAcordado: 9.00, status: 'ativa', conversoes: 56 },
];

export const conversoes = generateConversoes();

function generateConversoes() {
  const nomes = ['Lucas Mendes', 'Ana Beatriz', 'Rafael Costa', 'Pedro Alves', 'Julia Fernandes', 'Thiago Ramos', 'Bruno Oliveira', 'Fernanda Lima'];
  const statusList = ['aprovado', 'aprovado', 'aprovado', 'aprovado', 'pendente', 'pendente', 'rejeitado'];
  const result = [];
  
  for (let i = 1; i <= 60; i++) {
    const dia = Math.floor(Math.random() * 11) + 1;
    const hora = Math.floor(Math.random() * 24);
    const minuto = Math.floor(Math.random() * 60);
    const influencer = nomes[Math.floor(Math.random() * nomes.length)];
    const status = statusList[Math.floor(Math.random() * statusList.length)];
    const valorDeposito = status === 'rejeitado' ? 0 : Math.floor(Math.random() * 500) + 50;
    
    result.push({
      id: `TXN-${String(i).padStart(4, '0')}`,
      dataHora: `2026-03-${String(dia).padStart(2, '0')} ${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`,
      influencer,
      valorDeposito,
      statusCPA: status,
      campanha: campanhas[Math.floor(Math.random() * 3)].nome,
    });
  }
  
  return result.sort((a, b) => b.dataHora.localeCompare(a.dataHora));
}

// Daily CPA data for the last 30 days chart
export const cpaDiario = (() => {
  const data = [];
  for (let i = 30; i >= 1; i--) {
    const date = new Date(2026, 2, 11);
    date.setDate(date.getDate() - i);
    const day = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    data.push({
      dia: day,
      cpas: Math.floor(Math.random() * 20) + 5,
      cadastros: Math.floor(Math.random() * 80) + 20,
      cliques: Math.floor(Math.random() * 500) + 100,
    });
  }
  return data;
})();

// Financial data
export const financeiro = {
  saldoAcumulado: 3375.00,
  metaCPAs: 200,
  cpasAtuais: 152,
  valorPorCPA: 7.50,
  ultimoSaque: '2026-02-28',
  valorUltimoSaque: 1500.00,
  historicoSaques: [
    { data: '2026-02-28', valor: 1500.00, status: 'pago', metodo: 'PIX' },
    { data: '2026-01-31', valor: 1125.00, status: 'pago', metodo: 'PIX' },
    { data: '2025-12-31', valor: 2325.00, status: 'pago', metodo: 'PIX' },
    { data: '2025-11-30', valor: 975.00, status: 'pago', metodo: 'TED' },
  ],
};

// Webhook events log
export const webhookEvents = [
  { id: 1, timestamp: '2026-03-11 14:32:05', tipo: 'postback', origem: 'Perfect Pay', status: 'sucesso', payload: '{"event":"conversion","cpa_id":"TXN-0058"}' },
  { id: 2, timestamp: '2026-03-11 14:28:12', tipo: 'postback', origem: 'Kiwify', status: 'sucesso', payload: '{"event":"ftd","amount":250}' },
  { id: 3, timestamp: '2026-03-11 14:15:33', tipo: 'postback', origem: 'Perfect Pay', status: 'erro', payload: '{"error":"invalid_token"}' },
  { id: 4, timestamp: '2026-03-11 13:50:44', tipo: 'alert', origem: 'Sistema', status: 'sucesso', payload: '{"alert":"Thiago Ramos atingiu 50 CPAs"}' },
  { id: 5, timestamp: '2026-03-11 13:22:19', tipo: 'postback', origem: 'Cassino Royal', status: 'sucesso', payload: '{"event":"registration","user_id":"USR-9281"}' },
  { id: 6, timestamp: '2026-03-11 12:45:00', tipo: 'sync', origem: 'Google Sheets', status: 'sucesso', payload: '{"rows_synced":42}' },
  { id: 7, timestamp: '2026-03-11 12:00:00', tipo: 'alert', origem: 'Telegram Bot', status: 'sucesso', payload: '{"message":"Bruno Oliveira: 70 CPAs"}' },
  { id: 8, timestamp: '2026-03-11 11:30:15', tipo: 'postback', origem: 'Perfect Pay', status: 'sucesso', payload: '{"event":"conversion","cpa_id":"TXN-0055"}' },
];

// Funnel data
export const funnelData = [
  { etapa: 'Cliques', valor: 44300, fill: '#C9A84C' },
  { etapa: 'Cadastros', valor: 4325, fill: '#8B5CF6' },
  { etapa: 'FTDs', valor: 460, fill: '#22C55E' },
  { etapa: 'CPAs Confirmados', valor: 152, fill: '#3B82F6' },
];
