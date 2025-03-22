import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById, payOrder } from '../services/api';

// Interfaces
interface OrderItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  product: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

interface OrderData {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  paymentResult?: PaymentResult;
  // These might not exist in the backend model
  taxPrice?: number;
  shippingPrice?: number;
}

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await getOrderById(id);
          setOrder(data);
          if (data.isPaid) {
            setPaymentSuccess(true);
          }
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
  const handlePaymentSuccess = async (paymentResult: PaymentResult) => {
    try {
      setPaymentProcessing(true);
      if (id) {
        const updatedOrder = await payOrder(id, paymentResult);
        setOrder(updatedOrder);
        setPaymentSuccess(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment process failed');
    } finally {
      setPaymentProcessing(false);
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="spinner"></div>
        <p className="mt-4">Loading order details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link to="/orders" className="text-amber-700 hover:underline">
          Back to My Orders
        </Link>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Order not found
        </div>
        <Link to="/orders" className="text-amber-700 hover:underline">
          Back to My Orders
        </Link>
      </div>
    );
  }
  
  // Calculate item price (subtotal) if taxPrice and shippingPrice are available
  const calculateItemsPrice = () => {
    if (order.taxPrice !== undefined && order.shippingPrice !== undefined) {
      return order.totalPrice - order.taxPrice - order.shippingPrice;
    }
    // If tax and shipping aren't available, just sum the items
    return order.orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Order {order._id}</h1>
      
      {paymentSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="font-bold">Payment Successful!</p>
          </div>
          {order.paymentResult && (
            <p className="mt-1 text-sm">Transaction ID: {order.paymentResult.id}</p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <p className="mb-2">
              <strong>Name:</strong> {order.user.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {order.user.email}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
                Delivered on {new Date(order.deliveredAt!).toLocaleDateString()}
              </div>
            ) : (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                Not Delivered
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <p className="mb-2">
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
                Paid on {new Date(order.paidAt!).toLocaleDateString()}
              </div>
            ) : (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                Not Paid
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                Order is empty
              </div>
            ) : (
              <div>
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex items-center border-b py-4">
                    <div className="w-20">
                      <img src={item.image} alt={item.name} className="w-full rounded" />
                    </div>
                    <div className="flex-grow px-4">
                      <Link to={`/product/${item.product}`} className="text-amber-700 hover:underline">
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border-b pb-2 mb-2">
              <div className="flex justify-between py-2">
                <span>Items:</span>
                <span>${calculateItemsPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping:</span>
                <span>${(order.shippingPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Tax:</span>
                <span>${(order.taxPrice || 0).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total:</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
            
            {!order.isPaid && (
              <div className="mt-6">
                <button 
                  className="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800"
                  onClick={() => {
                    // Normally here would be PayPal or Stripe integration
                    // For now, simulate a successful payment
                    handlePaymentSuccess({
                      id: Date.now().toString(),
                      status: 'COMPLETED',
                      update_time: new Date().toISOString(),
                      email_address: 'customer@example.com',
                    });
                  }}
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            )}
            
            {order.isPaid && (
              <div className="mt-6">
                <button
                  className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
                  onClick={() => window.print()}
                >
                  Print Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;