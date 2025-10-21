# API de Transferências e Usuários - Trabalho de Conclusão de Curso

Esta API foi desenvolvida como base para estudos de testes e automação de APIs, abrangendo as tecnologias REST e GraphQL.

## Tecnologias e Arquitetura

* **Backend:** Node.js, Express, Apollo Server (para GraphQL).
* **Testes:** Mocha, Chai, Supertest e Nock.
* **Documentação:** Swagger e GraphQL Playground.
* **Armazenamento:** Banco de dados em memória (objetos e arrays) para garantir que a execução e os testes ocorram imediatamente, sem dependências externas.

----

## Guia de Configuração e Validação (Execução dos Testes)

Para validar o funcionamento da API e executar a suíte de testes completa, o avaliador deve seguir as instruções na ordem.

### 1. Pré-requisitos

Certifique-se de que os seguintes ambientes estejam instalados na máquina de execução:

* **Node.js (versão LTS)**
* **Git**

### 2. Configuração Inicial

1.  **Clonar o Repositório:** Acesse o terminal e baixe o projeto.
    ```bash
    git clone [https://github.com/QApriscila/TrabalhoDeConclusao-APIs.git](https://github.com/QApriscila/TrabalhoDeConclusao-APIs.git)
    cd TrabalhoDeConclusao-APIs
    ```
2.  **Instalar Dependências:** Instale todos os pacotes de produção e desenvolvimento (testes) listados no `package.json`.
    ```bash
    npm install
    ```

### 3. Configuração de Ambiente (`.env`)

O projeto utiliza variáveis de ambiente para a comunicação e autenticação.

1.  Crie um novo arquivo chamado **`.env`** na pasta raiz do projeto.
2.  Adicione as seguintes variáveis, que definem as URLs dos servidores e a chave de segurança JWT:

    ```
    # URLs dos servidores para comunicação dos testes
    BASE_URL_REST=http://localhost:3000
    BASE_URL_GRAPHQL=http://localhost:4000/graphql

    # Chave de segurança para Autenticação JWT (token)
    JWT_SECRET="SUA_CHAVE_SECRETA_FORTE_AQUI"
    ```

### 4. Execução dos Servidores

Os testes de integração e validação requerem que os dois servidores estejam ativos. Abra **duas janelas de terminal distintas** na pasta do projeto para iniciar os serviços simultaneamente:

| Serviço | Porta Padrão | Comando para Iniciar | Documentação de Acesso |
| :--- | :--- | :--- | :--- |
| **API REST** | 3000 | `npm run start-rest` | `http://localhost:3000/api-docs` (Swagger) |
| **API GraphQL** | 4000 | `npm run start-graphql` | `http://localhost:4000/graphql` (Playground) |

### 5. Execução e Validação dos Testes

Com os servidores rodando (Passo 4), abra um **terceiro terminal** e execute o comando principal para rodar a suíte completa de testes:

| Ação | Comando | Objetivo |
| :--- | :--- | :--- |
| **Rodar Suíte Completa** | `npm test` | Executa todos os testes (`**/*.test.js`) de REST e GraphQL, e gera o relatório `mochawesome` na pasta `mochawesome-report/`. **Este é o comando principal para avaliação.** |

**Validação:** O terminal deve exibir o relatório de testes indicando que **todos os testes passaram**.

---

## Detalhes da API (Referência)

### Endpoints Principais (REST)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/users/register` | Cria um novo usuário. |
| `POST` | `/users/login` | Autentica e retorna o token JWT. |
| `GET` | `/users` | Lista todos os usuários (requer autenticação JWT). |
| `POST` | `/transfers` | Realiza uma transferência. |
| `GET` | `/transfers` | Lista todas as transferências (requer autenticação JWT). |

### GraphQL Types, Queries e Mutations

Rode `npm run start-graphql` para acessar o Playground em `http://localhost:4000/graphql`.

* **Types:** `User` e `Transfer`.
* **Queries:** `users` e `transfers` (requer autenticação JWT).
* **Mutations:** `registerUser`, `loginUser`, e `createTransfer` (requer autenticação JWT).

### Regras de Negócio Validadas nos Testes

* Não é permitido registrar usuários duplicados.
* Login exige usuário e senha válidos.
* Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
* O saldo inicial de cada usuário é de R$ 10.000,00.
