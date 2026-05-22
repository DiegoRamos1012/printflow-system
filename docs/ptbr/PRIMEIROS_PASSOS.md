# Primeiros passos

## Requisitos

- Node.js 18+
- npm 9+

## Instalação

1. Clone o repositório e entre na pasta do projeto.
2. Copie o arquivo de ambiente:

   ```bash
   cp .env.example .env
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## Credenciais de demonstração

| E-mail | Senha |
|--------|-------|
| ana@printflow.local | printflow123 |
| carlos@printflow.local | printflow123 |

## Usando o sistema

### Login

Informe e-mail e senha. Use o ícone do olho para mostrar ou ocultar a senha.

### Pedidos

- Cada card exibe dados do cliente, opções de impressão, valor calculado e campos editáveis de status/valor final.
- Clique em **Salvar alterações** para persistir as mudanças.
- A lista é atualizada automaticamente a cada 15 segundos.

### Relatório

Alterne entre **1 dia**, **3 dias** e **7 dias** para ver totais de pedidos, receita, entregues e pendentes.

### Configurações

Ative o modo escuro e visualize o usuário logado.

### Sair

Use **Sair** na barra lateral a qualquer momento.

## Conectando à API real

1. Configure no `.env`:

   ```
   VITE_USE_MOCK=false
   VITE_API_URL=http://localhost:3000
   ```

2. Garanta que a API Nest.js implemente os endpoints descritos em [API.md](./API.md).
3. Habilite CORS com credenciais para a origem do Vite (`http://localhost:5173`).

## Executando os testes

```bash
npm run test
```

Os testes usam apenas o mock store; não é necessário subir o servidor.

## Build de produção

```bash
npm run build
npm run preview
```
