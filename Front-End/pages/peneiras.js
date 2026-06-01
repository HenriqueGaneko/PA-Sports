// ─── PÁGINA DE PENEIRAS ───
// Responsabilidade única: estrutura visual + filtros + renderização dos cards

const SPORT_OPTS = [
  { id: 'todos',    label: 'Todos' },
  { id: 'futebol',  label: '⚽ Futebol' },
  { id: 'basquete', label: '🏀 Basquete' },
  { id: 'volei',    label: '🏐 Vôlei' },
  { id: 'natacao',  label: '🏊 Natação' },
  { id: 'tenis',    label: '🎾 Tênis' },
  { id: 'atletismo',label: '🏃 Atletismo' },
];

let filterAtivo = 'todos';

// Monta o HTML estático da página (roda uma vez)
(function montarPagina() {
  const page = document.getElementById('page-peneiras');

  page.innerHTML = `
    <section style="background:var(--preto-card);border-bottom:1px solid var(--cinza);padding:4rem 2rem 3rem">
      <div class="container">
        <span class="section-tag">Seletivas</span>
        <h1 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,7vw,6rem);letter-spacing:3px;margin-top:0.5rem">
          PENEIRAS <span style="color:var(--verde)">ABERTAS</span>
        </h1>
        <p style="color:var(--branco-muted);font-size:1.05rem;max-width:550px;line-height:1.7;margin-top:1rem">
          Encontre peneiras em todo o Brasil. Filtre por modalidade e inscreva-se diretamente pela plataforma.
        </p>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="filters">
          ${SPORT_OPTS.map(o => `
            <button class="filter-btn ${o.id === 'todos' ? 'active' : ''}" data-filter="${o.id}">${o.label}</button>
          `).join('')}
        </div>
        <div class="peneiras-grid" id="peneiras-grid"></div>
      </div>
    </section>
  `;

  page.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });
})();

// Atualiza o filtro ativo e re-renderiza os cards
function setFilter(sport) {
  filterAtivo = sport;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === sport);
  });
  renderPeneiras();
}

// Preenche o grid com os cards filtrados (chamado pelo nav ao entrar na página)
function renderPeneiras() {
  const grid = document.getElementById('peneiras-grid');
  if (!grid) return;

  const filtradas = filterAtivo === 'todos'
    ? PENEIRAS
    : PENEIRAS.filter(p => p.sport === filterAtivo);

  if (filtradas.length === 0) {
    grid.innerHTML = `<p style="color:var(--branco-muted);text-align:center;grid-column:1/-1;padding:3rem">
      Nenhuma peneira encontrada para este filtro.
    </p>`;
    return;
  }

  const STATUS_LABEL = { aberta: 'Aberta', encerrada: 'Encerrada', breve: 'Em breve' };

  grid.innerHTML = filtradas.map(p => `
    <div class="peneira-card">
      <div class="peneira-header">
        <span class="peneira-sport">
          <span class="ico">${p.icon}</span>
          ${p.sport.charAt(0).toUpperCase() + p.sport.slice(1)}
        </span>
        <span class="status-badge status-${p.status}">${STATUS_LABEL[p.status]}</span>
      </div>
      <div class="peneira-body">
        <h3 class="peneira-title">${p.titulo}</h3>
        <div class="peneira-info">
          <div class="info-row"><span class="ico">📍</span>${p.local}</div>
          <div class="info-row"><span class="ico">📅</span>${p.data} — ${p.hora}</div>
          <div class="info-row"><span class="ico">👤</span>Idade: ${p.idade}</div>
          <div class="info-row"><span class="ico">💰</span>${p.valor}</div>
        </div>
      </div>
      <div class="peneira-footer">
        <span class="vagas"><strong>${p.vagas}</strong> vagas · ${p.inscritos} inscritos</span>
        ${p.status === 'aberta'
          ? `<button class="btn btn-primary" style="font-size:0.78rem;padding:0.5rem 1rem" onclick="inscrever(${p.id})">Inscrever-se</button>`
          : `<button class="btn btn-outline" style="font-size:0.78rem;padding:0.5rem 1rem" disabled>Encerrada</button>`
        }
      </div>
    </div>
  `).join('');
}
