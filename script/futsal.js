const cardTimes = [
    {
      id: "Cascavel",
      title: "Cascavel",
      description: "Cascavel-PR, fundado em 4 de novembro de 1996",
      price: "Não há base pública",
      imageUrl: "../imagens/Logo-CASCAVELFutsal.png.png",
      requisitos: {
        cidade: "Cascavel-PR",
        estadio: "Ginásio Odilon Reinhardt",
        corFundo: "#cececeff", // vermelho escuro
        torcida: "100 mil torcedores",
        cores: "Vermelho, azul e Branco",
        titulos: "Liga Nacional de Futsal (nacional): Campeão em 2021, Copa Libertadores de Futsal (internacional): Campeão duas vezes, em 2022 e 2023 e Estado (Paraná): É heptacampeão do Campeonato Paranaense de Futsal – títulos nos anos 2003, 2004, 2005, 2011, 2012, 2020 e 2021."
      }
    },
    {
      id: "Magnus",
      title: "Magnus",
      description: "Sorocaba, fundado em janeiro de 2014.",
      price: "Não há base pública",
      imageUrl: "../imagens/Logo-MAGNUSFutsal.png.png",
      requisitos: {
        cidade: "Sorocaba",
        estadio: "Arena Sorocaba",
        corFundo: "#f78d02ff", // cinza escuro
        torcida: "150 mil torcedores ",
        cores: "Marrom, preto, amarelo, branco e vermelho",
        titulos: "Títulos da Liga Nacional de Futsal (LNF): 2014 e 2020. Copa do Brasil de Futsal 2023. Copa Intercontinental 2016, 2018 e 2019 "
      }
    },
    {
      id: "Carlos barbosa",
      title: "Carlos barbosa",
      description: "Rio Grande do Sul, fundada em 1 de março de 1976.",
      price: "Não há base pública ",
      imageUrl: "../imagens/logo-PINHEIROSHandbol.png",
      requisitos: {
        cidade: "Rio grande do sul",
        estadio: "Ginásio da Tramontina",
        corFundo: "#585858ff", // preto
        torcida: "80 mil torcedores",
        cores: "Preto, branco e laranja",
        titulos: "Copa Intercontinental de Futsal, Edições da Copa Libertadores de Futsal"
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
        window.location.href = `timesfutsal.html?id=${encodeURIComponent(timeId)}`;
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
  