const cardTimes = [
    {
      id: "São caetano",
      title: "São caetano",
      description: "São Caetano do sul, fundado em 29 de novembro de 2010",
      price: "R$80 milhões",
      imageUrl: "../imagens/Logo-SAOCAETANOHandbol.png",
      requisitos: {
        cidade: "São caetano do sul",
        estadio: "São caetano do sul",
        corFundo: "#a3a3a3ff", // vermelho escuro
        torcida: "3 milhões de torcedores",
        cores: "Lranja, branco e preto",
        titulos: "Campeões em jogos regionais e participação de celebração nas olimpíadas"
      }
    },
    {
      id: "Maringá",
      title: "Maringá",
      description: "Maringá, fundada em 05 de fevereiro de 1987.",
      price: "Não há base pública",
      imageUrl: "../imagens/Logo-MARINGAHandbol.png.png",
      requisitos: {
        cidade: "Maringá",
        estadio: "Ginásio Chico Neto",
        corFundo: "#ccccccff", // cinza escuro
        torcida: "50 mil torcedores",
        cores: "Verde e branco",
        titulos: "Em 2018 campeões paranaenses no adulto — tanto masculino quanto feminino. Em 2024, o time feminino alcançou o terceiro lugar na Liga Nacional de Handebol"
      }
    },
    {
      id: "Pinheiros",
      title: "Pinheiros",
      description: "Sport Club Germânia, fundado em 7 de setembro de 1899.",
      price: "Não há base pública",
      imageUrl: "../imagens/logo-PINHEIROSHandbol.png",
      requisitos: {
        cidade: "São paulo",
        estadio: "Ginásio Poliesportivo Henrique Vilaboim",
        corFundo: "#1f1f1fff", // preto
        torcida: "30 mil torcedores",
        cores: "Preto, azul e branco",
        titulos: "Libertadores, Brasileirão, Mundial"
      }
    }
  ];
  
  // Renderizar cards na página principal
  function renderCards() {
    const cardsContainer = document.getElementById("game-cards");
    if (!cardsContainer) return;
  
    cardsContainer.innerHTML = "";
    cardTimes.forEach((time) => {
      const card = document.createElement("div");
      card.className = "card";
  
      // Aplica a cor de fundo do time
      card.style.backgroundColor = time.requisitos?.corFundo || "#ffffff"; // branco por padrão
      card.style.color = "#ffffffff"; // texto branco para contraste
  
      card.innerHTML = `
        <img src="${time.imageUrl}" alt="${time.title}" />
        <div class="card-content">
          <h3>${time.title}</h3>
          <p class="price">${time.price}</p>
          <button class="btn-details" data-id="${time.id}">Ver Mais</button>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  
    document.querySelectorAll(".btn-details").forEach(button => {
      button.addEventListener("click", (e) => {
        const timeId = e.target.getAttribute("data-id");
        window.location.href = `timeshandbol.html?id=${encodeURIComponent(timeId)}`;
      });
    });
  }
  
  // Carregar detalhes do time na página de detalhes
  function carregarTime() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
  
    if (!id) return;
  
    const time = cardTimes.find(t => t.id === id);
  
    const nomeEl = document.getElementById("produto-nome");
    const descricaoEl = document.getElementById("produto-descricao");
    const imagemEl = document.getElementById("produto-imagem");
  
    const cidadeEl = document.getElementById("req-cidade");
    const estadioEl = document.getElementById("req-estadio");
    const torcidaEl = document.getElementById("req-torcida");
    const coresEl = document.getElementById("req-cores");
    const titulosEl = document.getElementById("req-titulos");
  
    if (!time) {
      if (nomeEl) nomeEl.textContent = "Time não encontrado";
      return;
    }
  
    if (nomeEl) nomeEl.textContent = time.title;
    if (descricaoEl) descricaoEl.textContent = time.description || "Descrição indisponível";
    if (imagemEl) {
      imagemEl.src = time.imageUrl;
      imagemEl.alt = time.title;
    }
  
    if (time.requisitos) {
      cidadeEl.textContent = time.requisitos.cidade || "-";
      estadioEl.textContent = time.requisitos.estadio || "-";
      torcidaEl.textContent = time.requisitos.torcida || "-";
      coresEl.textContent = time.requisitos.cores || "-";
      titulosEl.textContent = time.requisitos.titulos || "-";
    }
  }
  
  function voltar() {
    window.history.back();
  }
  
  // Detectar página e executar função correta
  window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("game-cards")) {
      renderCards();
    } else {
      carregarTime();
    }
  });
  