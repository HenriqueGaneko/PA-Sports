// ─── RENDERIZA PARCEIROS ───
(function () {
  const page = document.getElementById('page-parceiros');

  page.innerHTML = `
    <section style="background:var(--preto-card);border-bottom:1px solid var(--cinza);padding:4rem 2rem 3rem">
      <div class="container">
        <span class="section-tag">Ecossistema</span>
        <h1 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,7vw,6rem);letter-spacing:3px;margin-top:0.5rem">
          NOSSOS <span style="color:var(--verde)">PARCEIROS</span>
        </h1>
        <p style="color:var(--branco-muted);font-size:1.05rem;max-width:600px;line-height:1.7;margin-top:1rem">
          Trabalhamos com os maiores clubes, federações e marcas esportivas do Brasil para garantir as melhores oportunidades para nossos atletas.
        </p>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Clubes e Institutos</span>
          <h2 class="section-title">Quem <span>Confia</span> em Nós</h2>
        </div>
        <div class="parceiros-grid" id="parceiros-grid"></div>
      </div>
    </section>

    <section style="background:var(--preto-card);border-top:1px solid var(--cinza)">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Parcerias</span>
          <h2 class="section-title">Seja um <span>Parceiro</span></h2>
        </div>
        <div style="max-width:600px;margin:0 auto;text-align:center">
          <p style="color:var(--branco-muted);font-size:1rem;line-height:1.8;margin-bottom:2rem">
            Seu clube ou empresa quer fazer parte da maior plataforma de peneiras do Brasil? Entre em contato com nossa equipe comercial e saiba como integrar o ScoutBR ao seu programa de revelação de talentos.
          </p>
          <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
            <a href="mailto:parceiros@scoutbr.com.br" class="btn btn-primary">Entrar em Contato</a>
            <a href="#" class="btn btn-outline" data-page="sobre">Sobre a Plataforma</a>
          </div>
        </div>
      </div>
    </section>
  `;

  const grid = document.getElementById('parceiros-grid');
  grid.innerHTML = PARCEIROS.map(p => `
    <div class="parceiro-card">
      <div class="parceiro-logo">${p.icon}</div>
      <h3>${p.nome}</h3>
      <p>${p.desc}</p>
      <span class="parceiro-tipo">${p.tipo}</span>
    </div>
  `).join('');

  page.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigate(el.dataset.page);
    });
  });
})();
