import { Livro } from "../types/livro.types";

export const acervo: Livro[] = [
  {
    id: 1,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    anoPublicacao: 2008,
    disponivel: true,
    tags: ["Programação", "Boas Práticas"],
  },
  {
    id: "ts-002",
    titulo: "Programming TypeScript",
    autor: "Boris Cherny",
    anoPublicacao: 2019,
    disponivel: false,
    tags: ["Programação", "TypeScript"],
  },
  {
    id: 3,
    titulo: "The Design of Everyday Things",
    autor: "Don Norman",
    anoPublicacao: 1988,
    disponivel: true,
    tags: ["Design", "UX"],
  },
  {
    id: 4,
    titulo: "Neuromancer",
    autor: "William Gibson",
    anoPublicacao: 1984,
    disponivel: true,
    tags: ["Ficção", "Cyberpunk"],
  },
];
