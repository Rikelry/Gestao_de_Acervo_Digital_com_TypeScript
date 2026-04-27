/**
 * Ponto de entrada — composição das dependências (DIP / Composition Root).
 * Nenhuma camada conhece a implementação concreta das outras.
 */

import { acervo } from "./data/acervo";
import { LivroRepository } from "./repositories/LivroRepository";
import { LivroService } from "./services/LivroService";

const repository = new LivroRepository(acervo);
const service = new LivroService(repository);

// ─── Demonstração ─────────────────────────────────────────────────────────────

console.log("=== Busca por ID ===");
console.log(service.buscarPorId(1));
console.log(service.buscarPorId("ts-002"));
console.log(service.buscarPorId(99)); // undefined

console.log("\n=== Atualização Parcial ===");
console.log(service.atualizar("ts-002", { disponivel: true, anoPublicacao: 2020 }));

console.log("\n=== Resumos Públicos ===");
console.log(service.listarResumos());

console.log("\n=== Catálogo por Categoria ===");
console.log(JSON.stringify(service.agruparPorCategoria(), null, 2));
