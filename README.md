# 🎨 Inventory Management System - Frontend
## 🎨 بَیتَ الْبَرَکَہ – Frontend (React)

Modern, responsive React application for the بَیتَ الْبَرَکَہ Inventory & Billing System. This is the **admin/manager/seller UI** that talks to the Node/Express backend.

---

## 🧱 Tech Stack

- React 18 + Vite
- React Router v6
- **@tanstack/react-query** – data fetching, caching, invalidation
- Tailwind CSS – styling
- Axios – HTTP client
- Lucide React – icons

---

## 🚀 Key Features (Frontend)

- **Auth & Roles**
  - Login / logout with JWT (handled by backend)
  - Roles: `superadmin`, `admin`, `manager`, `seller`
  - Protected routes (`ProtectedRoute`) based on role

- **Dashboard**
  - Admin dashboard with high‑level stats and charts
  - Seller dashboard (separate route) with personal stats and commission history

- **Products**
  - CRUD UI for products with multiple price tiers (original / wholesale / retail / website)
  - Stock management and low‑stock banner
  - Filter by category
  - **Search by name, model, and category**
  - Delete button hidden for `manager` (only `admin`/`superadmin` can delete); backend enforces this too

- **Sellers**
  - Manage sellers (create, update, delete)
  - Auto‑generated credentials on create (shown in modal)
  - Seller leaderboard

- **Customers**
  - Customer list with CRUD and search

- **Billing (POS)**
  - Build bills from products with quantity and price selection
  - Discounts (percentage/fixed)
  - Customer remaining balance and history
  - **Bill History** component with search, filters, and server‑side pagination
  - Beautiful invoice modal (`BillReceipt`) with:
    - Items table
    - Totals & discount
    - Total amount shown
    - **Amount Paid** and **Remaining Balance** shown as blank placeholders
  - Printing using `window.print()` with `@media print` so layout matches the on‑screen invoice

- **Returns**
  - Sidebar page for logging product returns
  - Form fields:
    - Product (SearchableSelect – search by name/model)
    - Quantity
    - Unit price (optional)
    - Customer name (who returned)
    - Tracking ID
    - Notes
  - Returns table with date, product, model, customer, tracking ID, quantity, unit price, notes
  - Each return triggers a backend call that **increments product stock**

- **Expenses**
  - List and create expenses
  - Stats (today / week / month / year)
  - Date‑range filters and retry on error

- **Admin Management**
  - Manage admins/managers and their roles
  - Role changes reflected via TanStack Query invalidation

---

## 📡 TanStack Query Usage

The frontend uses **@tanstack/react-query** for most data:

- `useQuery` for lists and stats:
  - `['products']`, `['customers']`, `['sellers']`, `['lowStockProducts']`
  - `['sales']`, `['expenses']`, `['expenseStats']`
  - `['bills']`, `['billingStats']`
  - `['returns']`
  - `['admins']`

- Mutations (create/update/delete) call `queryClient.invalidateQueries` so lists and stats refresh automatically.

Client‑side pagination and filters are kept where originally used (e.g. Products, Sellers), while server‑side pagination is used for Billing History.

---

## 📁 Project Structure

```text
frontend/
├── index.html
├── src/
│   ├── App.jsx              # App routes & layout
│   ├── main.jsx             # React entry, QueryClientProvider
│   ├── index.css            # Tailwind + global styles (@media print)
│   ├── components/
│   │   ├── Layout.jsx       # Sidebar + header layout
│   │   ├── ProtectedRoute.jsx
│   │   ├── BillingHistory.jsx
│   │   ├── BillReceipt.jsx
│   │   ├── SearchableSelect.jsx
│   │   ├── Card.jsx, Button.jsx, Modal.jsx, Pagination.jsx, etc.
│   ├── context/
│   │   ├── AuthContext.jsx      # user, token, role
│   │   ├── ToastContext.jsx
│   │   └── NotificationContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Sellers.jsx
│   │   ├── Customers.jsx
│   │   ├── Billing.jsx
│   │   ├── Sales.jsx
│   │   ├── Expenses.jsx
│   │   ├── Returns.jsx
│   │   ├── AdminManagement.jsx
│   │   ├── SellerDashboard.jsx
│   │   ├── SellerPasswordChange.jsx
│   │   ├── Login.jsx, Register.jsx
│   │   ├── ForgotPassword.jsx, ResetPassword.jsx
│   └── services/
│       └── api.js          # Axios instance + endpoint helpers
├── public/
│   └── favicon.svg
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## ⚙️ Setup & Run (Frontend Only)

### 1. Install

```bash
cd frontend
npm install
```

### 2. Environment

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000/api
```

### 3. Run Dev Server

```bash
npm run dev
```

Open: `http://localhost:5173`

### 4. Build

```bash
npm run build
npm run preview
```

---

## 🧩 Notes

- Printing of bills uses `window.print()` and CSS `@media print` to hide the app chrome and show only `#bill-content`.
- Product delete is visually hidden for managers and also blocked by the backend.
- Returns page is admin/manager‑only and is fully integrated with product stock updates.


Modern, responsive React application for inventory management with role-based dashboards for admins and sellers.

---

## ✨ Features

### **Admin Dashboard**
- 📊 Real-time analytics and statistics
- 📦 Product management with stock tracking
- 👥 Seller management with commission tracking
- 🛒 Sales management and tracking
- 👤 Customer database management
- 📈 Revenue charts and performance metrics
- 🔔 Low stock notifications

### **Seller Portal**
- 📋 Personal sales history with dates
- 💰 Commission tracking per sale
- 📊 Performance statistics
- 🔐 Password change system
- 📱 Responsive dashboard

### **Authentication**
- 🔒 Secure login/logout
- 👤 Role-based access (Admin/Seller)
- 🔑 Password reset functionality
- 🔐 JWT token management

### **UI/UX**
- 🎨 Modern blue theme design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast loading with optimized performance
- 🎯 Intuitive navigation
- ✨ Smooth animations and transitions

---

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Modern icons
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:4000`

---

## 🚀 Installation

### **1. Clone the repository**
```bash
git clone <repository-url>
cd IMSystem/frontend
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Environment Setup**

Create a `.env` file in the frontend directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:4000/api
```

### **4. Start development server**
```bash
npm run dev
```

Application will run on `http://localhost:5173`

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.jsx       # Main layout with sidebar
│   │   ├── Button.jsx       # Custom button component
│   │   ├── Card.jsx         # Card components
│   │   ├── Input.jsx        # Form input components
│   │   └── Toast.jsx        # Toast notifications
│   │
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state
│   │   ├── ToastContext.jsx # Toast notifications
│   │   └── NotificationContext.jsx  # Low stock alerts
│   │
│   ├── pages/               # Page components
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Admin registration
│   │   ├── Dashboard.jsx    # Admin dashboard
│   │   ├── Products.jsx     # Product management
│   │   ├── Sellers.jsx      # Seller management
│   │   ├── Customers.jsx    # Customer management
│   │   ├── Sales.jsx        # Sales management
│   │   ├── SellerDashboard.jsx  # Seller portal
│   │   ├── SellerPasswordChange.jsx  # Password change
│   │   ├── ForgotPassword.jsx  # Password reset request
│   │   └── ResetPassword.jsx   # Password reset form
│   │
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles (Tailwind)
│
├── public/                  # Static assets
├── .env                     # Environment variables
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── package.json
└── README.md
```

---

## 🎯 Key Features

### **1. Authentication System**

**Login Page:**
- Email/password authentication
- Remember me functionality
- Password visibility toggle
- Error handling with user-friendly messages

**Protected Routes:**
- Automatic redirect to login if not authenticated
- Role-based route protection
- Session persistence with localStorage

### **2. Admin Dashboard**

**Stats Cards:**
- Total Products
- Total Customers
- Total Sales
- Total Revenue

**Revenue Chart:**
- Interactive area chart
- Monthly revenue tracking
- Orders trend visualization

**Recent Sales:**
- Quick overview of latest transactions
- Customer and product details

### **3. Product Management**

- Create, read, update, delete products
- Stock level tracking
- Low stock threshold alerts
- Category management
- Search and filter functionality

### **4. Seller Management**

- Add sellers with commission rates
- Temporary password generation
- Activate/deactivate sellers
- View seller performance
- Commission tracking

### **5. Sales Management**

- Create sales transactions
- Automatic commission calculation
- Product stock updates
- Customer and seller assignment
- Sales history with filters

### **6. Seller Portal**

**Dashboard Features:**
- Personal statistics
- Sales history table with dates
- Commission breakdown per sale
- Account information
- Password change system

**Sales History Table:**
- Date and time of each sale
- Product details with prices
- Customer information
- Quantity sold
- Total amount
- Commission earned (highlighted)

### **7. Customer Management**

- Customer database
- Contact information
- Purchase history
- CRUD operations

---

## 🎨 UI Components

### **Reusable Components:**

**Button Component:**
```jsx
<Button variant="primary">Click Me</Button>
// Variants: primary, secondary, danger, success
```

**Input Component:**
```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  icon={Mail}
/>
```

**Card Component:**
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

**Toast Notifications:**
```jsx
const { showToast } = useToast();
showToast('Success!', 'success');
```

---

## 🔐 Context Providers

### **AuthContext**
```jsx
const { user, login, logout, checkAuth } = useAuth();
```
- User authentication state
- Login/logout functions
- User profile data
- Role information (admin/seller)

### **ToastContext**
```jsx
const { showToast } = useToast();
```
- Display notifications
- Success, error, info, warning types
- Auto-dismiss functionality

### **NotificationContext**
```jsx
const { lowStockProducts, checkLowStock } = useNotification();
```
- Low stock product alerts
- Periodic stock checking
- Badge notifications

---

## 🛣️ Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/login` | Login | Public | User login |
| `/register` | Register | Public | Admin registration |
| `/forgot-password` | ForgotPassword | Public | Password reset request |
| `/reset-password/:token` | ResetPassword | Public | Reset password form |
| `/` | Dashboard | Admin | Admin dashboard |
| `/products` | Products | Admin | Product management |
| `/sellers` | Sellers | Admin | Seller management |
| `/customers` | Customers | Admin | Customer management |
| `/sales` | Sales | Admin | Sales management |
| `/seller-dashboard` | SellerDashboard | Seller | Seller portal |
| `/seller-change-password` | SellerPasswordChange | Seller | Change password |

---

## 🎨 Styling

### **Tailwind CSS Configuration**

**Color Theme:**
- Primary: Blue (`blue-600`)
- Success: Emerald (`emerald-500`)
- Danger: Rose (`rose-600`)
- Warning: Amber (`amber-500`)

**Responsive Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Custom Utilities:**
```css
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 🧪 Development

### **Run Development Server**
```bash
npm run dev
```
Opens at `http://localhost:5173` with hot reload

### **Build for Production**
```bash
npm run build
```
Outputs to `dist/` folder

### **Preview Production Build**
```bash
npm run preview
```

### **Lint Code**
```bash
npm run lint
```

---

## 🔧 Configuration

### **Vite Config** (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
```

### **Tailwind Config** (`tailwind.config.js`)
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    }
  }
}
```

---

## 📦 Dependencies

### **Core Dependencies:**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "axios": "^1.7.8",
  "recharts": "^2.15.0",
  "lucide-react": "^0.468.0"
}
```

### **Dev Dependencies:**
```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "vite": "^6.0.1",
  "tailwindcss": "^3.4.17",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.49"
}
```

---

## 🐛 Common Issues & Solutions

### **Issue 1: API Connection Error**
```
Network Error: ERR_CONNECTION_REFUSED
```
**Solution:** Make sure backend is running on port 4000
```bash
cd backend
npm start
```

### **Issue 2: Build Fails**
```
Error: Cannot find module '@vitejs/plugin-react'
```
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Issue 3: CORS Error**
```
Access-Control-Allow-Origin blocked
```
**Solution:** Backend must allow frontend origin in CORS config

---

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Netlify**

1. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment variables:**
   - `VITE_API_URL`: Your backend API URL

3. **Deploy:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### **Deploy to Vercel**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

---

## 📱 Responsive Design

### **Mobile (< 640px)**
- Hamburger menu
- Stacked cards
- Simplified tables
- Touch-friendly buttons

### **Tablet (640px - 1024px)**
- Sidebar toggle
- 2-column grid
- Responsive charts

### **Desktop (> 1024px)**
- Full sidebar
- 4-column grid
- Large charts
- All features visible

---

## ✅ Best Practices

### **Code Organization**
- ✅ Component-based architecture
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Context for global state

### **Performance**
- ✅ Code splitting with React.lazy
- ✅ Optimized images
- ✅ Minimal re-renders
- ✅ Efficient state management

### **Security**
- ✅ Token stored in localStorage
- ✅ Protected routes
- ✅ Input validation
- ✅ XSS prevention

### **User Experience**
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Accessible forms

---

## 🎯 Features Checklist

### **Admin Features:**
- ✅ Dashboard with analytics
- ✅ Product CRUD operations
- ✅ Seller management
- ✅ Customer management
- ✅ Sales tracking
- ✅ Low stock alerts
- ✅ Revenue charts

### **Seller Features:**
- ✅ Personal dashboard
- ✅ Sales history with dates
- ✅ Commission tracking
- ✅ Password change
- ✅ Account details

### **Authentication:**
- ✅ Login/Logout
- ✅ Password reset
- ✅ Protected routes
- ✅ Role-based access

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer Notes

### **Important Implementation Details:**

**Seller Dashboard:**
- Stats cards show total sales, revenue, commission, products sold
- Sales history table displays all transactions with dates and times
- Commission highlighted in green for easy identification
- Real-time data fetching from backend API

**Admin Dashboard:**
- Revenue chart with monthly data
- Low stock notifications with badge count
- Recent sales overview
- Quick stats for all modules

**Authentication Flow:**
- JWT tokens stored in localStorage
- Auto-redirect based on user role (admin → `/`, seller → `/seller-dashboard`)
- Session persistence on page reload
- Secure logout clears all tokens

### **API Integration:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Example API call
const response = await axios.get(`${API_URL}/products`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## 📞 Support

For issues or questions:
- Create an issue in the repository
- Contact: farhanali39765500@gmail.com

---

**Built with ❤️ using React & Tailwind CSS**

🚀 **Happy Coding!**
