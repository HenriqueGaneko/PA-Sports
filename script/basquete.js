const cardTimes = [
  {
    id: "flamengo",
    title: "Flamengo Basquete",
    description: "Um dos times mais vitoriosos do Brasil, com forte presença nacional e internacional.",
    price: "R$ 12 milhões",
    imageUrl: "imagens/LogoFlamengo.png",
    requisitos: {
      cidade: "Rio de Janeiro, RJ",
      estadio: "Ginásio do Maracanãzinho",
      corFundo: "#D32F2F",
      torcida: "40 mil em média",
      cores: "Vermelho e Preto",
      titulos: "NBB, Liga das Américas, Campeonato Carioca"
    }
  },
  {
    id: "franca",
    title: "Franca Basquete",
    description: "Tradição no basquete nacional, com diversas conquistas no NBB e estaduais.",
    price: "R$ 10 milhões",
    imageUrl: "imagens/LogoFranca.png",
    requisitos: {
      cidade: "Franca, SP",
      estadio: "Ginásio Pedrocão",
      corFundo: "#0D47A1",
      torcida: "10 mil em média",
      cores: "Azul e Branco",
      titulos: "NBB, Paulista"
    }
  },
  {
    id: "bauru",
    title: "Bauru Basket",
    description: "Equipe tradicional com grande impacto na formação de talentos.",
    price: "R$ 8 milhões",
    imageUrl: "imagens/bauruBasquete.png",
    requisitos: {
      cidade: "Bauru, SP",
      estadio: "Ginásio Panela de Pressão",
      corFundo: "#388E3C",
      torcida: "8 mil em média",
      cores: "Verde e Branco",
      titulos: "NBB, Sul-Americana"
    }
  }
];

function renderCards() {
  const cardsContainer = document.getElementById("game-cards");
  if (!cardsContainer) return;

  cardsContainer.innerHTML = "";
  cardTimes.forEach((time) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundColor = time.requisitos?.corFundo || "#ffffff";
    card.style.color = "#fff"; // texto preto

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
      window.location.href = `timesBasquete.html?id=${encodeURIComponent(timeId)}`;
    });
  });
}

function carregarTime() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const time = cardTimes.find(t => t.id === id);

  if (!time) {
    document.getElementById("produto-nome").textContent = "Time não encontrado";
    return;
  }

  document.getElementById("produto-nome").textContent = time.title;
  document.getElementById("produto-descricao").textContent = time.description;
  document.getElementById("produto-imagem").src = time.imageUrl;
  document.getElementById("produto-imagem").alt = time.title;
  document.getElementById("req-cidade").textContent = time.requisitos.cidade;
  document.getElementById("req-estadio").textContent = time.requisitos.estadio;
  document.getElementById("req-torcida").textContent = time.requisitos.torcida;
  document.getElementById("req-cores").textContent = time.requisitos.cores;
  document.getElementById("req-titulos").textContent = time.requisitos.titulos;
}

function voltar() {
  window.history.back();
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("game-cards")) {
    renderCards();
  } else {
    carregarTime();
  }
});
