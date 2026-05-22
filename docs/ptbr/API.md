# Contrato de API (expectativas do frontend)

O backend Nest.js deve expor os endpoints abaixo. Os formatos seguem `src/types/*`.

## Autenticação

Sem JWT. Use cookies de sessão (`withCredentials: true` no cliente).

### `POST /auth/login`

**Body**

```json
{
  "email": "ana@printflow.local",
  "password": "printflow123"
}
```

**Resposta `200`**

```json
{
  "user": {
    "id": 1,
    "name": "Ana Silva",
    "email": "ana@printflow.local"
  }
}
```

**Resposta `401`** — credenciais inválidas

### `POST /auth/logout`

**Resposta `204`**

## Pedidos

### `GET /orders`

Retorna todos os pedidos, do mais recente ao mais antigo.

**Resposta `200`** — `Order[]`

### `PATCH /orders/:id`

**Body** (parcial)

```json
{
  "status": "ready",
  "finalValue": "47.00"
}
```

**Resposta `200`** — `Order` atualizado

## Relatórios

### `GET /reports/sales?days=1|3|7`

**Resposta `200`**

```json
{
  "periodDays": 7,
  "totalOrders": 5,
  "totalRevenue": "564.20",
  "deliveredCount": 2,
  "pendingCount": 1
}
```

## Modelos de domínio

### User

| Campo | Tipo |
|-------|------|
| id | number |
| name | string |
| email | string |
| password | string |
| createdAt | datetime ISO |

### Order

| Campo | Tipo |
|-------|------|
| id | number |
| codigo | string (ex.: IMP-0482) |
| customerName | string |
| customerPhone | string |
| printType | `blackWhite` \| `colored` |
| copies | number |
| binding | boolean |
| observation | string |
| status | `pending` \| `printing` \| `ready` \| `delivered` |
| calculatedValue | string decimal |
| finalValue | string decimal |
| createdAt | datetime ISO |

### File

| Campo | Tipo |
|-------|------|
| id | number |
| orderId | number |
| originalName | string |
| mimeType | string |
| pageCountStatus | `exact` \| `estimated` \| `manual` |
| pageCount | number |
| createdAt | datetime ISO |

Os arquivos mock ficam em `src/mocks/files.json` para futuras telas de detalhe do pedido.
