# API contract (frontend expectations)

The Nest.js backend should expose the following endpoints. Shapes match `src/types/*`.

## Authentication

No JWT. Use session cookies (`withCredentials: true` on the client).

### `POST /auth/login`

**Body**

```json
{
  "email": "ana@printflow.local",
  "password": "printflow123"
}
```

**Response `200`**

```json
{
  "user": {
    "id": 1,
    "name": "Ana Silva",
    "email": "ana@printflow.local"
  }
}
```

**Response `401`** — invalid credentials

### `POST /auth/logout`

**Response `204`**

## Orders

### `GET /orders`

Returns all orders, newest first.

**Response `200`** — `Order[]`

### `PATCH /orders/:id`

**Body** (partial)

```json
{
  "status": "ready",
  "finalValue": "47.00"
}
```

**Response `200`** — updated `Order`

## Reports

### `GET /reports/sales?days=1|3|7`

**Response `200`**

```json
{
  "periodDays": 7,
  "totalOrders": 5,
  "totalRevenue": "564.20",
  "deliveredCount": 2,
  "pendingCount": 1
}
```

## Domain models

### User

| Field | Type |
|-------|------|
| id | number |
| name | string |
| email | string |
| password | string |
| createdAt | ISO datetime |

### Order

| Field | Type |
|-------|------|
| id | number |
| codigo | string (e.g. IMP-0482) |
| customerName | string |
| customerPhone | string |
| printType | `blackWhite` \| `colored` |
| copies | number |
| binding | boolean |
| observation | string |
| status | `pending` \| `printing` \| `ready` \| `delivered` |
| calculatedValue | decimal string |
| finalValue | decimal string |
| createdAt | ISO datetime |

### File

| Field | Type |
|-------|------|
| id | number |
| orderId | number |
| originalName | string |
| mimeType | string |
| pageCountStatus | `exact` \| `estimated` \| `manual` |
| pageCount | number |
| createdAt | ISO datetime |

Mock files live in `src/mocks/files.json` for future order detail views.
