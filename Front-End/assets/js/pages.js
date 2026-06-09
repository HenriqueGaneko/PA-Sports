// ─── URL BASE DA API ─────────────────────────────────────────
const API_URL = '';

// ─── FORMATA DATA (remove T00:00:00.000Z) ────────────────────
function formatarData(dataStr) {
  if (!dataStr) return '—';
  const s = dataStr.split('T')[0];        // "2000-05-10"
  const [ano, mes, dia] = s.split('-');
  return `${dia}/${mes}/${ano}`;           // "10/05/2000"
}

// ─── ATUALIZA O BOTÃO DA NAVBAR (perfil vs entrar) ───────────
function atualizarNavbar() {
  const navCta = document.querySelector('.nav-cta');
  if (!navCta) return;
  if (state.user) {
    navCta.textContent = 'Perfil';
    navCta.dataset.page = 'perfil';
  } else {
    navCta.textContent = 'Entrar';
    navCta.dataset.page = 'login';
  }
}

// ─── INSCRIÇÃO EM PENEIRA ────────────────────────────────────
async function inscrever(id_peneira) {
  if (!state.user) {
    alert('Faça login para se inscrever em uma peneira!');
    navigate('login');
    return;
  }

  try {
    const hoje = new Date().toISOString().split('T')[0];
    const res = await fetch(`${API_URL}/inscricoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_atleta: state.user.id_atleta,
        id_peneira: id_peneira,
        data_inscricao: hoje
      })
    });

    if (res.ok) {
      alert('✅ Inscrição realizada com sucesso!');
      if (state.user) await carregarInscricoes();
    } else {
      const err = await res.json();
      alert('Erro ao se inscrever: ' + (err.message || 'Tente novamente.'));
    }
  } catch (e) {
    alert('Erro de conexão com o servidor.');
    console.error(e);
  }
}

// ─── CARREGA INSCRIÇÕES DO ATLETA LOGADO ─────────────────────
async function carregarInscricoes() {
  if (!state.user) return [];
  try {
    const res = await fetch(`${API_URL}/inscricoes/atleta/${state.user.id_atleta}`);
    if (res.ok) {
      const data = await res.json();
      // API retorna { message, data: [...] }
      const lista = data.data || data;
      state.inscricoes = Array.isArray(lista) ? lista : [];
    }
  } catch (e) {
    console.error('Erro ao carregar inscrições:', e);
    state.inscricoes = [];
  }
}

// ─── PÁGINA ESPORTE ──────────────────────────────────────────
async function renderSportPage(sportId) {
  const sport = SPORTS.find(s => s.id === sportId);
  if (!sport) return;

  const hero = document.getElementById('sport-page-hero');
  const peneirasEl = document.getElementById('sport-peneiras');

  if (hero) {
    hero.innerHTML = `
      <div class="container">
        <button class="back-btn" onclick="navigate('esportes')">← Voltar aos Esportes</button>
        <h1>${sport.icon} ${sport.nome}</h1>
        <p style="color:var(--branco-muted);font-size:1.05rem;max-width:600px;line-height:1.7;margin-top:1rem">${sport.sobre}</p>
        <div style="display:flex;gap:2rem;margin-top:2rem;flex-wrap:wrap">
          <div>
            <p style="font-size:0.75rem;color:var(--verde);letter-spacing:2px;text-transform:uppercase;margin-bottom:0.5rem">Categorias</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
              ${sport.categorias.map(c => `<span style="background:rgba(0,200,83,0.1);border:1px solid rgba(0,200,83,0.2);color:var(--verde);font-size:0.75rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 12px;border-radius:2px">${c}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  }

  if (!peneirasEl) return;

  peneirasEl.innerHTML = `<p style="color:var(--branco-muted);text-align:center;padding:3rem">Carregando peneiras...</p>`;

  try {
    const res  = await fetch(`${API_URL}/peneiras`);
    const json = await res.json();
    const todas = json.data || json;

    // Filtra pelo esporte da página (compara normalizando acentos)
    const normalizar = str => (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const ps = Array.isArray(todas)
      ? todas.filter(p => normalizar(p.nome_esporte) === normalizar(sport.nome))
      : [];

    if (ps.length === 0) {
      peneirasEl.innerHTML = `<p style="color:var(--branco-muted);text-align:center;padding:3rem">Nenhuma peneira aberta para ${sport.nome} no momento.</p>`;
      return;
    }

    const STATUS_LABEL = { aberta: 'Aberta', encerrada: 'Encerrada', breve: 'Em breve' };

    peneirasEl.innerHTML = ps.map(p => {
      const status = p.status || 'aberta';
      return `
      <div class="peneira-card">
        <div class="peneira-header">
          <span class="peneira-sport"><span class="ico">${sport.icon}</span>${sport.nome}</span>
          <span class="status-badge status-${status}">${STATUS_LABEL[status] || status}</span>
        </div>
        <div class="peneira-body">
          <h3 class="peneira-title">${p.titulo}</h3>
          <div class="peneira-info">
            <div class="info-row"><span class="ico">🏢</span>${p.nome_instituicao || '—'}</div>
            <div class="info-row"><span class="ico">📍</span>${p.localizacao || '—'}</div>
            <div class="info-row"><span class="ico">📅</span>${formatarData(p.data_peneira)}</div>
            ${p.descricao ? `<div class="info-row"><span class="ico">📝</span>${p.descricao}</div>` : ''}
          </div>
        </div>
        <div class="peneira-footer">
          <span class="vagas"><strong>${p.vagas}</strong> vagas</span>
          ${status === 'aberta'
            ? `<button class="btn btn-primary" style="font-size:0.78rem;padding:0.5rem 1rem" onclick="inscrever(${p.id_peneira})">Inscrever-se</button>`
            : `<span style="font-size:0.8rem;color:var(--branco-muted)">${STATUS_LABEL[status]}</span>`
          }
        </div>
      </div>`;
    }).join('');

  } catch (e) {
    peneirasEl.innerHTML = `<p style="color:var(--branco-muted);text-align:center;padding:3rem">Erro ao carregar peneiras.</p>`;
    console.error(e);
  }
}

// ─── PERFIL ──────────────────────────────────────────────────
async function renderPerfil() {
  const wrap = document.getElementById('perfil-wrap');
  if (!wrap) return;

  if (!state.user) {
    wrap.innerHTML = `
      <div style="text-align:center;padding:5rem 2rem">
        <p style="font-size:3rem;margin-bottom:1rem">🔒</p>
        <h2 style="font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:2px;margin-bottom:0.5rem">Acesso restrito</h2>
        <p style="color:var(--branco-muted);margin-bottom:2rem">Faça login para acessar seu perfil de atleta</p>
        <button class="btn btn-primary" onclick="navigate('login')">Entrar</button>
      </div>`;
    return;
  }

  await carregarInscricoes();
  const u = state.user;
  const initials = u.nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const inscricoes = state.inscricoes || [];

  const inscricoesHTML = inscricoes.length === 0
    ? `<p style="color:var(--branco-muted);font-size:0.9rem">Você ainda não se inscreveu em nenhuma peneira. <a style="color:var(--verde);cursor:pointer;text-decoration:none" onclick="navigate('peneiras')">Ver peneiras abertas →</a></p>`
    : inscricoes.map(i => `
        <div class="profile-field">
          <div class="lbl">${i.titulo_peneira || 'Peneira #' + i.id_peneira}</div>
          <div class="val">${formatarData(i.data_peneira)} — ${i.localizacao || ''}</div>
        </div>`).join('');

  wrap.innerHTML = `
    <div class="profile-header">
      <div class="profile-inner">
        <div class="profile-avatar">${initials}</div>
        <div class="profile-info">
          <h2>${u.nome}</h2>
          <p>${u.email}</p>
          <div class="profile-badges">
            <span class="profile-badge badge-verde">${u.esporte || 'Atleta'}</span>
          </div>
        </div>
        <button class="btn btn-outline" style="margin-left:auto" onclick="logout()">Sair</button>
      </div>
    </div>
    <div class="profile-content">
      <div class="profile-section">
        <h3>Dados Pessoais</h3>
        <div class="profile-field"><div class="lbl">Nome completo</div><div class="val">${u.nome}</div></div>
        <div class="profile-field"><div class="lbl">Email</div><div class="val">${u.email}</div></div>
        <div class="profile-field"><div class="lbl">Data de nascimento</div><div class="val">${formatarData(u.data_nascimento)}</div></div>
        <div class="profile-field"><div class="lbl">Cidade</div><div class="val">${u.cidade || '—'}</div></div>
        <div class="profile-field"><div class="lbl">Telefone</div><div class="val">${u.telefone || '—'}</div></div>
      </div>
      <div class="profile-section">
        <h3>Perfil Esportivo</h3>
        <div class="profile-field"><div class="lbl">Esporte principal</div><div class="val">${u.esporte || '—'}</div></div>
      </div>
      <div class="profile-section" style="grid-column:1/-1">
        <h3>Minhas Inscrições</h3>
        ${inscricoesHTML}
      </div>
    </div>`;
}

// ─── LOGIN ───────────────────────────────────────────────────
async function login(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;

  if (!email || !senha) { alert('Preencha todos os campos.'); return; }

  try {
    // Usa o endpoint dedicado de login
    const res = await fetch(`${API_URL}/atletas/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const json = await res.json();
    const lista = json.data || json;
    const usuario = Array.isArray(lista) ? lista[0] : null;

    if (!usuario) {
      alert('Email ou senha incorretos.');
      return;
    }

    state.user = usuario;
    state.inscricoes = [];
    atualizarNavbar();      // ← atualiza botão para "Perfil"
    navigate('perfil');

  } catch (err) {
    alert('Erro de conexão com o servidor. Verifique se a API está rodando.');
    console.error(err);
  }
}

// ─── CADASTRO ────────────────────────────────────────────────
async function cadastro(e) {
  e.preventDefault();
  const nome       = document.getElementById('cad-nome').value;
  const email      = document.getElementById('cad-email').value;
  const nascimento = document.getElementById('cad-nascimento').value;
  const cidade     = document.getElementById('cad-cidade').value;
  const telefone   = document.getElementById('cad-telefone').value;
  const esporte    = document.getElementById('cad-esporte').value;
  const senha      = document.getElementById('cad-senha').value;

  if (!nome || !email || !nascimento || !cidade || !esporte || !senha) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/atletas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        email,
        senha,
        data_nascimento: nascimento,
        cidade,
        telefone: telefone || '',
        esporte
      })
    });

    const json = await res.json();

    if (res.ok || res.status === 201) {
      // Busca o atleta recém-criado para ter o id_atleta
      const resLogin = await fetch(`${API_URL}/atletas/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const jsonLogin = await resLogin.json();
      const listaLogin = jsonLogin.data || jsonLogin;
      const novoAtleta = Array.isArray(listaLogin) ? listaLogin[0] : null;

      state.user = novoAtleta || { nome, email, cidade, data_nascimento: nascimento, esporte, telefone };
      state.inscricoes = [];
      atualizarNavbar();    // ← atualiza botão para "Perfil"
      alert('✅ Cadastro realizado com sucesso! Bem-vindo, ' + nome + '!');
      navigate('perfil');
    } else {
      alert('Erro ao cadastrar: ' + (json.message || 'Tente novamente.'));
    }
  } catch (err) {
    alert('Erro de conexão com o servidor. Verifique se a API está rodando.');
    console.error(err);
  }
}

// ─── LOGOUT ──────────────────────────────────────────────────
function logout() {
  state.user = null;
  state.inscricoes = [];
  atualizarNavbar();        // ← atualiza botão de volta para "Entrar"
  navigate('home');
}

// ─── TROCA DE ABA LOGIN / CADASTRO ───────────────────────────
function switchAuth(mode) {
  state.authMode = mode;
  document.getElementById('login-form').style.display    = mode === 'login'    ? 'block' : 'none';
  document.getElementById('cadastro-form').style.display = mode === 'cadastro' ? 'block' : 'none';
  document.getElementById('auth-title').textContent = mode === 'login' ? 'Entrar' : 'Criar Conta';
  document.getElementById('auth-sub').textContent   = mode === 'login'
    ? 'Acesse sua conta de atleta'
    : 'Crie seu perfil de atleta';
}