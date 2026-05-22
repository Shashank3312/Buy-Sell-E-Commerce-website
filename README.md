# 🛒 Buy & Sell — Full-Stack E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A full-stack **Buy & Sell** e-commerce web application where users can sign up, list items for sale, browse and search products by category, add items to their cart, place orders with **OTP-based verification**, and track deliveries — all secured with **JWT authentication** and **bcrypt password hashing**.

---

## 📑 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Frontend Pages & Components](#-frontend-pages--components)
- [Backend File Documentation](#-backend-file-documentation)
- [Frontend File Documentation](#-frontend-file-documentation)
- [Development Timeline](#-development-timeline)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **User Authentication** | Secure signup/login with bcrypt password hashing and JWT token-based sessions (10-day expiry) |
| **IIIT Email Validation** | Registration restricted to `@iiit.ac.in` institutional email addresses |
| **Profile Management** | View and edit user profile (first name, last name, age, contact number, password) |
| **Item Listing** | Sellers can list items with name, description, price, and category |
| **Category Filtering** | Browse items with real-time search and multi-category checkbox filters |
| **Shopping Cart** | Add/remove items from cart with live total calculation |
| **Order Placement** | Place orders with automatic 4-digit OTP generation for secure delivery |
| **OTP Delivery Verification** | Sellers verify delivery by entering the buyer's OTP — hashed with bcrypt for security |
| **Order Tracking** | Track pending orders, completed orders, and sold items with seller name resolution |
| **Self-Purchase Prevention** | Users cannot add their own listed items to their cart |
| **Protected Routes** | All authenticated pages redirect to login if no valid JWT token exists |

---

## 🏗 Architecture

```
┌─────────────────┐         HTTP/REST         ┌─────────────────┐
│                 │  ◄──────────────────────►  │                 │
│   React Client  │      (Axios + JWT)        │  Express Server │
│   (Vite Dev)    │                           │   (Port 8081)   │
│   Port 5173     │                           │                 │
└─────────────────┘                           └────────┬────────┘
                                                       │
                                                       │ Mongoose ODM
                                                       │
                                              ┌────────▼────────┐
                                              │                 │
                                              │  MongoDB Atlas  │
                                              │   (Cloud DB)    │
                                              │                 │
                                              └─────────────────┘
```

**Data Flow:**

1. User interacts with the **React frontend** (SPA with client-side routing)
2. Frontend sends HTTP requests via **Axios** with JWT Bearer token in headers
3. **Express backend** validates the JWT, processes the request, and queries **MongoDB**
4. MongoDB returns data through **Mongoose** models back to the client

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | Component-based UI library |
| **Vite** | 6.0.5 | Fast build tool and dev server with HMR |
| **React Router DOM** | 7.1.5 | Client-side routing with protected routes |
| **Axios** | 1.7.9 | HTTP client for API calls |
| **React Toastify** | 11.0.3 | Toast notification support |
| **ESLint** | 9.17.0 | Code linting with React-specific rules |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Express** | 4.21.2 | Node.js web framework for REST API |
| **Mongoose** | 8.9.6 | MongoDB ODM for schema-based modeling |
| **bcrypt** | 5.1.1 | Password hashing (salt rounds: 10) |
| **jsonwebtoken** | 9.0.2 | JWT generation and verification |
| **Joi** | 17.13.3 | Request validation schemas |
| **dotenv** | 16.4.7 | Environment variable management |
| **cors** | 2.8.5 | Cross-Origin Resource Sharing |
| **body-parser** | 1.20.3 | JSON request body parsing |
| **nodemon** | 3.1.9 | Auto-restart server on file changes |

### Database
| Technology | Purpose |
|------------|---------|
| **MongoDB Atlas** | Cloud-hosted NoSQL database |

---

## 📁 Project Structure

```
Buy-Sell-E-Commerce-website/
├── .gitignore                          # Root gitignore (node_modules, .env, dist)
├── README.md                           # This documentation file
│
├── backend/                            # Express.js REST API server
│   ├── index.js                        # Server entry point — Express app setup & middleware
│   ├── db.js                           # MongoDB connection via Mongoose
│   ├── package.json                    # Backend dependencies and scripts
│   ├── .env.example                    # Environment variable template
│   ├── routes/
│   │   └── routes.js                   # All API route handlers (auth, items, cart, orders, delivery)
│   └── schemas/
│       ├── users.js                    # User model — profile, cart, reviews
│       ├── items.js                    # Item model — name, price, category, seller
│       └── orders.js                   # Order model — transaction, OTP, status
│
└── frontend/                           # React + Vite SPA
    ├── index.html                      # HTML entry point
    ├── package.json                    # Frontend dependencies and scripts
    ├── vite.config.js                  # Vite configuration with React plugin
    ├── eslint.config.js                # ESLint flat config for React 18
    ├── .gitignore                      # Frontend-specific gitignore
    └── src/
        ├── main.jsx                    # App entry — React Router with protected routes
        ├── index.css                   # Global styles (navbar, body reset)
        └── components/
            ├── Header.jsx              # Static header banner for auth pages
            ├── Navbar.jsx              # Navigation bar with links and logout
            ├── Login.jsx               # Login form with JWT token storage
            ├── Signup.jsx              # Registration form with IIIT email validation
            ├── Home.jsx                # User profile view/edit page
            ├── Itemspage.jsx           # Item listing with search + category filters
            ├── Item.jsx                # Single item detail with add-to-cart
            ├── sell.jsx                # Sell/Add new item form
            ├── Mycart.jsx              # Shopping cart with order placement
            ├── Orders.jsx              # Order history (pending/completed/sold)
            └── Delivery.jsx            # OTP-based delivery verification
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **npm** ≥ 9.x (comes with Node.js)
- **MongoDB Atlas** account — [Sign up free](https://www.mongodb.com/atlas)
- **Git** — [Download](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Shashank3312/Buy-Sell-E-Commerce-website.git
cd Buy-Sell-E-Commerce-website
```

**2. Set up the Backend**

```bash
cd backend
npm install
```

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB Atlas connection string:

```env
PORT=8081
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.xxxxx.mongodb.net/BuySell?retryWrites=true&w=majority&appName=Cluster0
```

Start the backend server:

```bash
npm start
```

> The server will run on `http://localhost:8081` with nodemon watching for changes.

**3. Set up the Frontend**

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

> The Vite dev server will start at `http://localhost:5173` with Hot Module Replacement.

**4. Open the app**

Navigate to `http://localhost:5173` in your browser. You'll be redirected to the login page.

---

## 🔐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `8081` | Express server port |
| `MONGO_URI` | **Yes** | — | MongoDB Atlas connection string |

> ⚠️ **Never commit the `.env` file.** The `.gitignore` is configured to exclude it. Use `.env.example` as a reference.

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/signup` | ❌ | Register a new user with hashed password |
| `POST` | `/login` | ❌ | Authenticate user and return JWT token |

### User Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `PUT` | `/home` | ✅ JWT | Update authenticated user's profile |

### Items

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/items` | ❌ | Fetch all listed items |
| `GET` | `/items/:id` | ❌ | Fetch single item with seller info |
| `POST` | `/additem` | ✅ JWT | List a new item for sale |

### Cart Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/Mycart` | ✅ JWT | Add item to authenticated user's cart |
| `POST` | `/removeFromCart` | ✅ JWT | Remove item from cart by item ID |
| `POST` | `/getCartItems` | ✅ JWT | Fetch all items in user's cart |

### Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/placeOrder` | ✅ JWT | Place order for cart items, generates OTP |
| `POST` | `/pendingOrders` | ✅ JWT | Get user's pending (bought) orders |
| `POST` | `/completedOrders` | ✅ JWT | Get user's completed (bought) orders |
| `POST` | `/soldItems` | ✅ JWT | Get user's completed (sold) orders |
| `POST` | `/pendingSoldItems` | ✅ JWT | Get user's pending (sold) orders |

### Delivery

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/deliverOrder` | ✅ JWT | Verify OTP and mark order as completed |

### Utility

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/getFirstName` | ❌ | Get user's first name by user ID |

---

## 🖥 Frontend Pages & Components

### Page Routing Map

| Path | Component | Auth Required | Description |
|------|-----------|---------------|-------------|
| `/` | — | ❌ | Redirects to `/login` |
| `/login` | `Login` | ❌ | User login page |
| `/signup` | `Signup` | ❌ | User registration page |
| `/home` | `Navbar` + `Home` | ✅ | User profile dashboard |
| `/Items` | `Navbar` + `Itemspage` | ✅ | Browse and search items |
| `/item/:itemId` | `Navbar` + `Item` | ✅ | Single item detail page |
| `/sell` | `Navbar` + `Sell` | ✅ | Add new item form |
| `/Mycart` | `Navbar` + `Mycart` | ✅ | Shopping cart page |
| `/Orders` | `Navbar` + `Orders` | ✅ | Order history page |
| `/Delivery` | `Navbar` + `Delivery` | ✅ | OTP delivery verification |

### Component Details

| Component | File | Purpose | Key State Variables |
|-----------|------|---------|---------------------|
| `Header` | `Header.jsx` | Static branded header for login/signup pages | — |
| `Navbar` | `Navbar.jsx` | Navigation bar with route links and logout button | — |
| `Login` | `Login.jsx` | Email/password login form; stores JWT in localStorage | `formData` |
| `Signup` | `Signup.jsx` | Registration with IIIT email, age, phone validation | `formData` |
| `Home` | `Home.jsx` | Profile view with toggle edit form | `showForm`, `formData` |
| `ItemsPage` | `Itemspage.jsx` | Item grid with search bar and category checkboxes | `items`, `filteredItems`, `search`, `selectedCategories`, `showFilters` |
| `ItemPage` | `Item.jsx` | Single item detail card with seller info | `item`, `seller` |
| `AddItemForm` | `sell.jsx` | Form to list new items (name, desc, price, category) | `formData`, `message` |
| `MyCart` | `Mycart.jsx` | Cart items grid with remove, total, and place order | `cart`, `orderSuccess` |
| `Orders` | `Orders.jsx` | Tabbed order view (pending/completed/sold) | `orders`, `completedOrders`, `soldOrders`, `sellerNames` |
| `Delivery` | `Delivery.jsx` | OTP input form for each pending sold order | `otp`, `pendingSoldOrders`, `selectedOrderId` |

---

## 📄 Backend File Documentation

### `backend/index.js` — Server Entry Point

Sets up the Express application with middleware and starts the HTTP server.

**Key operations:**
- Loads environment variables via `dotenv.config()`
- Initializes MongoDB connection by requiring `./db`
- Configures `body-parser` for JSON request parsing
- Enables CORS for cross-origin frontend requests
- Mounts all routes at the root path (`/`)
- Listens on `PORT` (default: 8081)

---

### `backend/db.js` — Database Connection

Establishes the MongoDB connection using Mongoose.

**Key operations:**
- Reads `MONGO_URI` from environment variables
- Calls `mongoose.connect(url)` with a promise chain
- Logs success/failure messages to the console

---

### `backend/schemas/users.js` — User Model

Defines the `Users` Mongoose schema with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstName` | String | ✅ | User's first name |
| `lastName` | String | ✅ | User's last name |
| `email` | String | ✅ (unique) | User's email address |
| `age` | Number | ✅ | User's age |
| `contactNumber` | String | ✅ | 10-digit phone number |
| `password` | String | ✅ | bcrypt-hashed password |
| `cartItems` | [ObjectId] | ❌ | References to `Items` collection |
| `sellerReviews` | [String] | ❌ | Array of review strings |

---

### `backend/schemas/items.js` — Item Model

Defines the `Items` Mongoose schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Name` | String | ✅ | Item display name |
| `Price` | Number | ✅ | Item price in USD |
| `Description` | String | ✅ | Item description text |
| `category` | String | ✅ | One of: `clothing`, `grocery`, `electronics`, `furniture`, `books`, `sports`, `others` |
| `SellerID` | ObjectId | ❌ | Reference to the seller in `Users` |

---

### `backend/schemas/orders.js` — Order Model

Defines the `Orders` Mongoose schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `transactionID` | String | ✅ | Unique transaction identifier (generated ObjectId) |
| `buyerID` | ObjectId | ❌ | Reference to the buyer in `Users` |
| `sellerID` | ObjectId | ❌ | Reference to the seller in `Users` |
| `amount` | Number | ✅ | Order amount (item price) |
| `hashedOTP` | String | ✅ | bcrypt-hashed 4-digit OTP for delivery |
| `status` | String | ✅ | Order status: `Pending` or `Completed` |

---

### `backend/routes/routes.js` — API Route Handlers

Contains all 15 route handlers organized by feature:

#### Authentication Routes

| Handler | Method | Path | Description |
|---------|--------|------|-------------|
| **Login** | `POST` | `/login` | Validates email/password, returns JWT (10-day expiry) and user data |
| **Signup** | `POST` | `/signup` | Creates new user with bcrypt-hashed password (salt rounds: 10) |

#### Profile Routes

| Handler | Method | Path | Description |
|---------|--------|------|-------------|
| **Update Profile** | `PUT` | `/home` | JWT-protected; updates user fields, optionally re-hashes password |

#### Item Routes

| Handler | Method | Path | Description |
|---------|--------|------|-------------|
| **Get All Items** | `GET` | `/items` | Returns all items from the database |
| **Get Item by ID** | `GET` | `/items/:id` | Returns item details with seller information |
| **Add Item** | `POST` | `/additem` | JWT-protected; creates new item linked to seller's user ID |

#### Cart Routes

| Handler | Method | Path | Description |
|---------|--------|------|-------------|
| **Add to Cart** | `POST` | `/Mycart` | Pushes item ObjectId to user's `cartItems` array |
| **Remove from Cart** | `POST` | `/removeFromCart` | Filters out the item ObjectId from `cartItems` |
| **Get Cart Items** | `POST` | `/getCartItems` | Populates and returns full item details for cart |

#### Order Routes

| Handler | Method | Path | Description |
|---------|--------|------|-------------|
| **Place Order** | `POST` | `/placeOrder` | Generates 4-digit OTP, hashes it, creates order documents for each cart item |
| **Pending Orders** | `POST` | `/pendingOrders` | Returns buyer's orders with status `Pending` |
| **Completed Orders** | `POST` | `/completedOrders` | Returns buyer's orders with status `Completed` |
| **Sold Items** | `POST` | `/soldItems` | Returns seller's orders with status `Completed` |
| **Pending Sold Items** | `POST` | `/pendingSoldItems` | Returns seller's orders with status `Pending` |

#### Delivery Routes

| Handler | Method | Path | Description |
|---------|--------|------|-------------|
| **Deliver Order** | `POST` | `/deliverOrder` | Compares OTP with hashed value, marks order as `Completed` |

#### Utility Routes

| Handler | Method | Path | Description |
|---------|--------|------|-------------|
| **Get First Name** | `POST` | `/getFirstName` | Returns user's first name by MongoDB ObjectId |

---

## 🖥 Frontend File Documentation

### `frontend/src/main.jsx` — Application Entry Point

**Purpose:** Bootstraps the React application with routing.

**Key methods/features:**
- `createRoot()` — Mounts React to the `#root` DOM element
- `BrowserRouter` + `Routes` — Client-side navigation
- `Navigate` — Redirects unauthenticated users to `/login`
- **Auth Guard Pattern:** Each protected route checks `localStorage.getItem('token')` — if no token exists, redirects to login
- Wraps authenticated routes with `<Navbar />` for consistent navigation

---

### `frontend/src/index.css` — Global Stylesheet

**Purpose:** Defines base styles for the application.

**Styles defined:**
- `body` — Zero margin, Arial font family
- `.navbar`, `.navbar-list`, `.navbar-item` — Flexbox navbar layout with hover effects
- Dark background (`#333`) with white text and interactive hover states

---

### `frontend/src/components/Header.jsx`

**Purpose:** Static branded header for unauthenticated pages (Login, Signup).

**Renders:** A crimson (`#990011`) banner with "Buy Sell" text at 30px bold.

---

### `frontend/src/components/Navbar.jsx`

**Purpose:** Navigation bar for authenticated pages.

**Key features:**
- Brand logo on the left, navigation links on the right
- Links: Home, Items Page, My Cart, Sell Items, Orders Page, Delivery Page
- `logout()` function — removes JWT token from localStorage and redirects to root

---

### `frontend/src/components/Login.jsx`

**Purpose:** User login form.

**State:** `formData` — `{ email, password }`

**Key methods:**
- `handleChange(e)` — Updates form state on input change
- `handleSubmit(e)` — Sends POST to `/login`, stores JWT token and user data in localStorage, redirects to `/home`

---

### `frontend/src/components/Signup.jsx`

**Purpose:** User registration form with client-side validation.

**State:** `formData` — `{ firstName, lastName, email, age, contactNumber, password, cartItems, sellerReviews }`

**Key methods:**
- `validateForm()` — Validates:
  - All fields non-empty
  - Valid email format (regex)
  - Email ends with `iiit.ac.in`
  - Age is a positive number
  - Contact number is exactly 10 digits
  - Password ≥ 3 characters
- `handleSubmit(e)` — Posts to `/signup` after validation

---

### `frontend/src/components/Home.jsx`

**Purpose:** User profile dashboard with view/edit toggle.

**State:** `showForm` (boolean), `formData` (user fields)

**Key methods:**
- `toggleForm()` — Switches between profile view and edit mode
- `handleSubmit(e)` — Sends PUT to `/home` with JWT header, updates localStorage on success

---

### `frontend/src/components/Itemspage.jsx`

**Purpose:** Product listing page with search and filtering.

**State:** `items`, `filteredItems`, `search`, `showFilters`, `selectedCategories` (Set), `loading`, `error`

**Key methods:**
- `fetchItems()` (useEffect) — Loads all items on mount via GET `/items`
- `handleSearchChange(e)` — Updates search query
- `handleCategoryChange(category)` — Toggles category in/out of the Set
- `filterItems()` — Applies search text + category filters to produce `filteredItems`

**Categories:** clothing, grocery, electronics, furniture, books, sports, others

---

### `frontend/src/components/Item.jsx`

**Purpose:** Single item detail page (accessed via `/item/:itemId`).

**State:** `item`, `seller`, `loading`, `error`

**Key methods:**
- `fetchItem()` (useEffect) — Loads item + seller via GET `/items/:id`
- `AddtoCart()` — Prevents self-purchase, then POST `/Mycart` with item data

---

### `frontend/src/components/sell.jsx`

**Purpose:** Form to list a new item for sale.

**State:** `formData` — `{ name, description, price, category }`, `message`

**Key methods:**
- `handleSubmit(e)` — POST to `/additem` with JWT auth header
- Displays success/error message below the form

---

### `frontend/src/components/Mycart.jsx`

**Purpose:** Shopping cart page with order placement.

**State:** `cart` (array), `loading`, `error`, `orderSuccess`

**Key methods:**
- `fetchCart()` (useEffect) — POST to `/getCartItems` to load cart
- `handleRemove(itemId)` — POST to `/removeFromCart`, filters item from local state
- `handlePlaceOrder()` — POST to `/placeOrder`, displays OTP in alert, clears cart on success
- `calculateTotal()` — Reduces cart to sum of prices with 2 decimal places

---

### `frontend/src/components/Orders.jsx`

**Purpose:** Order history dashboard with 3 toggleable sections.

**State:** `orders`, `completedOrders`, `soldOrders`, `sellerNames` (cache), `showPending`, `showCompleted`, `showSold`

**Key methods:**
- Three `useEffect` hooks fetch pending, completed, and sold orders in parallel
- `getFirstName(id)` — POST to `/getFirstName` to resolve seller IDs to names
- `fetchSellerNames()` (useEffect) — Batch-resolves seller names using Promise.all
- `handleCheckboxChange(e)` — Toggles visibility of each order section

---

### `frontend/src/components/Delivery.jsx`

**Purpose:** OTP-based delivery verification for sellers.

**State:** `otp`, `pendingSoldOrders`, `selectedOrderId`

**Key methods:**
- `getPendingSoldOrders()` (useEffect) — Fetches seller's pending orders
- `handleOtpChange(e)` — Updates OTP input value
- `handleOtpSubmit(orderId)` — POST to `/deliverOrder` with OTP, removes completed order from list

---

## 📅 Development Timeline

| Date | Focus | Commit | Summary |
|------|-------|--------|---------|
| **May 12, 2026** | Backend Setup | `feat: initialize Express server with MongoDB connection and Mongoose schemas` | Set up the Express server with dotenv, cors, and body-parser middleware. Created Mongoose schemas for Users (with cart and reviews), Items (with category enum), and Orders (with hashed OTP). Configured MongoDB Atlas connection using environment variables. |
| **May 14, 2026** | API Routes | `feat: add authentication, item CRUD, cart, and order management API routes` | Implemented JWT-based login/signup, profile update, item listing and detail endpoints, full cart management (add/remove/get), order placement with auto-generated 4-digit OTP, and the add-item endpoint for sellers. |
| **May 16, 2026** | Delivery System | `feat: implement OTP-based delivery verification and seller order tracking endpoints` | Added OTP-based delivery verification (bcrypt compare), pending/completed order tracking for both buyers and sellers, sold items history, and a helper endpoint for resolving user IDs to names. |
| **May 20, 2026** | React Frontend | `feat: scaffold React frontend with Vite, routing, auth pages, and item browsing UI` | Built the complete React SPA with Vite. Implemented protected routing, login/signup with validation, profile management, item browsing with search and category filters, item detail with add-to-cart, shopping cart with order placement, order history with three toggleable views, and OTP delivery verification UI. |
| **May 22, 2026** | Documentation | `docs: add comprehensive README with project architecture, setup guide, and API documentation` | Created this README with full project documentation including architecture overview, tech stack details, file-by-file documentation, API reference, component documentation, and setup instructions. |

---

## 📸 Screenshots

> Screenshots will be added after deployment. The application features:
> - Clean login/signup pages with form validation
> - Responsive item grid with search and category filters
> - Shopping cart with total calculation
> - Order tracking dashboard with tabbed views
> - OTP delivery verification interface

---

## 🔮 Future Enhancements

- [ ] **Image Upload** — Add item images using Multer + Cloudinary
- [ ] **Payment Integration** — Integrate Razorpay/Stripe for real payments
- [ ] **Seller Reviews** — Allow buyers to rate and review sellers
- [ ] **Email Notifications** — Send OTP via email using Nodemailer
- [ ] **Responsive Design** — Full mobile-responsive UI with media queries
- [ ] **Search Autocomplete** — Debounced search with dropdown suggestions
- [ ] **Admin Dashboard** — Admin panel for user/item management
- [ ] **Pagination** — Server-side pagination for large item catalogs
- [ ] **WebSocket Notifications** — Real-time order status updates
- [ ] **Dark Mode** — Toggle between light and dark themes

---

## 📝 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Shashank** — [@Shashank3312](https://github.com/Shashank3312)

---

> Built with ❤️ using React, Express, and MongoDB
