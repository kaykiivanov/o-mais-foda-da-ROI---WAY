// ===== APP.JS - Main Application Logic =====

// ===== MOCK DATA =====
const affiliatesData = [
    { name: 'Lucas Mendes', email: 'lucas@email.com', initials: 'LM', color: '#4A90D9', revenue: 8420, clicks: 3420, ftds: 62, conversion: 1.81, growth: 24, region: 'Brasil' },
    { name: 'Ana Costa', email: 'ana@email.com', initials: 'AC', color: '#E84393', revenue: 6150, clicks: 2890, ftds: 45, conversion: 1.56, growth: 18, region: 'Brasil' },
    { name: 'Pedro Oliveira', email: 'pedro@email.com', initials: 'PO', color: '#00E86C', revenue: 4830, clicks: 2100, ftds: 33, conversion: 1.57, growth: 12, region: 'Portugal' },
    { name: 'Maria Silva', email: 'maria@email.com', initials: 'MS', color: '#F5A623', revenue: 2100, clicks: 980, ftds: 15, conversion: 1.53, growth: -5, region: 'Brasil' },
    { name: 'João Santos', email: 'joao@email.com', initials: 'JS', color: '#9B59B6', revenue: 3500, clicks: 1750, ftds: 27, conversion: 1.54, growth: 8, region: 'Angola' },
];

// ===== DOM ELEMENTS =====
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navItems = document.querySelectorAll('.nav-item');
const pageContent = document.getElementById('page-content');
const affiliateSearch = document.getElementById('affiliate-search');
const regionFilter = document.getElementById('region-filter');
const affiliateTableBody = document.getElementById('affiliate-tbody');

// ===== SIDEBAR TOGGLE =====
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// ===== NAVIGATION =====
let currentPage = 'dashboard';

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        if (page === currentPage) return;

        // Update active state
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        currentPage = page;

        // Render page
        renderPage(page);
    });
});

function renderPage(page) {
    if (page === 'dashboard') {
        renderDashboard();
    } else if (page === 'afiliados') {
        pageContent.innerHTML = Pages.meusAfiliados();
    } else if (page === 'solicitacoes') {
        pageContent.innerHTML = Pages.solicitacoes();
    } else if (page === 'links') {
        pageContent.innerHTML = Pages.linksUsuarios();
    } else if (page === 'saques') {
        pageContent.innerHTML = Pages.gestaoSaques();
    } else if (page === 'financeiro') {
        pageContent.innerHTML = Pages.meuFinanceiro();
    } else if (page === 'termos') {
        pageContent.innerHTML = Pages.termosUso();
    } else if (page === 'admin') {
        pageContent.innerHTML = Pages.administrador();
    }
}

function renderDashboard() {
    pageContent.innerHTML = getDashboardHTML();
    // Re-bind dashboard specific events
    bindDashboardEvents();
    // Render table
    renderAffiliateTable(affiliatesData);
}

function getDashboardHTML() {
    return `
    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-icon yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="kpi-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
          </div>
        </div>
        <div class="kpi-label">Faturamento Bruto</div>
        <div class="kpi-value">R$ 25 mil</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="kpi-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
          </div>
        </div>
        <div class="kpi-label">Sua Comissão</div>
        <div class="kpi-value">R$ 760</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div class="kpi-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
          </div>
        </div>
        <div class="kpi-label">Faturamento Líquido</div>
        <div class="kpi-value">R$ 1,1 mil</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-icon pink">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="kpi-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
          </div>
        </div>
        <div class="kpi-label">Total FTDs</div>
        <div class="kpi-value">182</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-icon orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
          <div class="kpi-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
          </div>
        </div>
        <div class="kpi-label">Saques Pendentes</div>
        <div class="kpi-value">8</div>
      </div>
    </div>

    <!-- Performance Section -->
    <div class="performance-section">
      <div class="performance-header">
        <div class="performance-title">
          <div class="performance-title-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
          <div>
            <h2>Performance de <span>Afiliados</span></h2>
            <p>Análise detalhada de métricas, conversão e crescimento da rede.</p>
          </div>
        </div>
        <button class="btn-lifetime">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Dados Vitalícios (Lifetime)
        </button>
      </div>
      <div class="filters-bar">
        <div class="filter-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="affiliate-search" placeholder="Buscar afiliado por nome ou email...">
        </div>
        <div class="filter-region">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          <select id="region-filter">
            <option value="">Todas Regiões</option>
            <option value="Brasil">Brasil</option>
            <option value="Portugal">Portugal</option>
            <option value="Angola">Angola</option>
          </select>
        </div>
      </div>
      <div class="table-container">
        <table class="affiliates-table">
          <thead>
            <tr>
              <th class="sortable" data-sort="name">Afiliado</th>
              <th class="sortable sorted" data-sort="revenue">Faturamento <span class="sort-icon">↓</span></th>
              <th class="sortable" data-sort="clicks">Clicks</th>
              <th class="sortable" data-sort="ftds">Vendas (FTDs)</th>
              <th class="sortable" data-sort="conversion">Conv. %</th>
              <th class="sortable" data-sort="growth">Crescimento</th>
            </tr>
          </thead>
          <tbody id="affiliate-tbody"></tbody>
        </table>
      </div>
    </div>
  `;
}

// ===== RENDER AFFILIATE TABLE =====
function renderAffiliateTable(data) {
    const tbody = document.getElementById('affiliate-tbody');
    if (!tbody) return;

    tbody.innerHTML = data.map(a => {
        const growthClass = a.growth >= 0 ? 'positive' : 'negative';
        const growthSign = a.growth >= 0 ? '+' : '';
        const growthWidth = Math.min(Math.abs(a.growth) * 3, 100);

        return `
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
        <td style="font-weight:700">R$ ${a.revenue.toLocaleString('pt-BR')}</td>
        <td>${a.clicks.toLocaleString('pt-BR')}</td>
        <td style="font-weight:700">${a.ftds}</td>
        <td>${a.conversion.toFixed(2)}%</td>
        <td>
          <div class="growth-bar">
            <div class="growth-bar-track">
              <div class="growth-bar-fill ${growthClass}" style="width:${growthWidth}%"></div>
            </div>
            <span class="growth-value ${growthClass === 'positive' ? 'value-positive' : 'value-negative'}">${growthSign}${a.growth}%</span>
          </div>
        </td>
      </tr>
    `;
    }).join('');
}

// ===== DASHBOARD EVENT BINDINGS =====
function bindDashboardEvents() {
    const searchInput = document.getElementById('affiliate-search');
    const regionSelect = document.getElementById('region-filter');

    if (searchInput) {
        searchInput.addEventListener('input', () => filterAffiliates());
    }
    if (regionSelect) {
        regionSelect.addEventListener('change', () => filterAffiliates());
    }

    // Sortable headers
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const sortKey = th.dataset.sort;
            sortAffiliates(sortKey, th);
        });
    });
}

// ===== FILTER AFFILIATES =====
function filterAffiliates() {
    const search = (document.getElementById('affiliate-search')?.value || '').toLowerCase();
    const region = document.getElementById('region-filter')?.value || '';

    let filtered = affiliatesData.filter(a => {
        const matchSearch = !search || a.name.toLowerCase().includes(search) || a.email.toLowerCase().includes(search);
        const matchRegion = !region || a.region === region;
        return matchSearch && matchRegion;
    });

    renderAffiliateTable(filtered);
}

// ===== SORT AFFILIATES =====
let currentSort = { key: 'revenue', dir: 'desc' };

function sortAffiliates(key, thElement) {
    // Toggle direction
    if (currentSort.key === key) {
        currentSort.dir = currentSort.dir === 'desc' ? 'asc' : 'desc';
    } else {
        currentSort.key = key;
        currentSort.dir = 'desc';
    }

    // Update header styles
    document.querySelectorAll('.sortable').forEach(th => {
        th.classList.remove('sorted');
        const icon = th.querySelector('.sort-icon');
        if (icon) icon.textContent = '↓';
    });
    thElement.classList.add('sorted');
    const icon = thElement.querySelector('.sort-icon');
    if (icon) icon.textContent = currentSort.dir === 'desc' ? '↓' : '↑';

    // Sort data
    const sorted = [...affiliatesData].sort((a, b) => {
        let valA = a[key];
        let valB = b[key];
        if (typeof valA === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }
        if (currentSort.dir === 'asc') return valA > valB ? 1 : -1;
        return valA < valB ? 1 : -1;
    });

    renderAffiliateTable(sorted);
}

// ===== NOTIFICATION DROPDOWN =====
const notificationBtn = document.getElementById('notification-btn');
const notificationDropdown = document.getElementById('notification-dropdown');

if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        notificationDropdown.classList.remove('show');
    });
}

// ===== TOP BAR SEARCH =====
const topSearch = document.getElementById('top-search');
if (topSearch) {
    topSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (currentPage === 'dashboard' && query) {
            const searchInput = document.getElementById('affiliate-search');
            if (searchInput) {
                searchInput.value = query;
                filterAffiliates();
            }
        }
    });
}

// ===== LOGOUT =====
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('affiliatehub_logged_in');
        localStorage.removeItem('affiliatehub_user');
        window.location.href = 'login.html';
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
});
