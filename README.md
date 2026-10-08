# Elderly Pension Disbursement Tracker (Problem Statement 126)

A transparent, accessible web platform designed for elderly rural citizens and government officials to monitor pension disbursements, detect payment delays, automate reminders, and generate administrative reports.

---

## 🏛️ Project Architecture (Week 1)

### Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS (High-contrast accessibility tokens, large fonts, big touch targets)
- **Backend**: Node.js + Express (REST API with parameterized queries)
- **Database**: MySQL (`mysql2/promise` pool with resilient failover & cloud readiness)
- **Architecture**: ES6 domain classes directly mirroring the system class diagram

---

## 📐 ES6 Class Diagram & Relationships

| ES6 Class | Attributes | Key Methods | Description |
|---|---|---|---|
| **Beneficiary** | `beneficiaryId`, `name`, `age`, `address`, `phoneNo` | `register()`, `updateDetails()`, `viewStatus()` | Elderly citizen profile & status lookup |
| **Pension** | `pensionId`, `beneficiaryId`, `amount`, `frequency`, `startDate` | `createPension()`, `updatePension()` | Approved pension plan details |
| **Payment** | `paymentId`, `pensionId`, `amount`, `payDate`, `status` | `recordPayment()`, `updateStatus()` | Disbursement records & 7-day delay logic |
| **Verification** | `verificationId`, `beneficiaryId`, `verifiedBy`, `verifyDate`, `status` | `verify()`, `updateVerification()` | Administrative application verification |
| **Reminder** | `reminderId`, `beneficiaryId`, `message`, `reminderDate`, `status` | `createReminder()`, `markAsSent()` | In-app alert logs for verifications & disbursements |

### Relationships:
- `Beneficiary 1 — * Pension`
- `Pension 1 — * Payment`
- `Pension 1 — 1 Verification`
- `Beneficiary 1 — * Reminder`

---

## 🚀 How to Run the Project

### 1. Database Setup (MySQL)
Configure MySQL credentials in `server/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pension_db
DB_PORT=3306
```

Initialize tables and seed data:
```bash
npm run init-db
```

### 2. Start Backend Server
```bash
npm run server
# Running at http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### 3. Start Frontend Client
```bash
npm run client
# Accessible at http://localhost:3000
```
