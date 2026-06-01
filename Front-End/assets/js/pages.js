// ─── INSCRIÇÃO EM PENEIRA (global, usada em múltiplas páginas) ───
function inscrever(id) {
  if (!state.user) {
    alert('Faça login para se inscrever em uma peneira!');
    navigate('login');
    return;
  }
  const p = PENEIRAS.find(x => x.id === id);
  alert(`✅ Inscrição realizada com sucesso!\n\n${p.titulo}\n${p.data} — ${p.hora}`);
}

// ─── PÁGINA ESPORTE ───
function renderSportPage(sportId) {
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

  if (peneirasEl) {
    const ps = PENEIRAS.filter(p => p.sport === sportId);
    if (ps.length === 0) {
      peneirasEl.innerHTML = `<p style="color:var(--branco-muted);text-align:center;padding:3rem">Nenhuma peneira aberta para ${sport.nome} no momento.</p>`;
      return;
    }
    peneirasEl.innerHTML = ps.map(p => {
      const statusLabel = { aberta: 'Aberta', encerrada: 'Encerrada', breve: 'Em breve' }[p.status];
      return `
      <div class="peneira-card">
        <div class="peneira-header">
          <span class="peneira-sport"><span class="ico">${p.icon}</span>${sport.nome}</span>
          <span class="status-badge status-${p.status}">${statusLabel}</span>
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
          <span class="vagas"><strong>${p.vagas}</strong> vagas</span>
          ${p.status === 'aberta'
            ? `<button class="btn btn-primary" style="font-size:0.78rem;padding:0.5rem 1rem" onclick="inscrever(${p.id})">Inscrever-se</button>`
            : `<span style="font-size:0.8rem;color:var(--branco-muted)">Encerrada</span>`
          }
        </div>
      </div>`;
    }).join('');
  }
}

// ─── AUTENTICAÇÃO ───
function renderPerfil() {
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

  const u = state.user;
  const initials = u.nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  wrap.innerHTML = `
    <div class="profile-header">
      <div class="profile-inner">
        <div class="profile-avatar">${initials}</div>
        <div class="profile-info">
          <h2>${u.nome}</h2>
          <p>${u.email}</p>
          <div class="profile-badges">
            <span class="profile-badge badge-verde">${u.esporte}</span>
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
        <div class="profile-field"><div class="lbl">Data de nascimento</div><div class="val">${u.nascimento}</div></div>
        <div class="profile-field"><div class="lbl">Cidade</div><div class="val">${u.cidade}</div></div>
      </div>
      <div class="profile-section">
        <h3>Perfil Esportivo</h3>
        <div class="profile-field"><div class="lbl">Esporte principal</div><div class="val">${u.esporte}</div></div>
      </div>
      <div class="profile-section" style="grid-column:1/-1">
        <h3>Minhas Inscrições</h3>
        <p style="color:var(--branco-muted);font-size:0.9rem">Você ainda não se inscreveu em nenhuma peneira. <a style="color:var(--verde);cursor:pointer;text-decoration:none" onclick="navigate('peneiras')">Ver peneiras abertas →</a></p>
      </div>
    </div>`;
}

function login(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;

  if (!email || !senha) { alert('Preencha todos os campos.'); return; }

  // Simula login — em produção, faria requisição ao backend
  state.user = {
    nome: 'João da Silva',
    email: email,
    nascimento: '10/05/2005',
    cidade: 'São Paulo - SP',
    esporte: 'Futebol'
  };

  navigate('perfil');
}

function cadastro(e) {
  e.preventDefault();
  const nome = document.getElementById('cad-nome').value;
  const email = document.getElementById('cad-email').value;
  const nascimento = document.getElementById('cad-nascimento').value;
  const cidade = document.getElementById('cad-cidade').value;
  const esporte = document.getElementById('cad-esporte').value;

  if (!nome || !email || !nascimento || !cidade || !esporte) {
    alert('Preencha todos os campos obrigatórios.'); return;
  }

  state.user = { nome, email, nascimento, cidade, esporte};
  alert('✅ Cadastro realizado com sucesso! Bem-vindo, ' + nome + '!');
  navigate('perfil');
}

function logout() {
  state.user = null;
  navigate('home');
}

function switchAuth(mode) {
  state.authMode = mode;
  document.getElementById('login-form').style.display = mode === 'login' ? 'block' : 'none';
  document.getElementById('cadastro-form').style.display = mode === 'cadastro' ? 'block' : 'none';
  document.getElementById('auth-title').textContent = mode === 'login' ? 'Entrar' : 'Criar Conta';
  document.getElementById('auth-sub').textContent = mode === 'login'
    ? 'Acesse sua conta de atleta'
    : 'Crie seu perfil de atleta gratuitamente';
}

document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('cadastro-form').addEventListener('submit', cadastro);
