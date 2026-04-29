/**
 * Ponto de entrada — Composição e Manipulação do DOM
 */
import { acervo } from "./data/acervo";
import { LivroRepository } from "./repositories/LivroRepository";
import { LivroService } from "./services/LivroService";
import { Livro } from "./types/livro.types";

// Inicialização das camadas (SOLID)
const repository = new LivroRepository(acervo);
const service = new LivroService(repository);

// Configurações visuais
const tagColors: Record<string, string> = {
  Programação: "#6366f1",
  "Boas Práticas": "#10b981",
  TypeScript: "#3b82f6",
  Design: "#f59e0b",
  UX: "#ec4899",
  Ficção: "#8b5cf6",
  Cyberpunk: "#ef4444",
};

// --- Funções de UI ---

function criarCard(livro: Livro): HTMLElement {
  const card = document.createElement("article");
  card.className = "card";

  const tagsHtml = livro.tags
    .map(tag => `<span class="tag" style="background:${tagColors[tag] ?? "#64748b"}">${tag}</span>`)
    .join("");

  card.innerHTML = `
      <div class="card__cover">
        <span class="card__emoji">${livro.disponivel ? "📖" : "🔒"}</span>
      </div>
      <div class="card__body">
        <h2 class="card__title">${livro.titulo}</h2>
        <p class="card__autor">${livro.autor} · ${livro.anoPublicacao}</p>
        <div class="card__tags">${tagsHtml}</div>
        <span class="card__status ${livro.disponivel ? "card__status--ok" : "card__status--off"}">
          ${livro.disponivel ? "Disponível" : "Emprestado"}
        </span>
      </div>
    `;

  card.addEventListener("click", () => abrirModal(livro));
  return card;
}

function renderizar(filtro: string = "todos") {
  const grid = document.getElementById("grid");
  if (!grid) return;
  
  grid.innerHTML = "";

  // Usando o service para listar os livros
  const todosLivros = service.listarTodos();
  const filtrados = filtro === "todos" 
    ? todosLivros 
    : todosLivros.filter(l => l.tags.includes(filtro));

  if (filtrados.length === 0) {
    grid.innerHTML = `<p class="empty">Nenhum livro encontrado nessa categoria.</p>`;
    return;
  }

  filtrados.forEach(livro => grid.appendChild(criarCard(livro)));
}

function abrirModal(livro: Livro) {
  const modalBody = document.getElementById("modalBody");
  const modalOverlay = document.getElementById("modalOverlay");
  
  if (!modalBody || !modalOverlay) return;

  const tagsHtml = livro.tags
    .map(tag => `<span class="tag" style="background:${tagColors[tag] ?? "#64748b"}">${tag}</span>`)
    .join("");

  modalBody.innerHTML = `
      <div class="modal__cover">
        <span class="modal__emoji">${livro.disponivel ? "📖" : "🔒"}</span>
      </div>
      <h2 class="modal__title">${livro.titulo}</h2>
      <p class="modal__autor">${livro.autor}</p>
      <p class="modal__ano">Publicado em ${livro.anoPublicacao}</p>
      <div class="card__tags">${tagsHtml}</div>
      <span class="card__status ${livro.disponivel ? "card__status--ok" : "card__status--off"}" style="margin-top:1rem;display:inline-block">
        ${livro.disponivel ? "✔ Disponível" : "✘ Emprestado"}
      </span>
    `;

  modalOverlay.classList.add("modal-overlay--visible");
}

// --- Event Listeners ---

// Filtros
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.currentTarget as HTMLButtonElement;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("filter-btn--active"));
    target.classList.add("filter-btn--active");
    renderizar(target.dataset.category);
  });
});

// Fechar modal
document.getElementById("modalClose")?.addEventListener("click", () => {
  document.getElementById("modalOverlay")?.classList.remove("modal-overlay--visible");
});

document.getElementById("modalOverlay")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    (e.target as HTMLElement).classList.remove("modal-overlay--visible");
  }
});

// Inicialização
renderizar();