import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../state/store';
import { createOrder, payOrder } from '../services/api';
import { clearCart } from '../state/cartSlice';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// TLOS network configuration
const TELOS_CHAIN_ID = '0x28'; // 40 in decimal
const TELOS_NETWORK = {
  chainId: TELOS_CHAIN_ID,
  chainName: 'Telos EVM Mainnet',
  nativeCurrency: {
    name: 'TLOS',
    symbol: 'TLOS',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.telos.net/evm'],
  blockExplorerUrls: ['https://teloscan.io/'],
};

// For demo purposes - using Telos Testnet
const TELOS_TESTNET_CHAIN_ID = '0x29'; // 41 in decimal
const TELOS_TESTNET_NETWORK = {
  chainId: TELOS_TESTNET_CHAIN_ID,
  chainName: 'Telos EVM Testnet',
  nativeCurrency: {
    name: 'TLOS',
    symbol: 'TLOS',
    decimals: 18,
  },
  rpcUrls: ['https://testnet.telos.net/evm'],
  blockExplorerUrls: ['https://testnet.teloscan.io/'],
};

// Use testnet for safety
const ACTIVE_NETWORK = TELOS_TESTNET_NETWORK;
const ACTIVE_CHAIN_ID = TELOS_TESTNET_CHAIN_ID;

// Cafe wallet address (replace with your actual wallet)
const CAFE_WALLET_ADDRESS = '0x0000000000000000000000000000000000000000';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const [address, setAddress] = useState(currentUser?.address || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [postalCode, setPostalCode] = useState(currentUser?.postalCode || '');
  const [country, setCountry] = useState(currentUser?.country || '');
  const [paymentMethod, setPaymentMethod] = useState('MetaMask');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [networkReady, setNetworkReady] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const taxAmount = totalAmount * 0.07;
  const totalOrderAmount = totalAmount + taxAmount;

  // Check if MetaMask is installed on page load
  useEffect(() => {
    checkMetaMaskStatus();
  }, []);

  // Check if MetaMask is installed
  const checkMetaMaskStatus = async () => {
    if (isMetaMaskInstalled()) {
      try {
        // Check if already connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
          
          // Check network
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setNetworkReady(chainId === ACTIVE_CHAIN_ID);
        }
      } catch (error) {
        console.error("Error checking MetaMask status:", error);
      }
    }
  };

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return window.ethereum && window.ethereum.isMetaMask;
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to proceed with payment.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setWalletConnected(true);

      // Check if we're on the right network
      await switchToTelosNetwork();
    } catch (err: any) {
      console.error('Error connecting to MetaMask:', err);
      setError(err.message || 'Failed to connect to MetaMask');
    } finally {
      setLoading(false);
    }
  };

  // Switch to Telos network
  const switchToTelosNetwork = async () => {
    try {
      // Try to switch to the Telos network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ACTIVE_CHAIN_ID }],
      });
      
      setNetworkReady(true);
    } catch (switchError: any) {
      // If the network is not added, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ACTIVE_NETWORK],
          });
          setNetworkReady(true);
        } catch (addError: any) {
          setError(addError.message || `Failed to add ${ACTIVE_NETWORK.chainName} to MetaMask`);
        }
      } else {
        setError(switchError.message || `Failed to switch to ${ACTIVE_NETWORK.chainName}`);
      }
    }
  };

  // Process payment with MetaMask
  const processPayment = async () => {
    if (!walletConnected) {
      await connectWallet();
      return;
    }

    if (!networkReady) {
      await switchToTelosNetwork();
      return;
    }

    if (!orderId) {
      setError('No order to pay for. Please place an order first.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Convert the amount to wei (1 TLOS = 10^18 wei)
      const amountInWei = BigInt(Math.round(totalOrderAmount * 10**18)).toString(16);
      
      // Send the transaction
      const transactionParameters = {
        to: CAFE_WALLET_ADDRESS,
        from: walletAddress,
        value: '0x' + amountInWei, // Convert to hexadecimal
        gas: '0x5208', // 21000 gas limit
      };
      
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      // Process the payment in your backend
      await payOrder(orderId, {
        id: txHash,
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        payer: { email_address: currentUser?.email || walletAddress },
      });
      
      // Success!
      setPaymentSuccess(true);
      dispatch(clearCart());
      
      // Navigate to the order success page after a short delay
      setTimeout(() => {
        navigate(`/order/${orderId}`);
      }, 2000);
    } catch (err: any) {
      console.error('Payment error:', err);
      
      // Handle user rejection specifically
      if (err.code === 4001) {
        setError('Transaction was rejected. Please try again to complete your payment.');
      } else {
        setError(err.message || 'Failed to process payment');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          product: item.id,
        })),
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
        itemsPrice: totalAmount,
        taxPrice: taxAmount,
        shippingPrice: 0,
        totalPrice: totalOrderAmount,
      };
      
      const createdOrder = await createOrder(orderData);
      setOrderId(createdOrder._id);
      
      if (paymentMethod === 'MetaMask') {
        // Connect wallet right away
        if (!walletConnected) {
          await connectWallet();
        }
      } else {
        dispatch(clearCart());
        navigate(`/order/${createdOrder._id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
        } else {
          setWalletAddress('');
          setWalletConnected(false);
        }
      });

      window.ethereum.on('chainChanged', () => {
        // Check if on the right network
        checkMetaMaskStatus();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);
  
  return (
    <div className="bg-coffee-light min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-coffee-dark text-center">Checkout</h1>
        
        {paymentSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Payment successful! Redirecting to your order details...
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-coffee-dark">Shipping Address</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coffee-primary"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coffee-primary"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="postalCode" className="block text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coffee-primary"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="country" className="block text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coffee-primary"
                    required
                  />
                </div>
                
                <h2 className="text-xl font-semibold mb-4 text-coffee-dark">Payment Method</h2>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="metamask"
                      name="paymentMethod"
                      value="MetaMask"
                      checked={paymentMethod === 'MetaMask'}
                      onChange={() => setPaymentMethod('MetaMask')}
                      className="mr-2"
                    />
                    <label htmlFor="metamask" className="flex items-center">
                      <img src="/images/metamask-logo.png" alt="MetaMask" className="h-6 w-6 mr-2" onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = 'none';
                      }}/>
                      Pay with MetaMask (TLOS)
                      {walletConnected && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Connected
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="creditcard"
                      name="paymentMethod"
                      value="CreditCard"
                      checked={paymentMethod === 'CreditCard'}
                      onChange={() => setPaymentMethod('CreditCard')}
                      className="mr-2"
                    />
                    <label htmlFor="creditcard">Credit Card</label>
                  </div>
                </div>
                
                {/* Connect MetaMask button if not connected */}
                {paymentMethod === 'MetaMask' && !walletConnected && !orderId && (
                  <div className="mb-4">
                    <button 
                      type="button"
                      onClick={connectWallet}
                      className="w-full bg-coffee-secondary hover:bg-yellow-600 text-coffee-dark py-3 px-4 rounded-full transition duration-300 mb-4"
                      disabled={loading}
                    >
                      {loading ? 'Connecting...' : 'Connect MetaMask Wallet'}
                    </button>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-coffee-primary hover:bg-coffee-dark text-white py-3 px-4 rounded-full transition duration-300"
                  disabled={loading || items.length === 0 || (paymentMethod === 'MetaMask' && !walletConnected && !isMetaMaskInstalled())}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4 text-coffee-dark">Order Summary</h2>
              <div className="border-b border-gray-100 mb-4">
                <h3 className="font-semibold mb-2">Items ({items.length}):</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-b border-gray-100 py-2 mb-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (7%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg text-coffee-dark mb-4">
                <span>Total:</span>
                <span>${totalOrderAmount.toFixed(2)}</span>
              </div>
              
              {orderId && paymentMethod === 'MetaMask' && (
                <div className="mt-4">
                  <button 
                    onClick={processPayment}
                    className="w-full bg-coffee-secondary hover:bg-coffee-tertiary text-coffee-dark font-medium py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
                    disabled={loading || paymentSuccess}
                  >
                    {loading ? 'Processing Payment...' : paymentSuccess ? 'Payment Complete!' : 
                     !walletConnected ? 'Connect MetaMask' : 
                     !networkReady ? `Switch to ${ACTIVE_NETWORK.chainName}` : 
                     'Complete Payment with MetaMask'}
                  </button>
                  {walletConnected && (
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      <p>Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</p>
                      {!networkReady && (
                        <p className="text-amber-500 mt-1">Please switch to {ACTIVE_NETWORK.chainName} network</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 