# OneAfrica Trade - Backend (MVP)

This folder contains the backend API for the OneAfrica Trade MVP. It's an Express.js + Mongoose app implementing core marketplace features (auth, products, orders, verification) designed for local development and as a starting point for production hardening.

Table of contents

- Features
- Quick start (local)
- Environment & configuration
- Running and debugging
- Testing
- Docker (local dev)
- CI / Deployment notes
- Production hardening checklist
- Contributing

## Features (implemented)

- Auth: register, login, email verification, refresh/revoke tokens, password reset
- Role-based access control: buyer / seller / admin
- Product CRUD: create / list / get / update / delete (with media upload pipeline)
- Orders: create, list, get, status updates
- Seller verification pipeline: create case, admin approve/reject
- Upload handling: multer memory uploads streamed to a storage service abstraction
- Basic validation (express-validator) and centralized error handling
- Dev helpers: `.env.example`, `.env.local.example`, `.gitignore`, API index (`GET /api`)

## Quick start (local)

1. Install dependencies

```powershell
cd c:\Users\ABENI\Documents\Web\Ecommence\backend
npm install
```

2. Prepare environment

```powershell
copy .env.example .env
# optionally copy .env.local.example .env.local for local overrides
```

Edit `.env` to set secrets for development. Defaults in `.env.example` are safe for local dev but not for production.

3. Start the server

```powershell
npm run dev
```

4. Smoke-check endpoints

```powershell
# Health
Invoke-RestMethod http://localhost:4000/health

# API index
Invoke-RestMethod http://localhost:4000/api
```

## Environment & configuration

Important environment variables (see `.env.example` and `.env.local.example`):

- `MONGODB_URI` - MongoDB connection string
- `PORT` - server port (default 4000)
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` - secrets for signing tokens
- `NODE_ENV` - `development` or `production`

Startup will warn if critical env vars are missing. Do not commit real secrets to git — use a secret manager in production.

## Running and debugging

- Development: `npm run dev` (nodemon) watches files and restarts on change.
- Logs: the app prints structured error logs with `requestId` (X-Request-Id). Use that ID to trace errors.
- Uploads: the upload pipeline streams files to the configured storage service. Configure credentials via environment variables.

## Testing

No tests are included yet. Recommended next steps:

- Add Jest and Supertest for unit and integration tests.
- Use `mongodb-memory-server` for fast DB-backed integration tests.
- Add GitHub Actions that run `npm ci` and `npm test` on PRs.

## Docker (local dev)

Create a `Dockerfile` and `docker-compose.yml` to run the app + local MongoDB for development. Example tasks to add:

- `docker-compose up --build` to bring up app + MongoDB
- Ensure `.env` values are supplied to containers via Compose or environment injection.

## CI / Deployment notes

- Add a CI workflow (GitHub Actions) to run lint, tests, and build a Docker image.
- Use migrations (migrate-mongo or similar) for DB schema changes.
- Provide health and readiness endpoints for orchestrators (Kubernetes) — `/health` exists; consider an additional readiness endpoint.

## Production hardening checklist

- Secrets: use a secret manager (Vault, AWS Secrets Manager, etc.).
- Logging: use structured JSON logger (pino/winston) and an error aggregation tool (Sentry).
- Security: add express-rate-limit, input sanitization (`express-mongo-sanitize`), file scanning for uploads, CSP and secure cookies for refresh tokens.
- Tokens: store only hashed refresh tokens, use httpOnly secure cookies for refresh tokens for browser clients.
- Observability: integrate OpenTelemetry, Prometheus metrics, and tracing.
- Scalability: move search to OpenSearch/Elasticsearch, add Redis + BullMQ for background jobs.

## Contributing

- Follow code style and add tests for new features.
- Use feature branches and open PRs against the `main` branch.

---

If you'd like, I can add a `Dockerfile` + `docker-compose.yml`, implement refresh-token hashing, and add a minimal Jest + Supertest smoke test suite next.
