# 🌿 Full-Stack Build Prompt: "Desk Plant" E-Commerce Website
### React (Frontend) + Express/Node.js (Backend) + Admin Panel

Paste this into Lovable, Claude Code, Cursor, or any AI dev tool to scaffold the full project.

---

## 1. PROJECT OVERVIEW

Build a full-stack e-commerce website called **"[YOUR BRAND NAME]"** selling small, low-maintenance indoor plants curated for office desks and workspaces. The site must include:

- Customer-facing storefront (React)
- REST API backend (Express + Node.js)
- Database (MongoDB with Mongoose, or PostgreSQL with Prisma — pick one)
- Admin panel for managing products, orders, customers, and content
- Authentication for both customers and admin
- Shopping cart, checkout, and order management
- Fully responsive, animated, production-quality UI

---

## 2. TECH STACK

**Frontend:**
- React 18 (Vite)
- React Router v6
- Tailwind CSS
- Framer Motion (animations)
- Zustand or Redux Toolkit (state management — cart, auth, filters)
- React Query / TanStack Query (data fetching & caching)
- React Hook Form + Zod (form validation)
- Axios (API calls)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose (recommended for product catalogs) OR PostgreSQL + Prisma
- JWT authentication (access + refresh tokens)
- bcrypt (password hashing)
- Multer + Cloudinary (image upload & storage)
- Express-validator (input validation)
- Stripe or a local payment gateway integration (e.g. JazzCash/Easypaisa for Pakistan, or Stripe for international)
- Nodemailer (order confirmation emails)

**Dev/Infra:**
- Environment variables via `.env`
- CORS configured properly
- Rate limiting (express-rate-limit) on auth routes
- Error-handling middleware
- RESTful API structure, versioned (`/api/v1/...`)

---

## 3. DATABASE SCHEMA

### Product
```
{
  name: String,
  slug: String (unique),
  description: String,
  shortDescription: String,
  category: [String], // e.g. "Office Plants", "Low-Light", "Air Purifying"
  price: Number,
  salePrice: Number (optional),
  images: [String], // main image + hover image + gallery
  stock: Number,
  inStock: Boolean,
  careLevel: String, // "Easy" | "Medium" | "Advanced"
  lightRequirement: String, // "Low" | "Medium" | "Bright Indirect"
  petSafe: Boolean,
  potIncluded: Boolean,
  sku: String,
  tags: [String],
  rating: Number,
  reviewCount: Number,
  isFeatured: Boolean,
  isBestSeller: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Category
```
{ name: String, slug: String, image: String, description: String }
```

### User
```
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ("customer" | "admin"),
  addresses: [AddressSchema],
  phone: String,
  createdAt: Date
}
```

### Order
```
{
  user: ObjectId,
  items: [{ product: ObjectId, name: String, price: Number, quantity: Number, image: String }],
  subtotal: Number,
  shippingFee: Number,
  discount: Number,
  total: Number,
  shippingAddress: AddressSchema,
  paymentMethod: String,
  paymentStatus: String, // "Pending" | "Paid" | "Failed"
  orderStatus: String, // "Processing" | "Shipped" | "Delivered" | "Cancelled"
  trackingId: String,
  createdAt: Date
}
```

### Review
```
{ product: ObjectId, user: ObjectId, rating: Number, comment: String, createdAt: Date }
```

### Coupon
```
{ code: String, discountType: String, discountValue: Number, expiryDate: Date, usageLimit: Number, usedCount: Number }
```

---

## 4. API ENDPOINTS (Express Backend)

**Auth**
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh-token`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

**Products**
- `GET /api/v1/products` (supports query params: category, price range, sort, search, page, limit)
- `GET /api/v1/products/:slug`
- `POST /api/v1/products` (admin only)
- `PUT /api/v1/products/:id` (admin only)
- `DELETE /api/v1/products/:id` (admin only)
- `POST /api/v1/products/:id/reviews`

**Categories**
- `GET /api/v1/categories`
- `POST /api/v1/categories` (admin)
- `PUT /api/v1/categories/:id` (admin)
- `DELETE /api/v1/categories/:id` (admin)

**Cart** (can be client-side + synced, or server-side per user)
- `GET /api/v1/cart`
- `POST /api/v1/cart/add`
- `PUT /api/v1/cart/update`
- `DELETE /api/v1/cart/remove/:productId`

**Orders**
- `POST /api/v1/orders` (create order / checkout)
- `GET /api/v1/orders/my-orders` (customer)
- `GET /api/v1/orders` (admin — all orders)
- `GET /api/v1/orders/:id`
- `PUT /api/v1/orders/:id/status` (admin — update status)

**Users**
- `GET /api/v1/users/profile`
- `PUT /api/v1/users/profile`
- `GET /api/v1/users` (admin — all customers)

**Coupons**
- `POST /api/v1/coupons/validate`
- CRUD routes for admin

**Dashboard/Analytics (admin)**
- `GET /api/v1/admin/stats` (total sales, order count, top products, recent orders)

---

## 5. FRONTEND PAGES & ROUTES

**Customer-facing:**
- `/` — Homepage
- `/shop` or `/collections/office-plants` — Collection/category page (filters, sort, grid)
- `/product/:slug` — Product detail page
- `/cart` — Cart page
- `/checkout` — Checkout flow (address → payment → confirmation)
- `/order-success/:orderId`
- `/account` — Customer dashboard (order history, addresses, profile)
- `/login`, `/register`, `/forgot-password`
- `/care-guide` — Blog/resource page
- `/about`, `/contact`
- `/wishlist`

**Admin Panel (separate route group, protected):**
- `/admin/login`
- `/admin/dashboard` — Overview stats (sales chart, recent orders, low-stock alerts)
- `/admin/products` — Product list (table with search/filter)
- `/admin/products/new` — Add product form
- `/admin/products/:id/edit` — Edit product form
- `/admin/categories` — Manage categories
- `/admin/orders` — Orders table (filter by status, search by customer/order ID)
- `/admin/orders/:id` — Order detail (update status, view items, print invoice)
- `/admin/customers` — Customer list
- `/admin/coupons` — Manage discount codes
- `/admin/reviews` — Moderate product reviews
- `/admin/settings` — Store settings (shipping fee, currency, announcement bar text)

---

## 6. HOMEPAGE STRUCTURE (Frontend Detail)

1. **Announcement Bar** — thin top bar, dark green (#0F4C36), scrolling or static tagline
2. **Navbar** — sticky, logo left, nav links center, search/cart/account icons right, mega-menu dropdown for "Plants by Type"
3. **Hero Section** — split layout, animated fade-in headline + CTA button + hero image with subtle parallax scroll effect
4. **Category Grid** — 4 cards (Low-Light, Air Purifying, Pet-Safe, Succulents) with hover zoom animation
5. **Best Sellers Carousel** — horizontal scroll-snap carousel, drag-to-scroll on desktop, swipe on mobile
6. **Why Desk Plants** — 4-icon benefit section, icons animate in with stagger (Framer Motion `staggerChildren`)
7. **Testimonials** — masonry grid, subtle scale-in on scroll
8. **Care Guide Banner** — full-width CTA banner
9. **Newsletter Signup** — email capture with success animation (confetti or checkmark micro-interaction)
10. **Footer** — 4-column layout + social icons + payment method icons

---

## 7. COLLECTION/SHOP PAGE (Detail — matches reference structure)

- **Hero/Intro** — page title + SEO description paragraph + bold list of featured plant types
- **Filter + Sort Bar**:
  - Filter drawer (slides in from left on desktop as sidebar, full-screen on mobile)
    - Availability checkboxes (In Stock / Out of Stock with live counts)
    - Price range (dual-handle slider + min/max number inputs)
    - Care level filter (Easy/Medium/Advanced)
    - Light requirement filter
    - Pet-safe toggle
    - "Apply" and "Clear All" buttons
  - Sort dropdown (Featured, Best Selling, A-Z, Z-A, Price Low-High, Price High-Low, Newest)
  - Live product count ("21 products")
- **Product Grid** (4-col desktop / 2-col tablet & mobile):
  - Image with hover crossfade to second image
  - Sale badge (top-left, pill shape, coral background)
  - Product name (2-line clamp)
  - Price block (strikethrough original + sale price if discounted)
  - Quick "Add to Cart" button that fades in on hover (desktop) / always visible (mobile)
  - Wishlist heart icon (top-right of image, fills on click with a small bounce animation)
- **Pagination** — numbered, centered, active page highlighted with the brand accent color
- **Empty state** — friendly illustration + message if filters return 0 results

---

## 8. PRODUCT DETAIL PAGE

- Image gallery: large main image + thumbnail strip, click-to-zoom on hover, swipe on mobile
- Product name, price, sale badge
- Care difficulty meter (visual bar: Easy → Medium → Advanced, filled segments)
- Light requirement icon + label
- Pet-safe badge (green checkmark)
- Pot options toggle ("Plant Only" / "Plant + Self-Watering Pot") — price updates dynamically
- Quantity selector (- / + buttons with number input)
- "Add to Cart" button — on click, shows a mini cart slide-in animation from the right with the added item
- Accordion sections: Description, Care Instructions, Shipping & Returns
- Customer reviews section: star rating breakdown, review list, "Write a Review" form
- "You May Also Like" — related products carousel

---

## 9. CART & CHECKOUT

**Cart (slide-in drawer + full page)**
- Line items: image, name, price, quantity stepper, remove button (with slide-out animation on remove)
- Subtotal, estimated shipping, coupon code input
- "Proceed to Checkout" sticky button

**Checkout (multi-step, animated progress bar)**
1. Shipping address (form with validation, saved-address selection if logged in)
2. Payment method (Stripe/JazzCash/Cash on Delivery — radio selection with icon)
3. Order review + place order button
4. Success page — animated checkmark, order number, estimated delivery, "Track Order" link

---

## 10. ADMIN PANEL (Detail)

**Layout:**
- Fixed left sidebar navigation (Dashboard, Products, Orders, Customers, Coupons, Reviews, Settings) with icons, collapsible on smaller screens
- Top bar: search, admin profile dropdown, notifications bell (new orders)

**Dashboard:**
- Stat cards (Total Sales, Total Orders, Total Customers, Low Stock Items) with animated count-up numbers
- Sales line/bar chart (last 7/30/90 days) using Recharts or Chart.js
- Recent orders table (last 10, with status badges)
- Top-selling products list

**Product Management:**
- Data table: image thumbnail, name, category, price, stock, status toggle (active/hidden), edit/delete actions
- Search + filter by category/stock status
- Bulk actions (delete multiple, change category)
- Add/Edit Product form:
  - Multi-image upload with drag-and-drop, preview thumbnails, reorder by dragging
  - Rich text editor for description
  - Category multi-select
  - Price/sale price fields
  - Stock quantity + in-stock toggle
  - Care level, light requirement, pet-safe dropdowns/toggles
  - SEO fields (meta title/description, slug auto-generated but editable)
  - Save as Draft / Publish buttons

**Order Management:**
- Table: order ID, customer name, date, total, payment status badge, order status badge (color-coded: yellow=processing, blue=shipped, green=delivered, red=cancelled)
- Click row → order detail modal/page: full item list, customer info, shipping address, status update dropdown (triggers email to customer on change), printable invoice button

**Customer Management:**
- Table: name, email, total orders, total spent, joined date
- Click → customer detail (order history, addresses)

**Coupons:**
- Table + create/edit modal (code, discount type %/flat, value, expiry date, usage limit)

**Reviews Moderation:**
- Table of pending/approved reviews, approve/reject/delete actions

**Settings:**
- Store name, logo upload, announcement bar text, shipping fee, currency, social media links, contact info

---

## 11. AUTHENTICATION FLOW

- Customer: register/login → JWT stored in httpOnly cookie (access token short-lived, refresh token longer-lived) → protected routes for `/account`, `/checkout`
- Admin: separate login at `/admin/login` → role check middleware (`role: "admin"`) on all `/admin/*` routes and corresponding API endpoints
- Password reset via emailed token link
- Route guards on frontend (redirect to login if unauthenticated; redirect to dashboard if non-admin tries `/admin/*`)

---

## 12. DESIGN SYSTEM

**Color Palette:**
| Role | Color | Hex |
|---|---|---|
| Primary (brand) | Deep Forest Green | `#0F4C36` |
| Background | Warm Cream | `#FAF7F2` |
| Accent (CTA/Sale) | Terracotta/Coral | `#C1663A` |
| Text — Dark | Charcoal | `#2B2B26` |
| Text — Muted | Warm Gray | `#8A8578` |
| Success | Sage Green | `#4A5D45` |
| Border/Divider | Light Beige | `#E8E4DC` |
| Error | Muted Red | `#B3453D` |

**Typography:**
- Headings: `Fraunces` (serif, weights 500–700)
- Body/UI: `Inter` (sans-serif, weights 400–600)
- Base size 16px; scale: h1 48px / h2 36px / h3 24px / body 16px / small 14px

**Buttons:**
- Primary button: solid `#0F4C36` background, cream text, fully rounded (`rounded-full`), padding `px-6 py-3`, on hover: darken background 10% + slight scale (1.02) + shadow lift, transition `200ms ease`
- Secondary/outline button: transparent bg, `#0F4C36` border + text, on hover: fills with `#0F4C36` and text turns cream
- Icon buttons (cart, wishlist): circular, subtle scale + color pulse on click (use Framer Motion `whileTap={{ scale: 0.9 }}`)
- Disabled state: 50% opacity, cursor not-allowed

**Card & Component Styling:**
- Border radius: 16px on product cards, 12px on buttons/inputs, full-round on badges/pills
- Shadow: `0 4px 20px rgba(0,0,0,0.06)` default, `0 8px 30px rgba(0,0,0,0.1)` on hover
- Spacing: 24px grid gaps, 80–120px section padding desktop / 40px mobile

**Animations (Framer Motion):**
- Page transitions: fade + slight vertical slide (`opacity 0→1`, `y: 10→0`, `duration: 0.3`)
- Scroll-triggered reveals: `whileInView` with `staggerChildren: 0.1` for grids/lists
- Product card hover: image crossfade (`0.3s`) + card lift (`translateY(-4px)`) + shadow increase
- Add-to-cart: mini cart icon "bounce" (`scale: [1, 1.3, 1]`) + item flies into cart icon (optional advanced touch)
- Modal/drawer: slide-in from right (cart) or left (filters) with backdrop fade
- Loading states: skeleton screens (pulsing gray blocks) instead of spinners for product grids
- Toast notifications: slide in from top-right for "Added to cart", "Order placed", etc., auto-dismiss after 3s

---

## 13. IMAGES

Use real, meaningful, high-quality plant/lifestyle photography — not generic stock filler. Recommended free sources: Unsplash and Pexels, searched with specific terms so each image matches its actual product/section:

- Hero: search `"desk plant workspace laptop"` or `"office plant modern desk"`
- Snake Plant product: search `"snake plant sansevieria pot"`
- Pothos product: search `"pothos trailing plant pot"`
- ZZ Plant product: search `"zz plant zamioculcas indoor"`
- Money Plant/Pothos variants: search `"money plant indoor pot"`
- Areca Palm: search `"areca palm indoor plant"`
- Lifestyle/testimonial section: search `"home office plant desk cozy"`
- Care guide banner: search `"watering indoor plant hands"`

Each product should have at minimum 2 images (primary + hover/alt angle) so the hover-swap interaction works correctly.

---

## 14. FOLDER STRUCTURE (suggested)

```
/client (React)
  /src
    /components
      /common (Button, Badge, Modal, Skeleton, Toast)
      /layout (Navbar, Footer, AnnouncementBar)
      /product (ProductCard, ProductGrid, FilterSidebar, SortDropdown)
      /cart (CartDrawer, CartItem)
      /admin (Sidebar, StatCard, DataTable, ProductForm)
    /pages
      /admin (Dashboard, Products, Orders, Customers, Settings)
    /store (Zustand slices: cartStore, authStore, filterStore)
    /hooks
    /api (axios instance + service functions per resource)
    /utils

/server (Express)
  /config (db.js, cloudinary.js)
  /models
  /controllers
  /routes
  /middleware (auth.js, adminOnly.js, errorHandler.js, upload.js)
  /utils (sendEmail.js, generateToken.js)
  server.js
```

---

## 15. NON-FUNCTIONAL REQUIREMENTS

- Fully responsive (mobile-first breakpoints: 375px, 768px, 1024px, 1440px)
- SEO-friendly: meta tags, semantic HTML, alt text on all images
- Accessible: proper ARIA labels, keyboard navigation for menus/modals, sufficient color contrast
- Performance: lazy-load images, code-split admin panel from customer storefront, debounce search inputs
- Security: sanitize inputs, hash passwords, rate-limit login attempts, validate all API inputs server-side (never trust client-side validation alone)