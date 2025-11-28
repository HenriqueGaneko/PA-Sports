const cardTimes = [
    {
      id: "Fluminense",
      title: "Fluminense",
      description: "Rio de Janeiro Fluminense, fundado em 21 de julho de 1902",
      price: "R$ 684 milhões",
      imageUrl: "../imagens/Logo-FLUMINENSEFOOTBALLCLUBENatacao.png",
      requisitos: {
        cidade: "Rio de Janeiro, RJ",
        estadio: "Laranjeiras",
        corFundo: "#6c1413", // vermelho escuro
        torcida: "7,2 milhões de torcedores",
        cores: "Vermelho, Verde e Branco",
        titulos: "o Tricolor obteve 34 medalhas de ouro, quatro pratas e um bronze"
      }
    },
    {
      id: "Morumbi",
      title: "Morumbi",
      description: "Fundado em 29 de março de 2004.",
      price: "R$ 1.8 bilhões",
      imageUrl: "../imagens/Logo-CLUBE_PAINEIRAS_DO_MORUMBYNatacao-removebg-preview.png",
      requisitos: {
        cidade: "Morumbi",
        estadio: "Jardim Europa",
        corFundo: "#ccccccff", // cinza escuro
        torcida: "39 mil ",
        cores: "azul e preto",
        titulos: "campeão geral do Campeonato Paulista Jr e Sênior de Inverno de Natação 2025, 2024, 2023 e 2022"
      }
    },
    {
      id: "Flamengo",
      title: "Flamengo",
      description: "Grupo de Regatas do Flamengo, fundado em 15 de novembro de 1895.",
      price: "R$ 1.6 bilhões",
      imageUrl: "../imagens/Logo-FLAMENGONatação.png",
      requisitos: {
        cidade: "Gávea",
        estadio: "Neo Química Arena",
        corFundo: "#000000ff", // preto
        torcida: "30 milhões de torcedores",
        cores: "Preto e Branco",
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
        window.location.href = `timesnatacao.html?id=${encodeURIComponent(timeId)}`;
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
  