import React, { useState, useEffect } from 'react';

const ShoppingCart = () => {
  // Initialize cart items from local storage or empty array
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from local storage on mount
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    // Save cart items to local storage whenever cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid quantities

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Optional: Add new item dynamically (example item here)
  const addItem = (newItem) => {
    // Check if item already in cart — increment quantity if so
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Format price nicely
  const formatPrice = (price) =>
    price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some items!</p>
      ) : (
        <ul>
          {cartItems.map(({ id, name, price, quantity }) => (
            <li key={id} style={{ marginBottom: '1rem' }}>
              <strong>{name}</strong> — {formatPrice(price)} ×{' '}
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) updateQuantity(id, value);
                }}
                style={{ width: '50px', marginLeft: '0.5rem', marginRight: '0.5rem' }}
              />
              <button onClick={() => removeItem(id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: {formatPrice(calculateTotalPrice())}</h3>

      {/* Example button to add a new item dynamically */}
      <button
        onClick={() =>
          addItem({ id: 'new-item-1', name: 'Sample Item', price: 19.99 })
        }
        style={{ marginTop: '1rem' }}
      >
        Add Sample Item
      </button>
    </div>
  );
};

export default ShoppingCart;
