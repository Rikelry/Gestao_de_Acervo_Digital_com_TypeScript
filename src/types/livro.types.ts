// ─── Entidades ────────────────────────────────────────────────────────────────

export type LivroId = number | string;

export interface Livro {
  id: LivroId;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  disponivel: boolean;
  tags: string[];
}

// ─── Utilitários de tipo ──────────────────────────────────────────────────────

/** Campos públicos — sem id e disponivel */
export type LivroResumo = Omit<Livro, "id" | "disponivel">;

/** Payload de atualização — todos os campos são opcionais */
export type AtualizacaoLivro = Partial<Livro>;

/** Catálogo agrupado por categoria */
export type CatalogoPorCategoria = Record<string, LivroResumo[]>;
