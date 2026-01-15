# Inventory Management System

A modern, full-stack inventory management application built with React.js, Node.js, Express, and MongoDB.

## Features

- **Product CRUD Operations**: Create, read, update, and delete products with name, SKU, quantity, and price fields
- **Stock Management**: Track inventory quantities and set custom alert thresholds (default: 10 units)
- **Stock Alerts**: Visual indicators for low-stock items with color-coded status
- **Reporting**: View low-stock reports and export inventory data as CSV
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**: Clean interface with skeleton loading states and comprehensive error handling

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS, Lucide React Icons, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Tools**: csv-writer for CSV export, Vite for bundling

## Project Structure

```
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Custom React Pages
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── server/                   # Express backend (MVC)
|   ├──src
│   | ├── models/             # MongoDB schemas
│   | ├── controllers/        # Business logic
│   | ├── routes/             # API routes
│   | ├── middleware/         # Error handling
│   | ├── config/             # Database config
│   | └── index.js
|   └── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js v20 or higher
- npm
- MongoDB (local or cloud instance like MongoDB Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd inventory-management
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/inventory
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed database (optional)**
   ```bash
   npm run seed
   ```
   This populates the database with 8 sample products for testing.

5. **Start development servers**
   ```bash
   npm run dev
   ```
   The script will start both servers concurrently:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Reports
- `GET /api/products/report/low-stock` - Get products below threshold
- `GET /api/products/export/csv` - Export all products as CSV

## Usage

### Creating a Product

1. Navigate to the Products page
2. Click "New Product" button
3. Fill in product details (name, SKU, quantity, price)
4. Set custom stock alert threshold
5. Click "Create Product"

### Managing Stock

1. View all products on the Products page
2. Status badge shows "In Stock" (green) or "Low Stock" (red)
3. Click edit button to update quantity or price
4. Products below threshold appear highlighted in Reports

### Exporting Data

1. Navigate to the Reports page
2. View all low-stock items with deficit amounts
3. Click "Export CSV" button
4. CSV file downloads with product details and status

## Manual Deployment

### Frontend Deployment (Vercel or similar)

1. Build the client:
   ```bash
   cd client && npm run build
   ```

2. Deploy the `client/dist` folder to your hosting provider (Vercel, Netlify, etc.)

3. Set environment variable:
   ```
   VITE_API_URL=<your-backend-api-url>
   ```

### Backend Deployment (Railway, Heroku, or similar)

1. Push code to GitHub

2. Connect repository to your hosting provider

3. Set environment variables in provider:
   ```
   MONGODB_URI=<your-mongodb-uri>
   PORT=5000
   NODE_ENV=production
   ```

4. Deploy `server/` folder as Node.js application

5. Note the backend URL for frontend API_URL configuration

## Development Scripts

```bash
npm run dev              # Start both servers (frontend + backend)
npm run server:dev       # Start backend only with nodemon
npm run client:dev       # Start frontend only with Vite
npm run build            # Build frontend for production
npm run preview          # Preview production build locally
npm run server:start     # Start production backend
npm run seed             # Seed database with sample products
```

## Database Schema

### Product Model

```javascript
{
  name: String (required),
  sku: String (required, unique),
  quantity: Number (required, default: 0),
  price: Number (required),
  alertThreshold: Number (default: 10),
  status: String (computed based on quantity vs alertThreshold),
  createdAt: Date,
  updatedAt: Date
}
```

## Default Settings

- **Stock Alert Threshold**: 10 units per product (customizable per product)
- **Price Format**: 2 decimal places

## Features Explained

### Stock Alerts
- Products with quantity ≤ alertThreshold are flagged as "Low Stock"
- Low-stock items appear in red on the dashboard
- Reports page filters and displays only low-stock items with deficit calculations

### CSV Export
- Includes all product fields: name, SKU, quantity, price, status
- Exports to Downloads folder with timestamp
- Can be imported into Excel or other tools

### Responsive Design
- Mobile-first approach
- Tables convert to cards on mobile devices
- Touch-friendly buttons and inputs
- Works on screens from 320px and up

## Error Handling

- Form validation on client and server side
- User-friendly error messages for API failures
- Skeleton loaders during data fetching
- Error boundaries to prevent app crashes
- Proper HTTP status codes for debugging
