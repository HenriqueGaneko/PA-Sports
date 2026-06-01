// ─── RENDERIZA SOBRE NÓS ───
(function () {
  const page = document.getElementById('page-sobre');

  const TEAM = [
    { nome: 'Henrique Ganeko Ligeiro', cargo: 'CEO & Fundador e Dev Full-Stack', iniciais: 'HL' },
    { nome: 'Bruno Sergio Mendes de Oliveira', cargo: 'Designer UX & UI', iniciais: 'BO' },
  ];

  const MISSAO = [
    {
      num: '01',
      titulo: 'Missão',
      texto: 'Democratizar o acesso às melhores oportunidades esportivas do Brasil, conectando jovens talentos de todas as regiões do país com clubes e equipes de alto nível.'
    },
    {
      num: '02',
      titulo: 'Visão',
      texto: 'Ser a plataforma de referência no desenvolvimento e revelação de talentos esportivos no Brasil, tornando o processo de descoberta mais justo, transparente e acessível.'
    },
    {
      num: '03',
      titulo: 'Valores',
      texto: 'Transparência em cada etapa do processo. Inclusão de atletas de todas as regiões. Excelência nos serviços oferecidos. Compromisso com o desenvolvimento do esporte brasileiro.'
    }
  ];

  page.innerHTML = `
    <div class="sobre-hero">
      <div class="hero-badge">Desde 2025</div>
      <h1>SOBRE O <span>PA - </span>Sports</h1>
      <p>Nascemos com o propósito de transformar a forma como o Brasil descobre seus talentos esportivos. Uma plataforma feita por quem ama o esporte.</p>
    </div>

    <!-- MISSÃO VISÃO VALORES -->
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Propósito</span>
          <h2 class="section-title">O que nos <span>Move</span></h2>
        </div>
        <div class="missao-grid">
          ${MISSAO.map(m => `
            <div class="missao-item">
              <div class="num">${m.num}</div>
              <h3>${m.titulo}</h3>
              <p>${m.texto}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- NÚMEROS -->
    <section style="background:var(--preto-card);border-top:1px solid var(--cinza);border-bottom:1px solid var(--cinza)">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Impacto</span>
          <h2 class="section-title">Números que <span>Falam</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5px;background:var(--cinza)">
          ${[
            ['2.400+', 'Atletas cadastrados'],
            ['84', 'Peneiras realizadas'],
            ['36', 'Clubes parceiros'],
            ['6', 'Modalidades'],
            ['18', 'Estados atendidos'],
            ['320+', 'Atletas revelados']
          ].map(([n, l]) => `
            <div style="background:var(--preto-card);padding:2.5rem 2rem;text-align:center">
              <div style="font-family:'Bebas Neue',sans-serif;font-size:3.5rem;color:var(--verde);line-height:1">${n}</div>
              <div style="font-size:0.8rem;color:var(--branco-muted);letter-spacing:2px;text-transform:uppercase;margin-top:0.3rem">${l}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- TIME -->
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Equipe</span>
          <h2 class="section-title">Quem faz o <span>PA - Sports</span></h2>
        </div>
        <div class="team-grid">
          ${TEAM.map(m => `
            <div class="team-card">
              <div class="team-avatar">${m.iniciais}</div>
              <h4>${m.nome}</h4>
              <p class="cargo">${m.cargo}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- HISTORIA -->
    <section style="background:var(--preto-card);border-top:1px solid var(--cinza)">
      <div class="container" style="max-width:760px">
        <div class="section-header">
          <span class="section-tag">História</span>
          <h2 class="section-title">Nossa <span>Jornada</span></h2>
        </div>
        <div style="border-left:2px solid var(--cinza);padding-left:2rem">
          ${[
            ['2025', 'Fundação', 'O PA-Sports nasce na Fatec Taquaritinga com o objetivo de digitalizar o processo de peneiras esportivas no Brasil.'],
            ['2025', 'Expansão', 'Chegamos a 10 estados e firmamos parceria com os primeiros grandes clubes nacionais.'],
            ['2026', 'Futuro', 'Expansão para novas modalidades e lançamento de ferramentas de análise de desempenho com IA.']
          ].map(([ano, titulo, texto]) => `
            <div style="margin-bottom:2.5rem;position:relative">
              <div style="position:absolute;left:-2.6rem;top:0.2rem;width:10px;height:10px;border-radius:50%;background:var(--verde);border:2px solid var(--preto-card)"></div>
              <span style="font-family:'Bebas Neue',sans-serif;font-size:1.2rem;color:var(--verde);letter-spacing:2px">${ano}</span>
              <h3 style="font-family:'Barlow Condensed',sans-serif;font-size:1.3rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0.3rem 0 0.5rem">${titulo}</h3>
              <p style="font-size:0.9rem;color:var(--branco-muted);line-height:1.7">${texto}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
})();
