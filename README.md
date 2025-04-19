
# 🛍️ X-Store

**X-Store** is a full-stack e-commerce web application that provides a seamless shopping experience with a clean UI and responsive design. The app is built using React (frontend) and Express.js (backend), connected with a mongoDb database.

![X-Wallet Banner](/public/image.png)


## 🌐 Live Demo

🔗 [x-store-nine.vercel.app](https://x-store-nine.vercel.app/)

---

## ⚙️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, mongoDb
- **Other Tools**: Axios, dotenv, ESLint, Vercel

---

## 🚀 Features

- 🛍️ Browse products with details and images
- 🧺 Add and manage items in the cart
- 📱 Responsive UI for all devices
- ⚡ Fast performance with Vite
- 🔐 Environment-based configuration for API URLs and secrets

---

## 📁 Project Structure

```
x-store/
├── frontend/        # React + Vite client
│   ├── .env         # Frontend environment variables
├── server/          # Express + mongoDb backend
│   ├── .env         # Backend environment variables
└── public/          # Shared static assets
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nikuunj/x-store.git
cd x-store
```

---

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

This will start the frontend on: [http://localhost:5173](http://localhost:5173)

---

### 3. Backend Setup

```bash
cd ../server
cp .env.example .env
npm install
npm run dev
```

This will start the backend API on the port defined in `.env` (default: `http://localhost:443`)

---

## 🔐 Environment Variables

### 📦 `/frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:443
```

> Update the `VITE_API_URL` if your backend runs on a different port or domain.

---

### 🛠 `/server/.env`

```env
MONGO_CONNECTION_STRING=
ADMIN_JWT_SECRET=
USER_JWT_SECRET=
PRODUCTION=development
SESSION_SECRET=
```

> Ensure your mongoDB database is running and credentials are correct.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/FeatureName`
3. Commit your changes: `git commit -m "Add FeatureName"`
4. Push to the branch: `git push origin feature/FeatureName`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE)

---

## 📬 Contact

Made with ❤️ by [Nikuunj](https://github.com/Nikuunj)
