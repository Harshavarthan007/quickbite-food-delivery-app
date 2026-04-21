# 🍔 QuickBite — Food Delivery Web Application

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/CSS3-Responsive-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Context_API-State_Mgmt-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
</p>

<p align="center">
  <b>QuickBite</b> is a modern, fully responsive food delivery web application built with React.js. <br/>
  Delivering a seamless ordering experience — from browsing menus to checkout — with a clean, intuitive UI.
</p>

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About the Project

QuickBite is a frontend-focused food delivery web application developed as part of a full-stack MERN development role. The application replicates the core user experience of modern food delivery platforms, providing customers with a smooth, fast, and visually appealing interface.

The project emphasizes:

- **Component-based architecture** using React.js
- **State management** using Context API / Redux
- **Responsive UI** optimized for mobile, tablet, and desktop
- **RESTful API integration** with a Node.js/Express backend
- **Authentication flows** (Login / Register)
- **Dynamic cart and order management**

---

## 🌐 Live Demo

> 🔗 **[View Live Application](https://your-deployment-url.vercel.app)**  
> _(Deploy link — update after deployment to Vercel/Netlify)_

---

## ✨ Features

### 👤 User Features

- 🔐 **User Authentication** — Secure Login & Registration with JWT
- 🏠 **Home Page** — Hero banner, featured categories, top-rated restaurants
- 🍽️ **Food Menu** — Browse food items with filters (category, price, rating)
- 🔍 **Search Functionality** — Real-time food search
- 🛒 **Shopping Cart** — Add, remove, update quantities with live total
- 💳 **Checkout Flow** — Delivery address form and order summary
- 📦 **Order Tracking** — View current order status
- 👤 **User Profile** — View and manage account details

### 🎨 UI/UX Features

- ✅ Fully **responsive design** (Mobile-first approach)
- ✅ Smooth **page transitions and animations**
- ✅ **Loading skeletons** for better perceived performance
- ✅ **Toast notifications** for user feedback
- ✅ **Dark/Light mode** support _(if applicable)_

---

## 🛠️ Tech Stack

| Layer                  | Technology                        |
| ---------------------- | --------------------------------- |
| **Frontend Framework** | React.js 18.x                     |
| **Build Tool**         | Vite                              |
| **Routing**            | React Router DOM v6               |
| **State Management**   | Context API / Redux Toolkit       |
| **Styling**            | CSS3 / CSS Modules / Tailwind CSS |
| **HTTP Client**        | Axios                             |
| **Icons**              | React Icons                       |
| **Notifications**      | React Toastify                    |
| **Version Control**    | Git & GitHub                      |

---

## 📁 Project Structure

```
quickbite-food-delivery-app/
├── public/
│   └── assets/              # Static assets (images, icons)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── FoodCard/
│   │   ├── Cart/
│   │   └── ...
│   ├── pages/               # Page-level components
│   │   ├── Home/
│   │   ├── Menu/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Login/
│   │   └── MyOrders/
│   ├── context/             # React Context (global state)
│   ├── hooks/               # Custom React Hooks
│   ├── services/            # API calls (Axios services)
│   ├── assets/              # Images and static media
│   ├── App.jsx              # Root component with routing
│   └── main.jsx             # React DOM entry point
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** >= 16.x
- **npm** >= 8.x or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Harshavarthan007/quickbite-food-delivery-app.git

# 2. Navigate to the project directory
cd quickbite-food-delivery-app

# 3. Install dependencies
npm install

# 4. Create environment variables file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=QuickBite
```

### Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> The app will run at **http://localhost:5173**

---

## 📸 Screenshots

| Page          | Preview                                 |
| ------------- | --------------------------------------- |
| **Home**      | Hero section with restaurant categories |
| **Menu**      | Food items with search & filter         |
| **Cart**      | Item summary with quantity control      |
| **Checkout**  | Address & payment form                  |
| **My Orders** | Order history & tracking                |

---

## 🔗 API Integration

QuickBite frontend integrates with a RESTful backend API. Key endpoints consumed:

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| `POST` | `/api/user/register`    | Register new user       |
| `POST` | `/api/user/login`       | User login, returns JWT |
| `GET`  | `/api/food/list`        | Fetch all food items    |
| `POST` | `/api/cart/add`         | Add item to cart        |
| `POST` | `/api/order/place`      | Place a new order       |
| `GET`  | `/api/order/userorders` | Fetch user's orders     |

> ⚙️ Backend is built with **Node.js**, **Express.js**, and **MongoDB** (Full MERN Stack)

---

## 🤝 Contributing
