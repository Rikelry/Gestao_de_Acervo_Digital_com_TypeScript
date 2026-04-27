import { ILivroRepository } from "../repositories/ILivroRepository";
import {
  Livro,
  LivroId,
  LivroResumo,
  AtualizacaoLivro,
  CatalogoPorCategoria,
} from "../types/livro.types";

/**
 * SRP — regras de negócio isoladas da persistência.
 * DIP — depende da abstração ILivroRepository, não da implementação concreta.
 */
export class LivroService {
  constructor(private readonly repository: ILivroRepository) {}

  buscarPorId(id: LivroId): Livro | undefined {
    return this.repository.buscarPorId(id);
  }

  listarTodos(): Livro[] {
    return this.repository.listarTodos();
  }

  atualizar(id: LivroId, alteracoes: AtualizacaoLivro): Livro | undefined {
    return this.repository.atualizar(id, alteracoes);
  }

  /** Retorna versão pública do livro, sem id e disponivel */
  paraResumo({ id: _id, disponivel: _disp, ...resumo }: Livro): LivroResumo {
    return resumo;
  }

  listarResumos(): LivroResumo[] {
    return this.repository.listarTodos().map((livro) => this.paraResumo(livro));
  }

  /** Agrupa LivroResumo por cada tag do livro */
  agruparPorCategoria(): CatalogoPorCategoria {
    return this.repository.listarTodos().reduce<CatalogoPorCategoria>((catalogo, livro) => {
      livro.tags.forEach((tag) => {
        if (!catalogo[tag]) catalogo[tag] = [];
        catalogo[tag].push(this.paraResumo(livro));
      });
      return catalogo;
    }, {});
  }
}
