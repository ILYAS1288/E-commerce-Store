# ShopEase - Premium E-commerce Store

A modern, full-stack e-commerce platform built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **MongoDB**. Features role-based authentication, product management, shopping cart, and an admin dashboard.

## ✨ Features

### Customer Features
- 🛍️ **Product Catalog** - Browse and filter products by category
- 🛒 **Shopping Cart** - Add/remove items, persistent cart state with Zustand
- 📦 **Orders** - Place and track orders
- 👤 **User Dashboard** - View order history and profile
- 🔍 **Search & Filter** - Find products easily
- 💳 **Responsive Design** - Beautiful UI on all devices

### Admin Features
- 📊 **Admin Dashboard** - Monitor sales, orders, and users
- 📦 **Product Management** - Add, edit, delete products
- 📋 **Order Management** - View and process customer orders
- 👥 **User Management** - Manage admin roles and permissions
- 📈 **Analytics** - View store performance metrics

### Security & Authentication
- 🔐 **Role-based Access Control** - Admin and User roles
- 🔑 **Database Authentication** - bcryptjs password hashing
- 🔒 **Protected Routes** - Auth guard on all pages
- 📱 **Session Persistence** - localStorage-based auth state

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and navigate to project:**
```bash
cd "E-commerce Store"
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
DATABASE_URL="mongodb://localhost:27017/shopease?authSource=admin"
MONGODB_URI="mongodb://localhost:27017/shopease?authSource=admin"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Seed demo users to database:**
```bash
npm run seed-users
```

This adds two demo accounts:
- **Admin:** admin@example.com / adminpass
- **User:** user@example.com / userpass

5. **Start development server:**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Flow

### Login Process
1. User visits `/login`
2. Enters email and password
3. API endpoint `/api/auth/login` verifies credentials against MongoDB
4. Password validated with bcryptjs
5. User role (admin/user) returned and stored in localStorage
6. User redirected to homepage with authenticated session

### Protected Routes
- **All routes** require login (except `/login`)
- **Admin routes** (`/admin`) require `admin` role
- **User routes** accessible to `user` and `admin` roles
- Unauthorized users are redirected to `/login`

### Demo Credentials
```
Admin:
  Email: admin@example.com
  Password: adminpass

User:
  Email: user@example.com
  Password: userpass
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/login/route.ts        # Authentication endpoint
│   │   ├── products/route.ts          # Product API
│   │   └── orders/route.ts            # Orders API
│   ├── admin/page.tsx                 # Admin dashboard (protected)
│   ├── login/page.tsx                 # Login page
│   ├── cart/page.tsx                  # Shopping cart
│   ├── shop/page.tsx                  # Product listing
│   ├── deals/page.tsx                 # Deals page
│   ├── about/page.tsx                 # About page
│   ├── layout.tsx                     # Root layout with auth
│   ├── page.tsx                       # Homepage
│   └── globals.css                    # Global styles
├── components/
│   ├── auth-provider.tsx              # Auth context & hooks
│   ├── auth-guard.tsx                 # Route protection
│   ├── navbar.tsx                     # Navigation (auth-aware)
│   ├── hero.tsx                       # Hero section
│   ├── product-grid.tsx               # Product display
│   ├── product-card.tsx               # Individual product card
│ └── auth-guard.tsx                   # Auth gate
├── lib/
│   ├── mongodb.ts                     # MongoDB connection
│   └── prisma.ts                      # Prisma stub
├── store/
│   └── cart-store.ts                  # Zustand cart state
├── scripts/
│   └── seed-users.ts                  # Database seeding
├── prisma/
│   └── schema.prisma                  # Database schema
└── public/                            # Static assets
```

## 🗄️ Database Schema

### User Model
```typescript
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  password  String   (bcryptjs hashed)
  role      String   @default("user") // "user" | "admin"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Product Model
```typescript
model Product {
  id           String
  name         String
  description  String
  price        Float
  image        String
  category     String
  rating       Float
  numReviews   Int
  countInStock Int
  createdAt    DateTime
  updatedAt    DateTime
}
```

### Order Model
```typescript
model Order {
  id          String
  userEmail   String
  totalAmount Float
  status      String    // "PENDING" | "COMPLETED" | "CANCELLED"
  createdAt   DateTime
  updatedAt   DateTime
  orderItems  OrderItem[]
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate user
  - Request: `{ email: string, password: string }`
  - Response: `{ success: boolean, user: { email, role } }`

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=xyz` - Filter by category

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order

## 📦 NPM Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed-users` | Seed demo users to MongoDB |

## 🎨 Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Dark Theme** - Modern dark background with gradient accents
- **Responsive Design** - Mobile-first approach
- **Glass Morphism** - Modern UI effects
- **Color Scheme:**
  - Primary: `#6366f1` (Indigo)
  - Secondary: `#a855f7` (Purple)
  - Accent: `#f43f5e` (Rose)
  - Background: `#0f172a` (Dark Navy)

## 🔑 Key Technologies

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, PostCSS
- **State Management:** Zustand (cart), React Context (auth)
- **Database:** MongoDB
- **Authentication:** bcryptjs, localStorage
- **Icons:** Lucide React
- **HTTP Client:** Fetch API
- **Testing:** ESLint

## 🚨 Important Notes

### Development Mode
- Demo credentials are seeded on first run
- Passwords are hashed with bcryptjs (10 salt rounds)
- Auth state persists via localStorage
- MongoDB connection required

### Production Deployment
1. Set `NODE_ENV=production`
2. Update `DATABASE_URL` to production MongoDB
3. Generate secure JWT secret if implementing JWT auth
4. Update `NEXT_PUBLIC_APP_URL` for your domain
5. Enable HTTPS in production

### Adding New Users
To add more users to the database:

1. Update `scripts/seed-users.ts` with new credentials
2. Run `npm run seed-users`

Or create a registration API endpoint.

## 🛠️ Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally or accessible via connection string
- Check `DATABASE_URL` in `.env`
- Verify credentials and permissions

### Login Not Working
- Run `npm run seed-users` to ensure demo users exist
- Check MongoDB for users collection
- Verify bcryptjs installation

### Admin Routes Not Accessible
- Ensure you're logged in with `admin` role
- Check localStorage for auth state (DevTools → Application → localStorage)
- Clear localStorage and re-login if needed

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code structure
3. Check MongoDB and environment setup
4. Enable browser DevTools for debugging

---

**Happy shopping! 🛍️**
