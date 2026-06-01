// ─── RENDERIZA HOME ───
(function () {
  const page = document.getElementById('page-home');

  page.innerHTML = `
    <!-- HERO -->
    <div class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-badge">🇧🇷 A plataforma #1 do Brasil</div>
        <h1>SEU TALENTO<em>MERECE UMA CHANCE</em></h1>
        <p>O maior portal de peneiras esportivas do país. Conectamos atletas promissores aos melhores clubes e equipes do Brasil.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#" data-page="peneiras">Ver Peneiras Abertas</a>
          <a class="btn btn-outline" href="#" data-page="login">Criar Conta</a>
        </div>
        <div class="hero-stats">
          <div class="stat-item"><div class="stat-num">2.400+</div><div class="stat-label">Atletas cadastrados</div></div>
          <div class="stat-item"><div class="stat-num">84</div><div class="stat-label">Peneiras realizadas</div></div>
          <div class="stat-item"><div class="stat-num">36</div><div class="stat-label">Clubes parceiros</div></div>
          <div class="stat-item"><div class="stat-num">6</div><div class="stat-label">Modalidades</div></div>
        </div>
      </div>
    </div>

    <!-- ESPORTES -->
    <section style="background:var(--preto-card);border-top:1px solid var(--cinza);border-bottom:1px solid var(--cinza)">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Modalidades</span>
          <h2 class="section-title">Escolha seu <span>Esporte</span></h2>
        </div>
        <div class="sports-grid" id="home-sports"></div>
      </div>
    </section>

    <!-- PENEIRAS DESTAQUE -->
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Em Destaque</span>
          <h2 class="section-title">Peneiras <span>Abertas</span></h2>
        </div>
        <div class="peneiras-grid" id="home-peneiras"></div>
        <div style="text-align:center;margin-top:2.5rem">
          <a class="btn btn-outline" href="#" data-page="peneiras">Ver todas as peneiras →</a>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section style="background:var(--preto-card);border-top:1px solid var(--cinza)">
      <div class="container" style="text-align:center;padding:3rem 2rem">
        <span class="section-tag">Comece agora</span>
        <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4rem);letter-spacing:2px;margin:0.5rem 0">
          Pronto para dar o próximo passo?
        </h2>
        <p style="color:var(--branco-muted);font-size:1.05rem;max-width:500px;margin:1rem auto 2rem;line-height:1.7">
          Crie seu perfil, cadastre seus dados esportivos e candidate-se às peneiras abertas em todo o Brasil.
        </p>
        <a class="btn btn-primary" href="#" data-page="login" style="font-size:1rem;padding:1rem 2.5rem">Criar Conta</a>
      </div>
    </section>
  `;

  // Renderiza cards de esporte
  const homeSports = document.getElementById('home-sports');
  homeSports.innerHTML = SPORTS.map(s => `
    <a class="sport-card" href="#" data-page="sport" data-sport="${s.id}">
      <span class="sport-icon">${s.icon}</span>
      <h3>${s.nome}</h3>
      <p>${s.desc}</p>
      <span class="tag">Ver peneiras →</span>
    </a>
  `).join('');

  // Renderiza peneiras em destaque (só abertas, max 3)
  const homePeneiras = document.getElementById('home-peneiras');
  const destaque = PENEIRAS.filter(p => p.status === 'aberta').slice(0, 3);
  homePeneiras.innerHTML = destaque.map(p => `
    <div class="peneira-card">
      <div class="peneira-header">
        <span class="peneira-sport"><span class="ico">${p.icon}</span>${p.sport.charAt(0).toUpperCase() + p.sport.slice(1)}</span>
        <span class="status-badge status-${p.status}">Aberta</span>
      </div>
      <div class="peneira-body">
        <h3 class="peneira-title">${p.titulo}</h3>
        <div class="peneira-info">
          <div class="info-row"><span class="ico">📍</span>${p.local}</div>
          <div class="info-row"><span class="ico">📅</span>${p.data} — ${p.hora}</div>
          <div class="info-row"><span class="ico">👤</span>${p.idade}</div>
        </div>
      </div>
      <div class="peneira-footer">
        <span class="vagas"><strong>${p.vagas}</strong> vagas</span>
        <button class="btn btn-primary" style="font-size:0.78rem;padding:0.5rem 1rem" onclick="inscrever(${p.id})">Inscrever-se</button>
      </div>
    </div>
  `).join('');

  // Reativa os links da home
  page.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigate(el.dataset.page, el.dataset.sport || null);
    });
  });
})();
