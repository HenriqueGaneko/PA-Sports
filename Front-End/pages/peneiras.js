// ─── PÁGINA DE PENEIRAS ──────────────────────────────────────
// Busca as peneiras direto da API ao invés de usar dados fixos

const SPORT_OPTS = [
  { id: 'todos',     label: 'Todos' },
  { id: 'futebol',   label: '⚽ Futebol' },
  { id: 'basquete',  label: '🏀 Basquete' },
  { id: 'volei',     label: '🏐 Vôlei' },
  { id: 'natacao',   label: '🏊 Natação' },
  { id: 'tenis',     label: '🎾 Tênis' },
  { id: 'atletismo', label: '🏃 Atletismo' },
];

let filterAtivo = 'todos';
let peneirasDB  = [];   // vai guardar o que veio da API

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
        <div class="peneiras-grid" id="peneiras-grid">
          <p style="color:var(--branco-muted);text-align:center;grid-column:1/-1;padding:3rem">Carregando peneiras...</p>
        </div>
      </div>
    </section>
  `;

  page.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });
})();

// Atualiza o filtro ativo e re-renderiza
function setFilter(sport) {
  filterAtivo = sport;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === sport);
  });
  renderPeneiras();
}

// ─── BUSCA PENEIRAS DA API ────────────────────────────────────
async function carregarPeneiras() {
  try {
    const res = await fetch('/peneiras');
    if (res.ok) {
      const json = await res.json();
      // API retorna { message: "Success", data: [...] }
      const data = json.data || json;
      peneirasDB = Array.isArray(data) ? data.map(p => ({
        id:        p.id_peneira || p.id,
        sport:     (p.nome_esporte || p.esporte || 'futebol').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        icon:      iconePorEsporte(p.nome_esporte || p.esporte || ''),
        titulo:    p.titulo,
        local:     p.localizacao || p.local || '—',
        data:      p.data_peneira ? formatarData(p.data_peneira) : '—',
        hora:      p.hora || '—',
        idade:     p.faixa_etaria || p.idade || '—',
        vagas:     p.vagas || 0,
        inscritos: p.inscritos || 0,
        status:    p.status || 'aberta',
        valor:     p.valor || 'Gratuito',
        instituicao: p.nome_instituicao || '—',
        descricao: p.descricao || ''
      })) : [];
    } else {
      peneirasDB = PENEIRAS;
    }
  } catch (e) {
    console.warn('API offline, usando dados locais.', e);
    peneirasDB = PENEIRAS;
  }
  renderPeneiras();
}

// Formata data removendo o T00:00:00.000Z
function formatarData(dataStr) {
  if (!dataStr) return '—';
  const s = dataStr.split('T')[0];        // "2026-06-10"
  const [ano, mes, dia] = s.split('-');
  return `${dia}/${mes}/${ano}`;           // "10/06/2026"
}

// Retorna o emoji certo para cada esporte
function iconePorEsporte(nome) {
  const mapa = {
    futebol: '⚽', basquete: '🏀', volei: '🏐', volei: '🏐',
    natacao: '🏊', tenis: '🎾', atletismo: '🏃'
  };
  const normalizado = (nome || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return mapa[normalizado] || '🏅';
}

// ─── RENDERIZA OS CARDS ───────────────────────────────────────
function renderPeneiras() {
  const grid = document.getElementById('peneiras-grid');
  if (!grid) return;

  const lista = filterAtivo === 'todos'
    ? peneirasDB
    : peneirasDB.filter(p => p.sport === filterAtivo);

  if (lista.length === 0) {
    grid.innerHTML = `<p style="color:var(--branco-muted);text-align:center;grid-column:1/-1;padding:3rem">
      Nenhuma peneira encontrada para este filtro.
    </p>`;
    return;
  }

  const STATUS_LABEL = { aberta: 'Aberta', encerrada: 'Encerrada', breve: 'Em breve' };

  grid.innerHTML = lista.map(p => `
    <div class="peneira-card">
      <div class="peneira-header">
        <span class="peneira-sport">
          <span class="ico">${p.icon}</span>
          ${p.sport.charAt(0).toUpperCase() + p.sport.slice(1)}
        </span>
        <span class="status-badge status-${p.status}">${STATUS_LABEL[p.status] || p.status}</span>
      </div>
      <div class="peneira-body">
        <h3 class="peneira-title">${p.titulo}</h3>
        <div class="peneira-info">
          <div class="info-row"><span class="ico">🏢</span>${p.instituicao}</div>
          <div class="info-row"><span class="ico">📍</span>${p.local}</div>
          <div class="info-row"><span class="ico">📅</span>${p.data}</div>
          ${p.descricao ? `<div class="info-row"><span class="ico">📝</span>${p.descricao}</div>` : ''}
        </div>
      </div>
      <div class="peneira-footer">
        <span class="vagas"><strong>${p.vagas}</strong> vagas</span>
        ${p.status === 'aberta'
          ? `<button class="btn btn-primary" style="font-size:0.78rem;padding:0.5rem 1rem" onclick="inscrever(${p.id})">Inscrever-se</button>`
          : `<button class="btn btn-outline" style="font-size:0.78rem;padding:0.5rem 1rem" disabled>Encerrada</button>`
        }
      </div>
    </div>
  `).join('');
}