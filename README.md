# Inventory Management System

A modern, full-stack inventory management application built with React.js, Node.js, Express, and MongoDB.

## Live URL

### 1. Frontend
```
https://inventory-management-1oge.vercel.app
```

### 2. Backend
```
https://inventory-management-backend-49re.onrender.com
```

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
   git clone https://github.com/lazyDeveloperAkash/inventory-management.git

   cd inventory-management
   ```

2. **Navigate to client**

   ```bash
   cd client
   ```

3. **Install dependencies for client**

   ```bash
   npm install
   ```

4. **Navigate to server**

   ```bash
   cd ..
   cd server
   ```

5. **Install dependencies for server**

   ```bash
   npm install
   ```

6. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your MongoDB connection string:

   ```
   MONGODB_URI=mongodb://localhost:27017/inventory
   PORT=5000
   NODE_ENV=development
   ```

7. **Seed database (optional)**

   ```bash
   npm run seed
   ```

   This populates the database with 8 sample products for testing.

8. **Start development servers server**

   ```bash
   npm run dev
   ```

9. **Start development servers client**

   ```bash
   cd ..
   cd client
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
