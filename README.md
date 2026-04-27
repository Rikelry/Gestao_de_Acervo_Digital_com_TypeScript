**Objetivo:** Criar um sistema simplificado de gerenciamento de livros e empréstimos, aplicando tipagem estática e utilitários para reaproveitamento de código.

- **Definindo a Base (Tipos e Objetos)**  
Crie uma Interface chamada Livro com as seguintes propriedades:  
  * id (número ou string - use Union Types)  
  * titulo (string)  
  * autor (string)  
  * anoPublicacao (número)  
  * disponivel (booleano)  
  * tags (um Array de strings)  

Mock dos dados: crie uma variável acervo que seja um array de objetos do tipo Livro, contendo pelo menos 2 exemplos.

- **Funções e Inferência**  
Crie uma função chamada buscarPorId:  
  * Ela deve receber um id (Union Type) e retornar um Livro ou undefined.  
  * Certifique-se de que o TypeScript consiga inferir o retorno corretamente.  

Aplicando Utilitários de Tipos

Agora, vamos simular situações reais de desenvolvimento:  
Atualização Parcial: Crie uma função atualizarLivro. Ela deve receber o id e um objeto com as alterações  
Desafio: Use o utilitário Partial<Livro> para permitir que o usuário envie apenas os campos que deseja mudar.  

Visualização do Cliente: Em uma lista pública, não queremos mostrar o id ou se ele está disponivel  
Desafio: Crie um novo tipo chamado LivroResumo usando Omit para remover esses campos da interface original.  

Log de Categorias: Queremos mapear os livros por categorias (ex: "Programação", "Ficção", "Design")  
Desafio: Use Record para criar um objeto onde as chaves sejam as categorias e o valor seja um array de LivroResumo.  
