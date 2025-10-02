const cardTimes = [
  {
    id: "sada-cruzeiro",
    title: "Sada Cruzeiro",
    description: "Sada Cruzeiro Vôlei, um dos clubes mais vitoriosos do vôlei brasileiro e mundial.",
    price: "R$ 25 milhões",
    imageUrl: "../imagens/SadaCruzeiro2021.png",
    requisitos: {
      cidade: "Contagem, MG",
      estadio: "Ginásio do Riacho",
      corFundo: "#FFFFFF", 
      torcida: "Grande torcida mineira",
      cores: "Azul e Branco",
      titulos: "Mundial de Clubes, Superliga, Copa Brasil"
    }
  },
  {
    id: "sesi-bauru",
    title: "Sesi Bauru",
    description: "Sesi Bauru, tradicional equipe paulista com grande destaque na Superliga Feminina.",
    price: "R$ 15 milhões",
    imageUrl: "../imagens/SesiSaoPaulo.png",
    requisitos: {
      cidade: "Bauru, SP",
      estadio: "Ginásio Panela de Pressão",
      corFundo: "#D32F2F", 
      torcida: "Torcida apaixonada do interior paulista",
      cores: "Vermelho, Branco e Preto",
      titulos: "Paulista, Copa Brasil"
    }
  },
  {
    id: "volei-renata",
    title: "Vôlei Renata",
    description: "Vôlei Renata, equipe sediada em Campinas que se destaca no cenário nacional masculino.",
    price: "R$ 10 milhões",
    imageUrl: "../imagens/VoleiRenata.png",
    requisitos: {
      cidade: "Campinas, SP",
      estadio: "Ginásio Taquaral",
      corFundo: "#FFFFFF", 
      torcida: "Fiel torcida campineira",
      cores: "Amarelo, Azul e Branco",
      titulos: "Campeonato Paulista, Bons desempenhos na Superliga"
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
    card.style.color = "#000";

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
      window.location.href = `timesVolei.html?id=${encodeURIComponent(timeId)}`;
    });
  });
}

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

window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("game-cards")) {
    renderCards();
  } else {
    carregarTime();
  }
});