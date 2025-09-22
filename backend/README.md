# OneAfrica Trade - Backend (MVP scaffold)

This repository contains a starter Express.js + Mongoose backend scaffold implementing core models and REST endpoints based on the SRS (MVP scope).

Features included:

- Auth (email/password) with JWT access & refresh tokens
- Basic models: User, SellerProfile, Product, Order, VerificationCase, Review, MessageThread, PremiumSubscription, AuditLog
- Routes/controllers for auth, products, orders, verification
- Input validation middleware using express-validator
- Error handling middleware

Quick start

1. Copy `.env.example` to `.env` and set values (MongoDB URI, JWT secrets).
2. Install dependencies:

```powershell
cd backend
npm install
```

3. Start the server in dev mode:

```powershell
npm run dev
```

The server will run on the port specified in `.env` (default 4000).

Next steps / Recommendations

- Add tests (unit + integration) for core flows
- Implement file uploads to S3-compatible storage and secure doc redaction
- Add search (OpenSearch/Elasticsearch)
- Implement payment adapter stub and webhook handlers
- Add admin dashboards, analytics, and background job processing (BullMQ/Redis)
