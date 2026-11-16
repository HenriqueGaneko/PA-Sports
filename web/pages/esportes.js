// ─── RENDERIZA ESPORTES ───

(function () {
  const page = document.getElementById('page-esportes');

  page.innerHTML = `
    <section style="background:var(--preto-card);border-bottom:1px solid var(--cinza);padding:4rem 2rem 3rem">
      <div class="container">
        <span class="section-tag">Modalidades</span>
        <h1 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,7vw,6rem);letter-spacing:3px;margin-top:0.5rem">
          TODOS OS <span style="color:var(--verde)">ESPORTES</span>
        </h1>
        <p style="color:var(--branco-muted);font-size:1.05rem;max-width:550px;line-height:1.7;margin-top:1rem">
          Explore as modalidades disponíveis e encontre a peneira ideal para seu perfil atlético.
        </p>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="sports-grid" id="esportes-grid"></div>
      </div>
    </section>
  `;

  const grid = document.getElementById('esportes-grid');
  grid.innerHTML = SPORTS.map(s => `
    <a class="sport-card" href="#" data-page="sport" data-sport="${s.id}">
      <span class="sport-icon">${s.icon}</span>
      <h3>${s.nome}</h3>
      <p>${s.desc}</p>
      <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:1rem">
        ${s.categorias.map(c => `<span style="font-size:0.65rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:2px;border:1px solid var(--cinza-light);color:var(--branco-muted)">${c}</span>`).join('')}
      </div>
      <span class="tag">Explorar →</span>
    </a>
  `).join('');

  grid.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigate(el.dataset.page, el.dataset.sport);
    });
  });
})();
