# Dance School Booking API

A small **serverless TypeScript REST API** for a Sydney-based dance school.  
It follows **Clean Architecture principles**, runs on **AWS Lambda** (via Serverless Framework),  
and can run fully **offline** using SQLite and Prisma.

---

## Features

- Search & filter weekly dance classes (Salsa, Bachata, Reggaeton)
- View class details & remaining spots  
- Book a class by email (prevents duplicates & overbooking)
- TypeScript + Prisma ORM + Serverless Framework  
- Runs offline (`serverless-offline`)  
- Clean Architecture layering (Presentation / Application / Domain / Infrastructure)
- Unit tests using **Vitest** with in-memory repositories

---

## Architecture Overview

```
src/
├─ presentation/         → AWS Lambda handlers (HTTP)
│   └─ http/
│       ├─ handlers/     → Entry points (classesHandler.ts, bookingsHandler.ts)
│       ├─ httpResponses.ts
│       ├─ requestParsers.ts
│       └─ errorHttpMapper.ts
│
├─ application/          → Business logic (use cases)
│   ├─ services/         → BookingService, ClassQueryService
│   └─ dtos/             → DTOs for data transfer
│
├─ domain/               → Core rules, entities, errors, repository interfaces
│
├─ infrastructure/       → External adapters (Prisma repositories)
│   └─ prisma/
│       ├─ client.ts
│       ├─ ClassRepositoryPrisma.ts
│       └─ BookingRepositoryPrisma.ts
│
└─ config/
    └─ factory.ts        → Dependency wiring (DI)
```

**Dependency rule:**  
`presentation → application → domain`  
and only `infrastructure` depends outward (on Prisma/DB).

---

## Clean Architecture Layers

| Layer | Purpose | Knows About |
|-------|----------|-------------|
| **Presentation** | Lambda handlers, HTTP responses | Application |
| **Application** | Business logic, use cases | Domain |
| **Domain** | Entities, rules, repository interfaces | (None) |
| **Infrastructure** | Prisma, DB adapters | Domain |

---

## Tech Stack

| Area | Tool |
|------|------|
| Language | TypeScript |
| Framework | Serverless Framework |
| Runtime | Node.js 20.x |
| ORM | Prisma |
| DB (local) | SQLite |
| Cloud Ready | AWS Lambda, API Gateway |
| Tests | Vitest |
| Offline | serverless-offline |

---

## Setup & Local Run

### 1 Clone & install
```bash
git clone https://github.com/suravi999/dance-school-booking-api/.git
cd dance-school-booking-api
npm install
```

### 2 Initialize database
```bash
npx prisma generate
npx prisma db push
```

### 3 Seed sample data
```bash
npm run seed
```

### 4 Run locally
```bash
npm run build
npx serverless offline
```

Serverless Offline will start at:  
http://localhost:3000

---

## Example API Calls

### Get all classes
```bash
curl http://localhost:3000/classes
```

### Filter by type
```bash
curl http://localhost:3000/classes?type=salsa
```

### Book a class
```bash
curl -X POST http://localhost:3000/classes/1/book   -H 'Content-Type: application/json'   -d '{"email":"john@example.com"}'
```

---

## Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Class {
  id        Int       @id @default(autoincrement())
  type      String
  level     Int?
  dayOfWeek DateTime
  startTime String
  maxSpots  Int       @default(20)
  bookings  Booking[]
}

model Booking {
  id        Int      @id @default(autoincrement())
  email     String
  classId   Int
  createdAt DateTime @default(now())
  Class     Class    @relation(fields: [classId], references: [id])
  @@unique([email, classId])
}
```

---

## Testing

### Run unit tests
```bash
npm run test
```

### Test coverage
The unit tests focus on:
- `BookingService` → rules: duplicate prevention, capacity check, email validation  
- `ClassQueryService` → class listing, filtering, DTO mapping

Test doubles live under `tests/doubles/`.

---

## Design Choices

- **Clean Architecture:** clear separation of layers and dependency direction.  
- **Dependency Injection:** configured in `config/factory.ts`.  
- **Persistence Abstraction:** domain uses interfaces; infrastructure implements them via Prisma.  
- **Scalability:** ready to switch SQLite → DynamoDB/PostgreSQL with no domain/app change.  
- **Serverless-first:** deployable to AWS Lambda + API Gateway or run offline.

---

## Future Improvements

- Add class cancellations & waitlist  
- Add payments & confirmation emails  
- Add authentication layer (JWT/email OTP) 
- Extend schedule to recurring 4-week calendar  
- Implement caching (Redis/DynamoDB DAX)

---

## Author

**Suravi Pubudu**  
Full Stack / Technical Lead (.NET, Node.js, React, AWS, Shopify)  
📍 Adelaide, South Australia
