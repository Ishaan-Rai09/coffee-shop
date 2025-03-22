import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface OrderItem {
  _id: string;
  name: string;
  qty: number;
  price: number;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Order {
  _id: string;
  createdAt: Date;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  user: {
    name: string;
    email: string;
  };
}

interface ReceiptGeneratorProps {
  order: Order;
}

const ReceiptGenerator: React.FC<ReceiptGeneratorProps> = ({ order }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!receiptRef.current) return;

    try {
      // Create canvas from the receipt element
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      // Initialize PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-order-${order._id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mb-6">
      {/* Hidden receipt template that will be converted to PDF */}
      <div className="hidden">
        <div ref={receiptRef} className="bg-white p-8" style={{ width: '210mm' }}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-coffee-dark">Ruhani Café</h1>
            <p className="text-gray-500">123 Coffee Street, Brewtown</p>
            <p className="text-gray-500">Tel: (123) 456-7890</p>
          </div>

          <div className="flex justify-between mb-6">
            <div>
              <h2 className="font-bold text-lg mb-2">RECEIPT</h2>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              {order.isPaid && order.paymentResult && (
                <p><strong>Transaction ID:</strong> {order.paymentResult.id}</p>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Customer</h3>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
              <p><strong>Address:</strong> {order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <table className="w-full mb-6">
            <thead className="border-b-2 border-gray-300">
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="py-2">{item.name}</td>
                  <td className="text-center py-2">{item.qty}</td>
                  <td className="text-right py-2">${item.price.toFixed(2)}</td>
                  <td className="text-right py-2">${(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Subtotal:</span>
                <span>${(order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping:</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax:</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-lg border-t border-gray-300 mt-1">
                <span>Total:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Thank you for your purchase!</p>
            <p className="text-sm text-gray-500">Visit us again soon at Ruhani Café.</p>
          </div>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={generatePDF}
        className="bg-coffee-primary hover:bg-coffee-dark text-white py-2 px-4 rounded-md transition"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default ReceiptGenerator; 