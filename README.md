# 🌿 Green Estoque Web

> Web application for inventory management of a solar panel store — built with Next.js, React, Tailwind CSS, and Redux Toolkit.

---

## 📋 Overview

**Green Estoque Web** is the front-end interface of the Green Estoque platform. Designed specifically for solar panel retail businesses, it provides a modern, responsive, and intuitive dashboard to manage the store's inventory and sales.

### Core Features

- **Interactive Dashboard** — Quick overview of stock levels, recent movements, and sales metrics via Recharts.
- **Product Management** — View, create, edit, and delete products (solar panels, inverters, structures).
- **Inventory Control** — Register entries and exits, keeping track of every unit.
- **Reports & Analytics** — Analyze best-selling items, stock by type, and timeline trends.
- **Secure Access** — Protected routes requiring user authentication before accessing data.

---

## 🛠️ Stack

### Code
| Layer | Technology |
|---|---|
| Framework | [Next.js v14/15](https://nextjs.org/) (App Router) |
| UI Library | [React](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| State Management & Data Fetching | [Redux Toolkit](https://redux-toolkit.js.org/) + RTK Query |
| Charts | [Recharts](https://recharts.org/) |

### Tests
| Tool | Purpose |
|---|---|
| [Jest](https://jestjs.io/) | Test runner and assertion library |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | Component testing |

> 🤖 **Agile Vibe Coding with Antigravity** — Development was accelerated with AI-assisted pair programming using [Antigravity](https://deepmind.google), enabling rapid iteration on features, tests, and architecture decisions.

### Infrastructure
| Tool | Details |
|---|---|
| [Vercel](https://vercel.com/) | Edge network deployment for Next.js applications |
| API Integration | Communicates with the [Green Estoque API](https://green-estoque-api.vercel.app/) |

---

## 🔒 Security

Security on the client-side follows best practices for single-page and server-side rendered applications:

- **JWT Authentication** — Connects to the back-end's Passport.js authentication strategy. Users login and receive a JWT.
- **Route Protection** — Unauthorized users are redirected to the login page via Next.js routing and middleware.
- **API Interceptors** — RTK Query automatically injects the `Authorization: Bearer <token>` header into outgoing requests to protected API endpoints.

---

## 🚀 How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [npm](https://www.npmjs.com/)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/your-org/green-estoque.git
cd green-estoque
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
# Create a .env.local file
cp .env.example .env.local
# Make sure NEXT_PUBLIC_API_URL points to the local backend (e.g., http://localhost:3001)
```

**4. Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests

```bash
# Run unit and component tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🌐 Production

The production front-end is deployed on **Vercel** and publicly accessible at:

```
https://green-estoque.vercel.app
```

> **Note:** The application integrates with the production backend API at `https://green-estoque-api.vercel.app`.

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, copy, modify, merge, publish, distribute, sublicense and/or sell copies of this software, provided that the original copyright notice and this permission notice are included in all copies or substantial portions of the software.

See the [LICENSE](./LICENSE) file for full details.
