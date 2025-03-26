# 🛡️ Next.js 13 Google OAuth Starter Template

A clean, full-stack authentication template built with **Next.js 13 App Router**, **Google OAuth**, and **TypeScript**. Designed to help developers quickly launch MVPs, dashboards, or social apps with built-in auth and modern project structure.

---

## 🚀 Features

- ✅ **Google OAuth** via "next-auth"
- 🔐 Role-based access control (admin/user)
- 📁 Modern folder layout using **App Router**
- 🔒 Protected routes & middleware-based access
- 🧠 Type-safe API routes
- 🌈 Tailwind CSS for styling
- 🧱 Modular components & utility-first design
- ⚙️ Environment variable config for secrets

---

## 🔧 Tech Stack

- **Next.js 13** (App Router)
- **TypeScript**
- **NextAuth.js**
- **Tailwind CSS**
- **Prisma** (optional for DB integration)
- **ESLint + Prettier** (code quality)
- **Vercel-ready** deployment setup

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/SteliosMav/nextjs13-template-auth
cd nextjs13-template-auth
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
```

### 4. Run the app
```bash
npm run dev
```
Open [localhost:3000](http://localhost:3000)

---

## 🔐 Auth Flow
- Google OAuth handled via next-auth
- Middleware protects dashboard & private routes
- Session persisted via cookies (JWT strategy)

---

## 🤝 Contributing
Pull requests and feedback are welcome! If you use this template, feel free to share your project or improvements.

---

## 👨‍💻 Author
**Stylianos Mavrokoukoulakis**  
[LinkedIn](https://www.linkedin.com/stylianos-mavrokoukoulakis) • [GitHub](https://github.com/SteliosMav)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
