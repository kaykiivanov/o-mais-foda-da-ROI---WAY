// ===== PAGES CONTENT =====
// Generates HTML for each secondary page

const Pages = {
  // ===== MEUS AFILIADOS =====
  meusAfiliados() {
    const affiliates = [
      { name: 'Lucas Mendes', email: 'lucas@email.com', initials: 'LM', color: '#4A90D9', status: 'active', revenue: 'R$ 8.420', ftds: 62, clicks: 3420, conversion: '1.81%', region: 'Brasil', joined: '12/01/2025' },
      { name: 'Ana Costa', email: 'ana@email.com', initials: 'AC', color: '#E84393', status: 'active', revenue: 'R$ 6.150', ftds: 45, clicks: 2890, conversion: '1.56%', region: 'Brasil', joined: '05/02/2025' },
      { name: 'Pedro Oliveira', email: 'pedro@email.com', initials: 'PO', color: '#00E86C', status: 'active', revenue: 'R$ 4.830', ftds: 33, clicks: 2100, conversion: '1.57%', region: 'Portugal', joined: '18/03/2025' },
      { name: 'Maria Silva', email: 'maria@email.com', initials: 'MS', color: '#F5A623', status: 'inactive', revenue: 'R$ 2.100', ftds: 15, clicks: 980, conversion: '1.53%', region: 'Brasil', joined: '22/04/2025' },
      { name: 'João Santos', email: 'joao@email.com', initials: 'JS', color: '#9B59B6', status: 'active', revenue: 'R$ 3.500', ftds: 27, clicks: 1750, conversion: '1.54%', region: 'Angola', joined: '30/05/2025' },
      { name: 'Camila Ferreira', email: 'camila@email.com', initials: 'CF', color: '#FF6B35', status: 'pending', revenue: 'R$ 0', ftds: 0, clicks: 120, conversion: '0%', region: 'Brasil', joined: '01/03/2026' },
    ];

    const rows = affiliates.map(a => `
      <tr>
        <td>
          <div class="affiliate-info">
            <div class="affiliate-avatar" style="background:${a.color}20;color:${a.color}">${a.initials}</div>
            <div>
              <div class="affiliate-name">${a.name}</div>
              <div class="affiliate-email">${a.email}</div>
            </div>
          </div>
        </td>
        <td><span class="status-badge ${a.status}">${a.status === 'active' ? 'Ativo' : a.status === 'inactive' ? 'Inativo' : 'Pendente'}</span></td>
        <td>${a.region}</td>
        <td style="font-weight:700">${a.revenue}</td>
        <td>${a.ftds}</td>
        <td>${a.clicks.toLocaleString('pt-BR')}</td>
        <td>${a.conversion}</td>
        <td>${a.joined}</td>
        <td>
          <div class="table-actions">
            <button class="btn-action view">Detalhes</button>
          </div>
        </td>
      </tr>
    `).join('');

    return `
      <div class="page-header">
        <h1>Meus <span>Afiliados</span></h1>
        <button class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Adicionar Afiliado
        </button>
      </div>
      <div class="stats-grid">
        <div class="stat-card" style="animation-delay:0.05s">
          <div class="stat-card-label">Total de Afiliados</div>
          <div class="stat-card-value">6</div>
          <div class="stat-card-change value-positive">+2 este mês</div>
        </div>
        <div class="stat-card" style="animation-delay:0.1s">
          <div class="stat-card-label">Afiliados Ativos</div>
          <div class="stat-card-value" style="color:var(--accent-green)">4</div>
          <div class="stat-card-change" style="color:var(--text-muted)">66.7% do total</div>
        </div>
        <div class="stat-card" style="animation-delay:0.15s">
          <div class="stat-card-label">Faturamento Total</div>
          <div class="stat-card-value">R$ 25.000</div>
          <div class="stat-card-change value-positive">+18% vs mês anterior</div>
        </div>
        <div class="stat-card" style="animation-delay:0.2s">
          <div class="stat-card-label">Conversão Média</div>
          <div class="stat-card-value">1.50%</div>
          <div class="stat-card-change value-positive">+0.12%</div>
        </div>
      </div>
      <div class="data-table-container">
        <div class="data-table-header">
          <h3>Lista de Afiliados</h3>
          <div class="filter-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar afiliado..." oninput="filterPageTable(this.value)">
          </div>
        </div>
        <div class="table-container">
          <table class="data-table" id="page-table">
            <thead>
              <tr>
                <th>Afiliado</th>
                <th>Status</th>
                <th>Região</th>
                <th>Faturamento</th>
                <th>FTDs</th>
                <th>Clicks</th>
                <th>Conv. %</th>
                <th>Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ===== SOLICITAÇÕES =====
  solicitacoes() {
    const requests = [
      { id: '#SOL-001', affiliate: 'Camila Ferreira', initials: 'CF', color: '#FF6B35', type: 'Cadastro', description: 'Solicitação de cadastro como afiliado', date: '01/03/2026', status: 'pending' },
      { id: '#SOL-002', affiliate: 'Lucas Mendes', initials: 'LM', color: '#4A90D9', type: 'Aumento de Comissão', description: 'Solicitação de aumento de comissão de 30% para 35%', date: '28/02/2026', status: 'pending' },
      { id: '#SOL-003', affiliate: 'Ana Costa', initials: 'AC', color: '#E84393', type: 'Link Exclusivo', description: 'Solicitação de link exclusivo para campanha do Instagram', date: '25/02/2026', status: 'pending' },
      { id: '#SOL-004', affiliate: 'Pedro Oliveira', initials: 'PO', color: '#00E86C', type: 'Suporte', description: 'Problema com rastreamento de conversões', date: '20/02/2026', status: 'pending' },
      { id: '#SOL-005', affiliate: 'João Santos', initials: 'JS', color: '#9B59B6', type: 'Material', description: 'Solicitação de criativos para tráfego pago', date: '15/02/2026', status: 'approved' },
    ];

    const rows = requests.map(r => `
      <tr>
        <td style="font-weight:600;color:var(--text-muted)">${r.id}</td>
        <td>
          <div class="affiliate-info">
            <div class="affiliate-avatar" style="background:${r.color}20;color:${r.color}">${r.initials}</div>
            <div class="affiliate-name">${r.affiliate}</div>
          </div>
        </td>
        <td><span class="status-badge ${r.status === 'pending' ? 'pending' : 'active'}">${r.type}</span></td>
        <td style="color:var(--text-secondary);max-width:260px;white-space:normal">${r.description}</td>
        <td style="color:var(--text-muted)">${r.date}</td>
        <td>
          <div class="table-actions">
            ${r.status === 'pending' ? `
              <button class="btn-action approve">Aprovar</button>
              <button class="btn-action reject">Recusar</button>
            ` : `
              <span class="status-badge active">Aprovado</span>
            `}
          </div>
        </td>
      </tr>
    `).join('');

    return `
      <div class="page-header">
        <h1><span>Solicitações</span></h1>
      </div>
      <div class="stats-grid">
        <div class="stat-card" style="animation-delay:0.05s">
          <div class="stat-card-label">Pendentes</div>
          <div class="stat-card-value" style="color:var(--status-warning)">4</div>
        </div>
        <div class="stat-card" style="animation-delay:0.1s">
          <div class="stat-card-label">Aprovadas</div>
          <div class="stat-card-value" style="color:var(--accent-green)">1</div>
        </div>
        <div class="stat-card" style="animation-delay:0.15s">
          <div class="stat-card-label">Recusadas</div>
          <div class="stat-card-value" style="color:var(--status-negative)">0</div>
        </div>
        <div class="stat-card" style="animation-delay:0.2s">
          <div class="stat-card-label">Total</div>
          <div class="stat-card-value">5</div>
        </div>
      </div>
      <div class="data-table-container">
        <div class="data-table-header">
          <h3>Todas as Solicitações</h3>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Afiliado</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ===== LINKS DE USUÁRIOS =====
  linksUsuarios() {
    const links = [
      { affiliate: 'Lucas Mendes', initials: 'LM', color: '#4A90D9', link: 'https://track.seusite.com/aff/lm2025', clicks: 3420, conversions: 62, status: 'active', created: '12/01/2025' },
      { affiliate: 'Ana Costa', initials: 'AC', color: '#E84393', link: 'https://track.seusite.com/aff/ac2025', clicks: 2890, conversions: 45, status: 'active', created: '05/02/2025' },
      { affiliate: 'Pedro Oliveira', initials: 'PO', color: '#00E86C', link: 'https://track.seusite.com/aff/po2025', clicks: 2100, conversions: 33, status: 'active', created: '18/03/2025' },
      { affiliate: 'Maria Silva', initials: 'MS', color: '#F5A623', link: 'https://track.seusite.com/aff/ms2025', clicks: 980, conversions: 15, status: 'inactive', created: '22/04/2025' },
      { affiliate: 'João Santos', initials: 'JS', color: '#9B59B6', link: 'https://track.seusite.com/aff/js2025', clicks: 1750, conversions: 27, status: 'active', created: '30/05/2025' },
    ];

    const rows = links.map(l => `
      <tr>
        <td>
          <div class="affiliate-info">
            <div class="affiliate-avatar" style="background:${l.color}20;color:${l.color}">${l.initials}</div>
            <div class="affiliate-name">${l.affiliate}</div>
          </div>
        </td>
        <td style="font-family:monospace;font-size:var(--font-size-sm);color:var(--accent-green)">${l.link}</td>
        <td style="font-weight:700">${l.clicks.toLocaleString('pt-BR')}</td>
        <td style="font-weight:700">${l.conversions}</td>
        <td><span class="status-badge ${l.status}">${l.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
        <td style="color:var(--text-muted)">${l.created}</td>
        <td>
          <div class="table-actions">
            <button class="btn-action view" onclick="copyToClipboard('${l.link}')">Copiar</button>
            <button class="btn-action view">Editar</button>
          </div>
        </td>
      </tr>
    `).join('');

    return `
      <div class="page-header">
        <h1>Links de <span>Usuários</span></h1>
        <button class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Novo Link
        </button>
      </div>
      <div class="stats-grid">
        <div class="stat-card" style="animation-delay:0.05s">
          <div class="stat-card-label">Links Ativos</div>
          <div class="stat-card-value" style="color:var(--accent-green)">4</div>
        </div>
        <div class="stat-card" style="animation-delay:0.1s">
          <div class="stat-card-label">Total de Clicks</div>
          <div class="stat-card-value">11.140</div>
        </div>
        <div class="stat-card" style="animation-delay:0.15s">
          <div class="stat-card-label">Conversões Totais</div>
          <div class="stat-card-value">182</div>
        </div>
        <div class="stat-card" style="animation-delay:0.2s">
          <div class="stat-card-label">Taxa Média</div>
          <div class="stat-card-value">1.63%</div>
        </div>
      </div>
      <div class="data-table-container">
        <div class="data-table-header">
          <h3>Gerenciar Links</h3>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Afiliado</th>
                <th>Link</th>
                <th>Clicks</th>
                <th>Conversões</th>
                <th>Status</th>
                <th>Criado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ===== GESTÃO DE SAQUES =====
  gestaoSaques() {
    const withdrawals = [
      { id: '#SAQ-001', affiliate: 'Lucas Mendes', initials: 'LM', color: '#4A90D9', amount: 'R$ 2.500', method: 'PIX', date: '04/03/2026', status: 'pending' },
      { id: '#SAQ-002', affiliate: 'Ana Costa', initials: 'AC', color: '#E84393', amount: 'R$ 1.800', method: 'PIX', date: '03/03/2026', status: 'pending' },
      { id: '#SAQ-003', affiliate: 'Pedro Oliveira', initials: 'PO', color: '#00E86C', amount: 'R$ 1.200', method: 'Transferência', date: '02/03/2026', status: 'pending' },
      { id: '#SAQ-004', affiliate: 'João Santos', initials: 'JS', color: '#9B59B6', amount: 'R$ 950', method: 'PIX', date: '01/03/2026', status: 'approved' },
      { id: '#SAQ-005', affiliate: 'Lucas Mendes', initials: 'LM', color: '#4A90D9', amount: 'R$ 3.100', method: 'PIX', date: '25/02/2026', status: 'approved' },
      { id: '#SAQ-006', affiliate: 'Ana Costa', initials: 'AC', color: '#E84393', amount: 'R$ 2.200', method: 'PIX', date: '20/02/2026', status: 'approved' },
      { id: '#SAQ-007', affiliate: 'Maria Silva', initials: 'MS', color: '#F5A623', amount: 'R$ 800', method: 'Transferência', date: '15/02/2026', status: 'rejected' },
      { id: '#SAQ-008', affiliate: 'Pedro Oliveira', initials: 'PO', color: '#00E86C', amount: 'R$ 1.500', method: 'PIX', date: '10/02/2026', status: 'approved' },
    ];

    const rows = withdrawals.map(w => `
      <tr>
        <td style="font-weight:600;color:var(--text-muted)">${w.id}</td>
        <td>
          <div class="affiliate-info">
            <div class="affiliate-avatar" style="background:${w.color}20;color:${w.color}">${w.initials}</div>
            <div class="affiliate-name">${w.affiliate}</div>
          </div>
        </td>
        <td style="font-weight:700;font-size:var(--font-size-md)">${w.amount}</td>
        <td>${w.method}</td>
        <td style="color:var(--text-muted)">${w.date}</td>
        <td><span class="status-badge ${w.status === 'approved' ? 'active' : w.status === 'rejected' ? 'inactive' : 'pending'}">${w.status === 'approved' ? 'Pago' : w.status === 'rejected' ? 'Recusado' : 'Pendente'}</span></td>
        <td>
          <div class="table-actions">
            ${w.status === 'pending' ? `
              <button class="btn-action approve">Pagar</button>
              <button class="btn-action reject">Recusar</button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');

    return `
      <div class="page-header">
        <h1>Gestão de <span>Saques</span></h1>
      </div>
      <div class="stats-grid">
        <div class="stat-card" style="animation-delay:0.05s">
          <div class="stat-card-label">Saques Pendentes</div>
          <div class="stat-card-value" style="color:var(--status-warning)">3</div>
        </div>
        <div class="stat-card" style="animation-delay:0.1s">
          <div class="stat-card-label">Valor Pendente</div>
          <div class="stat-card-value" style="color:var(--status-warning)">R$ 5.500</div>
        </div>
        <div class="stat-card" style="animation-delay:0.15s">
          <div class="stat-card-label">Pagos este Mês</div>
          <div class="stat-card-value" style="color:var(--accent-green)">R$ 7.750</div>
        </div>
        <div class="stat-card" style="animation-delay:0.2s">
          <div class="stat-card-label">Total Pago</div>
          <div class="stat-card-value">R$ 14.050</div>
        </div>
      </div>
      <div class="data-table-container">
        <div class="data-table-header">
          <h3>Histórico de Saques</h3>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Afiliado</th>
                <th>Valor</th>
                <th>Método</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ===== MEU FINANCEIRO =====
  meuFinanceiro() {
    return `
      <div class="page-header">
        <h1>Meu <span>Financeiro</span></h1>
        <button class="btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exportar Relatório
        </button>
      </div>
      <div class="stats-grid">
        <div class="stat-card" style="animation-delay:0.05s">
          <div class="stat-card-label">Receita Total</div>
          <div class="stat-card-value">R$ 25.000</div>
          <div class="stat-card-change value-positive">+22% vs mês anterior</div>
        </div>
        <div class="stat-card" style="animation-delay:0.1s">
          <div class="stat-card-label">Comissões Pagas</div>
          <div class="stat-card-value" style="color:var(--status-warning)">R$ 14.050</div>
        </div>
        <div class="stat-card" style="animation-delay:0.15s">
          <div class="stat-card-label">Lucro Líquido</div>
          <div class="stat-card-value" style="color:var(--accent-green)">R$ 10.950</div>
          <div class="stat-card-change value-positive">+15%</div>
        </div>
        <div class="stat-card" style="animation-delay:0.2s">
          <div class="stat-card-label">Saldo Disponível</div>
          <div class="stat-card-value" style="color:var(--accent-green)">R$ 759,50</div>
        </div>
      </div>
      <div class="financial-grid">
        <div class="financial-card" style="animation-delay:0.25s">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Receitas
          </h3>
          <div class="financial-list">
            <div class="financial-row">
              <span class="financial-row-label">Faturamento Bruto</span>
              <span class="financial-row-value">R$ 25.000</span>
            </div>
            <div class="financial-row">
              <span class="financial-row-label">CPA Vendas</span>
              <span class="financial-row-value">R$ 18.200</span>
            </div>
            <div class="financial-row">
              <span class="financial-row-label">RevShare</span>
              <span class="financial-row-value">R$ 4.800</span>
            </div>
            <div class="financial-row">
              <span class="financial-row-label">Bônus</span>
              <span class="financial-row-value">R$ 2.000</span>
            </div>
          </div>
        </div>
        <div class="financial-card" style="animation-delay:0.3s">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--status-negative)" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
            Despesas
          </h3>
          <div class="financial-list">
            <div class="financial-row">
              <span class="financial-row-label">Comissões de Afiliados</span>
              <span class="financial-row-value" style="color:var(--status-negative)">R$ 14.050</span>
            </div>
            <div class="financial-row">
              <span class="financial-row-label">Taxas de Processamento</span>
              <span class="financial-row-value" style="color:var(--status-negative)">R$ 375</span>
            </div>
            <div class="financial-row">
              <span class="financial-row-label">Chargebacks</span>
              <span class="financial-row-value" style="color:var(--status-negative)">R$ 220</span>
            </div>
            <div class="financial-row">
              <span class="financial-row-label">Outros</span>
              <span class="financial-row-value" style="color:var(--status-negative)">R$ 150</span>
            </div>
          </div>
        </div>
      </div>
      <div class="data-table-container" style="animation-delay:0.35s">
        <div class="data-table-header">
          <h3>Últimas Transações</h3>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="color:var(--text-muted)">05/03/2026</td>
                <td>Comissão CPA - Lucas Mendes</td>
                <td><span class="status-badge active">Receita</span></td>
                <td style="font-weight:700" class="value-positive">+ R$ 420</td>
                <td style="font-weight:600">R$ 759,50</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">04/03/2026</td>
                <td>Saque - João Santos</td>
                <td><span class="status-badge inactive">Saque</span></td>
                <td style="font-weight:700" class="value-negative">- R$ 950</td>
                <td style="font-weight:600">R$ 339,50</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">03/03/2026</td>
                <td>Comissão CPA - Ana Costa</td>
                <td><span class="status-badge active">Receita</span></td>
                <td style="font-weight:700" class="value-positive">+ R$ 680</td>
                <td style="font-weight:600">R$ 1.289,50</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">02/03/2026</td>
                <td>Comissão CPA - Pedro Oliveira</td>
                <td><span class="status-badge active">Receita</span></td>
                <td style="font-weight:700" class="value-positive">+ R$ 350</td>
                <td style="font-weight:600">R$ 609,50</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">01/03/2026</td>
                <td>Taxa de processamento</td>
                <td><span class="status-badge pending">Taxa</span></td>
                <td style="font-weight:700" class="value-negative">- R$ 75</td>
                <td style="font-weight:600">R$ 259,50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ===== TERMOS DE USO =====
  termosUso() {
    return `
      <div class="page-header">
        <h1>Termos de <span>Uso</span></h1>
      </div>
      <div class="terms-content">
        <h2>Termos e Condições de Uso da Plataforma</h2>
        <p><strong>Última atualização:</strong> 01 de Março de 2026</p>
        
        <h3>1. Aceitação dos Termos</h3>
        <p>Ao acessar e utilizar esta plataforma, você concorda com estes termos e condições. Se você não concordar com qualquer parte destes termos, não deverá utilizar a plataforma.</p>
        
        <h3>2. Definições</h3>
        <ul>
          <li><strong>Plataforma:</strong> O sistema de gestão de afiliados CPA disponibilizado online.</li>
          <li><strong>Afiliado:</strong> Pessoa física ou jurídica cadastrada para promover ofertas CPA.</li>
          <li><strong>Manager:</strong> Administrador responsável pela gestão dos afiliados e operações.</li>
          <li><strong>CPA (Custo por Aquisição):</strong> Modelo de remuneração baseado em ações específicas.</li>
          <li><strong>FTD (First Time Deposit):</strong> Primeiro depósito realizado por um usuário referido.</li>
        </ul>
        
        <h3>3. Cadastro e Conta</h3>
        <p>Para utilizar a plataforma, é necessário criar uma conta fornecendo informações verdadeiras e atualizadas. O usuário é responsável por manter a confidencialidade de suas credenciais de acesso.</p>
        
        <h3>4. Comissões e Pagamentos</h3>
        <p>As comissões são calculadas com base no modelo CPA acordado entre as partes. Os pagamentos são processados de acordo com o calendário estabelecido, após atingir o valor mínimo de saque.</p>
        <ul>
          <li>Valor mínimo para saque: R$ 100,00</li>
          <li>Processamento de saques: até 5 dias úteis</li>
          <li>Métodos disponíveis: PIX e transferência bancária</li>
          <li>Comissões são calculadas diariamente e consolidadas mensalmente</li>
        </ul>
        
        <h3>5. Obrigações do Afiliado</h3>
        <p>O afiliado compromete-se a utilizar apenas métodos legais e éticos para promoção. É estritamente proibido:</p>
        <ul>
          <li>Utilizar tráfego fraudulento ou bots</li>
          <li>Fazer promessas falsas ou enganosas</li>
          <li>Violar direitos de propriedade intelectual</li>
          <li>Utilizar spam ou comunicações não solicitadas</li>
        </ul>
        
        <h3>6. Privacidade e Dados</h3>
        <p>Tratamos seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD). Consulte nossa Política de Privacidade para mais informações sobre como coletamos, usamos e protegemos seus dados.</p>
        
        <h3>7. Rescisão</h3>
        <p>Ambas as partes podem rescindir o acordo a qualquer momento, mediante comunicação prévia. Em caso de violação dos termos, a plataforma reserva-se o direito de suspender ou encerrar a conta imediatamente.</p>
        
        <h3>8. Contato</h3>
        <p>Para dúvidas ou esclarecimentos sobre estes termos, entre em contato através do botão de Suporte disponível na plataforma.</p>
      </div>
    `;
  },

  // ===== ADMINISTRADOR =====
  administrador() {
    const roleLabels = { admin: 'Administrador', manager: 'Manager', affiliate: 'Afiliado' };
    const roleBadgeClass = { admin: 'admin-role', manager: 'manager-role', affiliate: '' };
    const statusLabels = { active: 'Ativo', blocked: 'Bloqueado', pending: 'Pendente' };

    return `
      <div class="page-header">
        <h1>Painel <span>Administrador</span></h1>
        <div style="display:flex;gap:12px">
          <button class="btn-secondary" onclick="exportUsers()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Exportar
          </button>
          <button class="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            Novo Usuário
          </button>
        </div>
      </div>

      <div class="stats-grid" id="admin-stats-grid">
        <div class="stat-card skeleton" style="animation-delay:0.05s"><div class="skeleton-text skeleton-text-lg"></div><div class="skeleton-text"></div></div>
        <div class="stat-card skeleton" style="animation-delay:0.1s"><div class="skeleton-text skeleton-text-lg"></div><div class="skeleton-text"></div></div>
        <div class="stat-card skeleton" style="animation-delay:0.15s"><div class="skeleton-text skeleton-text-lg"></div><div class="skeleton-text"></div></div>
        <div class="stat-card skeleton" style="animation-delay:0.2s"><div class="skeleton-text skeleton-text-lg"></div><div class="skeleton-text"></div></div>
      </div>

      <div class="admin-table-container">
        <div class="data-table-header">
          <h3>Todos os Usuários Cadastrados</h3>
          <div style="display:flex;gap:12px;align-items:center">
            <div class="filter-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Buscar usuário..." oninput="filterPageTable(this.value)" id="page-table-search">
            </div>
            <select class="filter-region" onchange="filterAdminByRole(this.value)" style="cursor:pointer;background:var(--bg-input);color:var(--text-secondary);border:1px solid var(--border-color);border-radius:var(--border-radius-sm);padding:8px 16px;font-family:var(--font-family);font-size:var(--font-size-sm)">
              <option value="">Todos os Papéis</option>
              <option value="admin">Administrador</option>
              <option value="manager">Manager</option>
              <option value="affiliate">Afiliado</option>
            </select>
            <select class="filter-region" onchange="filterAdminByStatus(this.value)" style="cursor:pointer;background:var(--bg-input);color:var(--text-secondary);border:1px solid var(--border-color);border-radius:var(--border-radius-sm);padding:8px 16px;font-family:var(--font-family);font-size:var(--font-size-sm)">
              <option value="">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="pending">Pendente</option>
              <option value="blocked">Bloqueado</option>
            </select>
          </div>
        </div>
        <div class="table-responsive">
          <table class="affiliate-table" id="page-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Papel</th>
                <th>Status</th>
                <th>IP</th>
                <th>Último Login</th>
                <th>Data Cadastro</th>
                <th>Logins</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <!-- Data loaded from Supabase -->
            </tbody>
          </table>
        </div>
      </div>

      <div class="data-table-container" style="margin-top:24px;animation-delay:0.3s">
        <div class="data-table-header">
          <h3>Atividade Recente</h3>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Usuário</th>
                <th>Ação</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="color:var(--text-muted)">15:30</td>
                <td><strong>kayki andrade</strong></td>
                <td>Login no painel administrativo</td>
                <td style="font-family:monospace;font-size:var(--font-size-sm);color:var(--text-muted)">189.44.120.55</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">14:12</td>
                <td><strong>Lucas Mendes</strong></td>
                <td>Gerou 5 novos FTDs</td>
                <td style="font-family:monospace;font-size:var(--font-size-sm);color:var(--text-muted)">201.12.85.190</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">10:45</td>
                <td><strong>Ana Costa</strong></td>
                <td>Solicitou saque de R$ 1.800</td>
                <td style="font-family:monospace;font-size:var(--font-size-sm);color:var(--text-muted)">177.38.42.100</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">09:00</td>
                <td><strong>João Santos</strong></td>
                <td>Atualizou informações do perfil</td>
                <td style="font-family:monospace;font-size:var(--font-size-sm);color:var(--text-muted)">102.89.45.210</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">08:15</td>
                <td style="color:var(--status-warning)"><strong>Fernanda Lima</strong></td>
                <td><span class="status-badge pending">Novo cadastro — aguardando aprovação</span></td>
                <td style="font-family:monospace;font-size:var(--font-size-sm);color:var(--text-muted)">201.45.88.32</td>
              </tr>
              <tr>
                <td style="color:var(--text-muted)">Ontem 18:20</td>
                <td><strong>Rafael Souza</strong></td>
                <td>Aprovou saque #SAQ-004 de João Santos</td>
                <td style="font-family:monospace;font-size:var(--font-size-sm);color:var(--text-muted)">177.92.14.220</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // Function to initialize the administrator page with data from Supabase
  async initAdministrador() {
    const roleLabels = { admin: 'Administrador', manager: 'Manager', affiliate: 'Afiliado' };
    const statusLabels = { active: 'Ativo', blocked: 'Bloqueado', pending: 'Pendente' };

    // Fetch users from Supabase
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      // Display an error message to the user
      const tableBody = document.querySelector('#page-table tbody');
      if (tableBody) {
        tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:var(--status-negative)">Erro ao carregar usuários: ${error.message}</td></tr>`;
      }
      return;
    }

    // Calculate stats
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const pendingUsers = users.filter(u => u.status === 'pending').length;
    const blockedUsers = users.filter(u => u.status === 'blocked').length;

    // Render stats
    const statsGrid = document.getElementById('admin-stats-grid');
    if (statsGrid) {
      statsGrid.innerHTML = `
        <div class="stat-card" style="animation-delay:0.05s">
          <div class="stat-card-label">Total de Usuários</div>
          <div class="stat-card-value">${totalUsers}</div>
          <div class="stat-card-change value-positive">+3 este mês</div>
        </div>
        <div class="stat-card" style="animation-delay:0.1s">
          <div class="stat-card-label">Usuários Ativos</div>
          <div class="stat-card-value" style="color:var(--accent-green)">${activeUsers}</div>
          <div class="stat-card-change" style="color:var(--text-muted)">${Math.round(activeUsers / totalUsers * 100)}% do total</div>
        </div>
        <div class="stat-card" style="animation-delay:0.15s">
          <div class="stat-card-label">Aguardando Aprovação</div>
          <div class="stat-card-value" style="color:var(--status-warning)">${pendingUsers}</div>
          <div class="stat-card-change" style="color:var(--status-warning)">Requer atenção</div>
        </div>
        <div class="stat-card" style="animation-delay:0.2s">
          <div class="stat-card-label">Bloqueados</div>
          <div class="stat-card-value" style="color:var(--status-negative)">${blockedUsers}</div>
        </div>
      `;
    }

    // Render table rows
    const rows = users.map(u => `
      <tr>
        <td style="font-weight:600;color:var(--text-muted)">${u.id.substring(0, 8)}</td>
        <td>
          <div class="affiliate-info">
            <div class="affiliate-avatar" style="background:${u.color || '#ccc'}20;color:${u.color || '#ccc'}">${u.initials || u.name.substring(0, 2).toUpperCase()}</div>
            <div>
              <div class="affiliate-name">${u.name}</div>
              <div class="affiliate-email">${u.email}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="status-badge ${u.role === 'admin' ? 'admin-badge' : u.role === 'manager' ? 'pending' : 'active'}">${roleLabels[u.role]}</span>
        </td>
        <td>
          <span class="status-badge ${u.status === 'active' ? 'active' : u.status === 'blocked' ? 'inactive' : 'pending'}">${statusLabels[u.status]}</span>
        </td>
        <td style="font-family:monospace;font-size:var(--font-size-sm);color:var(--text-muted)">${u.ip || 'N/A'}</td>
        <td style="color:var(--text-secondary)">${u.lastLogin || '—'}</td>
        <td style="color:var(--text-muted)">${new Date(u.registered_at).toLocaleDateString('pt-BR') || 'N/A'}</td>
        <td style="font-weight:600;text-align:center">${u.logins || 0}</td>
        <td>
          <div class="table-actions">
            ${u.status === 'pending' ? `
              <button class="btn-action approve" onclick="adminAction('approve','${u.id}')">Aprovar</button>
              <button class="btn-action reject" onclick="adminAction('reject','${u.id}')">Recusar</button>
            ` : u.status === 'active' && u.role !== 'admin' ? `
              <button class="btn-action view" onclick="adminAction('view','${u.id}')">Detalhes</button>
              <button class="btn-action reject" onclick="adminAction('block','${u.id}')">Bloquear</button>
            ` : u.status === 'blocked' ? `
              <button class="btn-action approve" onclick="adminAction('unblock','${u.id}')">Desbloquear</button>
            ` : `
              <span style="color:var(--text-muted);font-size:var(--font-size-xs)">—</span>
            `}
          </div>
        </td>
      </tr>
    `).join('');

    const tableBody = document.querySelector('#page-table tbody');
    if (tableBody) {
      tableBody.innerHTML = rows;
    }
  }
};

// Admin helper functions
async function adminAction(action, userId) {
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed;bottom:24px;right:24px;padding:12px 24px;border-radius:8px;font-weight:600;z-index:9999;animation:fadeInUp 0.3s ease;font-family:var(--font-family)`;

  try {
    let updated = false;
    let newStatus = '';

    if (action === 'approve') { newStatus = 'active'; updated = true; }
    else if (action === 'reject') { newStatus = 'blocked'; updated = true; }
    else if (action === 'block') { newStatus = 'blocked'; updated = true; }
    else if (action === 'unblock') { newStatus = 'active'; updated = true; }

    if (updated) {
      const { error } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) throw error;

      // Re-trigger load to refresh UI
      if (typeof Pages.initAdministrador === 'function') {
        Pages.initAdministrador();
      }
    }

    const messages = {
      approve: `Usuário ${userId.substring(0, 8)} aprovado com sucesso!`,
      reject: `Cadastro ${userId.substring(0, 8)} recusado.`,
      block: `Usuário ${userId.substring(0, 8)} bloqueado.`,
      unblock: `Usuário ${userId.substring(0, 8)} desbloqueado com sucesso!`,
      view: `Detalhes do usuário ${userId.substring(0, 8)}`
    };

    toast.textContent = messages[action] || 'Ação realizada';
    const isPositive = action === 'approve' || action === 'unblock';
    toast.style.background = isPositive ? 'var(--accent-green)' : action === 'view' ? 'var(--kpi-blue)' : 'var(--status-negative)';
    toast.style.color = isPositive ? 'var(--bg-primary)' : '#fff';

  } catch (error) {
    console.error('Erro na ação:', error);
    toast.textContent = 'Erro ao processar ação: ' + error.message;
    toast.style.background = 'var(--status-negative)';
    toast.style.color = '#fff';
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function filterAdminByRole(role) {
  const table = document.getElementById('page-table');
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    if (!role) { row.style.display = ''; return; }
    const roleCell = row.cells[2]?.textContent.toLowerCase() || '';
    const roleMap = { admin: 'administrador', manager: 'manager', affiliate: 'afiliado' };
    row.style.display = roleCell.includes(roleMap[role]) ? '' : 'none';
  });
}

function filterAdminByStatus(status) {
  const table = document.getElementById('page-table');
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    if (!status) { row.style.display = ''; return; }
    const statusCell = row.cells[3]?.textContent.toLowerCase() || '';
    const statusMap = { active: 'ativo', pending: 'pendente', blocked: 'bloqueado' };
    row.style.display = statusCell.includes(statusMap[status]) ? '' : 'none';
  });
}

function exportUsers() {
  const toast = document.createElement('div');
  toast.textContent = 'Relatório de usuários exportado com sucesso!';
  toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--accent-green);color:var(--bg-primary);padding:12px 24px;border-radius:8px;font-weight:600;z-index:9999;animation:fadeInUp 0.3s ease;font-family:var(--font-family)';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Helper functions for secondary pages
function filterPageTable(query) {
  const table = document.getElementById('page-table');
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  const q = query.toLowerCase();
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show a brief toast
    const toast = document.createElement('div');
    toast.textContent = 'Link copiado!';
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--accent-green);color:var(--bg-primary);padding:12px 24px;border-radius:8px;font-weight:600;z-index:9999;animation:fadeInUp 0.3s ease';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  });
}
