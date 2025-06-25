const cardTimes = [
  {
    id: "São Paulo",
    title: "São Paulo",
    description: "São Paulo Futebol Clube, fundado em 25 de janeiro de 1930",
    price: "R$ 1,1 bilhão",
    imageUrl: "imagens/São_Paulo_Futebol_Clube.png",
    requisitos: {
      cidade: "São Paulo, SP",
      estadio: "Morumbis",
      corFundo: "#B71C1C", // vermelho escuro
      torcida: "15 milhões de torcedores",
      cores: "Vermelho, Preto e Branco",
      titulos: "Libertadores, Brasileirão, Copa do Brasil, Mundial"
    }
  },
  {
    id: "palmeiras",
    title: "Palmeiras",
    description: "Sociedade Esportiva Palmeiras, tradicional clube paulista fundado em 1914.",
    price: "R$ 1.8 bilhões",
    imageUrl: "imagens/palmeiras.png",
    requisitos: {
      cidade: "São Paulo, SP",
      estadio: "Allianz Parque",
      corFundo: "#1B5E20", // verde escuro
      torcida: "18 milhões de torcedores",
      cores: "Verde e Branco",
      titulos: "Libertadores, Brasileirão"
    }
  },
  {
    id: "corinthians",
    title: "Corinthians",
    description: "Sport Club Corinthians Paulista, fundado em 1910, conhecido como 'Timão'.",
    price: "R$ 1.6 bilhões",
    imageUrl: "imagens/corinthians.png",
    requisitos: {
      cidade: "São Paulo, SP",
      estadio: "Neo Química Arena",
      corFundo: "#212121", // preto
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
    card.style.color = "#fff"; // texto branco para contraste

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
      window.location.href = `timesFutebol.html?id=${encodeURIComponent(timeId)}`;
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
