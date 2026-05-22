# Getting started

## Requirements

- Node.js 18+
- npm 9+

## Installation

1. Clone the repository and enter the project folder.
2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

## Demo credentials

| Email | Password |
|-------|----------|
| ana@printflow.local | printflow123 |
| carlos@printflow.local | printflow123 |

## Using the app

### Login

Enter email and password. Use the eye icon to show or hide the password.

### Orders

- Each card shows customer data, print options, calculated value, and editable status/final value.
- Click **Salvar alterações** to persist changes.
- The list refreshes automatically every 15 seconds.

### Dashboard

Switch between **1 dia**, **3 dias**, and **7 dias** to view order count, revenue, delivered, and pending totals.

### Settings

Toggle dark mode and view the logged-in user.

### Logout

Use **Sair** in the sidebar at any time.

## Connecting to the real API

1. Set in `.env`:

   ```
   VITE_USE_MOCK=false
   VITE_API_URL=http://localhost:3000
   ```

2. Ensure the Nest.js API implements the endpoints in [API.md](./API.md).
3. Enable CORS with credentials for the Vite origin (`http://localhost:5173`).

## Running tests

```bash
npm run test
```

Tests use the mock store only; no server is required.

## Production build

```bash
npm run build
npm run preview
```
