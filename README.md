# 🚀 ApiCashLoop

**ApiCashLoop** é uma API robusta e segura para gerenciar solicitações de reembolso. Desenvolvida com **Node.js, Express, TypeScript e Prisma**, ela oferece um fluxo otimizado para autenticação, gerenciamento de usuários e processamento de reembolsos. A validação de dados é realizada com **Zod**, garantindo segurança e consistência.

## 📌 Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do backend.
- **Express**: Framework web minimalista para gerenciamento de rotas.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma**: ORM moderno para manipulação de banco de dados.
- **Zod**: Biblioteca para validação de schemas e dados.
- **JWT**: Implementação segura de autenticação e autorização.

## ⚙️ Funcionalidades

### 🔒 Autenticação e Autorização
- Middleware `ensureAuthenticated` para verificar se o usuário está autenticado.
- Middleware `verifyUserAuthorization` para validar permissões de acesso.

### 👤 Gerenciamento de Usuários
- Cadastro de novos usuários.
- Login e geração de tokens de sessão.

### 💰 Gerenciamento de Reembolsos
- Criação de solicitações de reembolso.
- Listagem de reembolsos com filtros opcionais.

---

## 📂 Estrutura do Projeto

```
📦 ApiCashLoop
 ┣ 📂 src
 ┃ ┣ 📂 config
 ┃ ┃ ┗ 📜 auth.ts              # Configuração de autenticação JWT
 ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📜 refunds-controller.ts # Lógica para solicitações de reembolso
 ┃ ┃ ┣ 📜 sessions-controller.ts # Controle de autenticação de usuários
 ┃ ┃ ┗ 📜 users-controller.ts   # Controle de gerenciamento de usuários
 ┃ ┣ 📂 middlewares
 ┃ ┃ ┣ 📜 ensure-authenticated.ts # Middleware de autenticação
 ┃ ┃ ┣ 📜 error-handling.ts      # Tratamento de erros
 ┃ ┃ ┗ 📜 verify-user-authorization.ts # Middleware de autorização
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📜 index.ts               # Arquivo principal de rotas
 ┃ ┃ ┣ 📜 refunds-routes.ts      # Rotas para reembolsos
 ┃ ┃ ┣ 📜 sessions-routes.ts     # Rotas de autenticação
 ┃ ┃ ┗ 📜 users-routes.ts        # Rotas de usuários
 ┃ ┣ 📂 database
 ┃ ┃ ┣ 📜 schema.prisma         # Schema do banco de dados
 ┃ ┃ ┗ 📂 migrations           # Migrações do banco de dados
 ┃ ┣ 📂 utils
 ┃ ┃ ┗ 📜 AppError.ts           # Classe personalizada para erros
 ┗ 📜 server.ts                 # Inicialização do servidor Express
```

---

## 🛠️ Exemplos de Código

### 🔐 Middleware de Autorização

```ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user || !role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 401);
    }
    return next();
  };
}

export { verifyUserAuthorization };
```

### 📩 Controlador de Reembolsos

```ts
import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

const CategoriesEnum = z.enum(["food", "others", "services", "transport", "accommodation"]);

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Informe o nome da solicitação" }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "Valor tem que ser positivo" }),
      filename: z.string().min(20, { message: "Informe o nome do arquivo" }),
    });

    const { name, category, amount, filename } = bodySchema.parse(request.body);

    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user.id,
      },
    });

    response.status(201).json(refund);
  }
}

export { RefundsController };
```

---

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/ApiCashLoop.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd ApiCashLoop
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure o banco de dados no arquivo `.env`
5. Execute as migrações do Prisma:
   ```sh
   npx prisma migrate dev
   ```
6. Inicie o servidor:
   ```sh
   npm run dev
   ```

---

## 📜 Licença

Este projeto é licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

📌 **Desenvolvido com 💙 por Raí (https://github.com/RaiVandeberg)**
