import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const totalCartAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return totalCartAmount.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Checkout functionality will be added in the future!');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      amount: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        amount: item.quantity - 1
      }));
    } else {
      // If quantity is 1, remove the item completely
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  };

  // If cart is empty, show empty cart message
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>🛒 Your Cart is Empty</h2>
          <p>Add some beautiful plants to your cart!</p>
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p className="cart-summary">
          You have <span className="item-count">{cart.length}</span> item{cart.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>
      
      <div className="cart-items-list">
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <div className="cart-item-image-container">
              <img className="cart-item-image" src={item.image} alt={item.name} />
            </div>
            
            <div className="cart-item-details">
              <div className="cart-item-header">
                <h3 className="cart-item-name">{item.name}</h3>
                <span className="cart-item-unit-price">{item.cost} each</span>
              </div>
              
              <p className="cart-item-description">{item.description}</p>
              
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn decrease-btn" 
                    onClick={() => handleDecrement(item)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn increase-btn" 
                    onClick={() => handleIncrement(item)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                
                <div className="cart-item-subtotal">
                  <span className="subtotal-label">Subtotal:</span>
                  <span className="subtotal-value">${calculateTotalCost(item)}</span>
                </div>
              </div>
              
              <button 
                className="remove-item-btn" 
                onClick={() => handleRemove(item)}
                aria-label="Remove item from cart"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary-section">
        <div className="cart-total">
          <div className="total-line">
            <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)}):</span>
            <span>${calculateTotalAmount()}</span>
          </div>
          <div className="total-line shipping">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="total-line grand-total">
            <span><strong>Total Amount:</strong></span>
            <span><strong>${calculateTotalAmount()}</strong></span>
          </div>
        </div>
        
        <div className="cart-actions">
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            ← Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout →
          </button>
        </div>
        
        <p className="secure-checkout-note">
          🔒 Secure checkout. Your information is safe with us.
        </p>
      </div>
    </div>
  );
};

export default CartItem;