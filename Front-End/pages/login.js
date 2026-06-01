// ─── RENDERIZA PÁGINA DE LOGIN ───
(function () {
  const page = document.getElementById('page-login');

  page.innerHTML = `
    <div class="auth-wrap">
      <div style="text-align:center;margin-bottom:2rem;padding-top:2rem">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--verde);letter-spacing:2px;margin-bottom:0.3rem">
          <span style="color:var(--branco)">PA</span>Sports
        </div>
        <p style="font-size:0.85rem;color:var(--branco-muted)">Portal do Atleta</p>
      </div>

      <div class="auth-card">
        <h2 id="auth-title">Entrar</h2>
        <p class="sub" id="auth-sub">Acesse sua conta de atleta</p>

        <!-- TABS -->
        <div style="display:flex;gap:0;border:1px solid var(--cinza);border-radius:3px;overflow:hidden;margin-bottom:2rem">
          <button onclick="switchAuth('login')" id="tab-login"
            style="flex:1;padding:0.6rem;font-size:0.8rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;background:var(--verde);color:var(--preto);border:none;cursor:pointer;transition:all 0.2s">
            Entrar
          </button>
          <button onclick="switchAuth('cadastro')" id="tab-cadastro"
            style="flex:1;padding:0.6rem;font-size:0.8rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;background:transparent;color:var(--branco-muted);border:none;cursor:pointer;transition:all 0.2s">
            Cadastrar
          </button>
        </div>

        <!-- FORM LOGIN -->
        <form id="login-form">
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="login-email" placeholder="seu@email.com" required>
          </div>
          <div class="form-group">
            <label>Senha</label>
            <input type="password" id="login-senha" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:0.5rem">
            Entrar na conta
          </button>
          <p style="text-align:center;margin-top:1rem;font-size:0.82rem;color:var(--branco-muted)">
            <a href="#" style="color:var(--verde);text-decoration:none">Esqueci minha senha</a>
          </p>
        </form>

        <!-- FORM CADASTRO -->
        <form id="cadastro-form" style="display:none">
          <div class="form-group">
            <label>Nome completo *</label>
            <input type="text" id="cad-nome" placeholder="João da Silva" required>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" id="cad-email" placeholder="seu@email.com" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Data de nascimento *</label>
              <input type="date" id="cad-nascimento" required>
            </div>
            <div class="form-group">
              <label>Cidade *</label>
              <input type="text" id="cad-cidade" placeholder="São Paulo - SP" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Esporte principal *</label>
              <select id="cad-esporte" required>
                <option value="">Selecione</option>
                <option>Futebol</option>
                <option>Basquete</option>
                <option>Vôlei</option>
                <option>Natação</option>
                <option>Tênis</option>
                <option>Atletismo</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Senha *</label>
            <input type="password" id="cad-senha" placeholder="Mínimo 8 caracteres" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:0.5rem">
            Criar conta
          </button>
        </form>
      </div>
    </div>
  `;
})();

// Overwrite switchAuth para mudar as abas visualmente também
const _switchAuth = switchAuth;
window.switchAuth = function(mode) {
  _switchAuth(mode);
  const tabLogin = document.getElementById('tab-login');
  const tabCad = document.getElementById('tab-cadastro');
  if (!tabLogin || !tabCad) return;
  if (mode === 'login') {
    tabLogin.style.background = 'var(--verde)';
    tabLogin.style.color = 'var(--preto)';
    tabCad.style.background = 'transparent';
    tabCad.style.color = 'var(--branco-muted)';
  } else {
    tabCad.style.background = 'var(--verde)';
    tabCad.style.color = 'var(--preto)';
    tabLogin.style.background = 'transparent';
    tabLogin.style.color = 'var(--branco-muted)';
  }
};
