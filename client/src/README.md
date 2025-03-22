# Ruhani Café E-Commerce Workflow

This document explains the complete workflow for the e-commerce functionality in the Ruhani Café application.

## Complete E-Commerce Workflow

### 1. Product Selection
- Users browse products on the Menu/Products Page
- Each product displays image, description, price, and an "Add to Cart" button
- Users can select quantity before adding to cart
- When "Add to Cart" is clicked, the product is added to the Redux cart state

### 2. Cart Management
- Cart state is managed through Redux (cartSlice)
- The Cart page displays all items in the cart with:
  - Product images and names
  - Quantities with controls to increase/decrease
  - Price per item and total price
  - Option to remove items
- Cart calculations:
  - Subtotal of all items
  - Tax calculation (10%)
  - Shipping fee (free over $50)
  - Total order amount

### 3. Checkout Process
- From Cart Page, user clicks "Proceed to Checkout"
- User enters shipping information
- User selects payment method (MetaMask/TLOS)
- Order creation:
  - Order details submitted to backend
  - Order ID created for tracking

### 4. Payment Processing
- MetaMask integration for TLOS blockchain payments
- Connection to MetaMask wallet
- Switching to TELOS network if needed
- Transaction processing
- Payment confirmation

### 5. Order Receipt and Confirmation
- After successful payment:
  - Order status updated to "Paid"
  - Transaction ID recorded
  - Order details displayed
  - Receipt generation available
- User can download a PDF receipt containing:
  - Order ID and date
  - Customer information
  - Item details and quantities
  - Price breakdown
  - Payment information including transaction ID

## Key Components

- **ProductPage**: Displays product details and allows adding to cart
- **CartPage**: Manages cart items and calculations
- **CheckoutPage**: Handles order creation and payment
- **OrderPage**: Shows order details and generates receipts
- **ReceiptGenerator**: Creates downloadable PDF receipts

## Implementation Details

- State Management: Redux for cart and user state
- Local Storage: Fallback for persistence
- PDF Generation: Using jsPDF and html2canvas
- Blockchain Integration: MetaMask for TLOS payments

## User Flow Visualization

```
Product Page
   ↓
Add to Cart
   ↓
Cart Page
   ↓
Proceed to Checkout
   ↓
Enter Shipping Info
   ↓
Connect MetaMask
   ↓
Complete Payment
   ↓
Order Confirmation
   ↓
Download Receipt
``` 