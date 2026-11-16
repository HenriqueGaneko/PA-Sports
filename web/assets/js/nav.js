// ─── ESTADO GLOBAL ───────────────────────────────────────────
const state = {
  currentPage: 'home',
  currentSport: null,
  user: null,
  authMode: 'login',
  inscricoes: []
};

// ─── NAVEGAÇÃO ───────────────────────────────────────────────
function navigate(page, extra) {
  state.currentPage = page;
  if (extra) state.currentSport = extra;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  if (page === 'sport')    renderSportPage(state.currentSport);
  if (page === 'peneiras') carregarPeneiras();   // busca da API
  if (page === 'perfil')   renderPerfil();

  // fechar menu mobile
  document.querySelector('.nav-links').classList.remove('open');
}

// ─── HAMBURGER ───────────────────────────────────────────────
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ─── NAV LINKS ───────────────────────────────────────────────
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const page  = el.dataset.page;
    const sport = el.dataset.sport || null;
    navigate(page, sport);
  });
});