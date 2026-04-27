import { Livro, LivroId, AtualizacaoLivro } from "../types/livro.types";
import { ILivroRepository } from "./ILivroRepository";

/**
 * SRP — responsabilidade única: persistência em memória.
 * OCP — aberto para extensão (troque por DB sem mudar os serviços).
 */
export class LivroRepository implements ILivroRepository {
  private readonly livros: Livro[];

  constructor(dadosIniciais: Livro[]) {
    this.livros = [...dadosIniciais];
  }

  buscarPorId(id: LivroId): Livro | undefined {
    return this.livros.find((livro) => livro.id === id);
  }

  listarTodos(): Livro[] {
    return [...this.livros];
  }

  atualizar(id: LivroId, alteracoes: AtualizacaoLivro): Livro | undefined {
    const livro = this.buscarPorId(id);
    if (!livro) return undefined;

    Object.assign(livro, alteracoes);
    return { ...livro };
  }
}
