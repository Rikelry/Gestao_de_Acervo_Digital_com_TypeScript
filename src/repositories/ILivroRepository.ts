import { Livro, LivroId, AtualizacaoLivro } from "../types/livro.types";

/**
 * ISP — Interface Segregation Principle
 * Contrato mínimo para qualquer repositório de livros.
 */
export interface ILivroRepository {
  buscarPorId(id: LivroId): Livro | undefined;
  listarTodos(): Livro[];
  atualizar(id: LivroId, alteracoes: AtualizacaoLivro): Livro | undefined;
}
