import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to store cart items
    totalQuantity: 0, // Total number of items in cart
    totalAmount: 0, // Total cost of items in cart
  },
  reducers: {
    // Add item to cart or increase quantity if already exists
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        // If item already exists, increase quantity by 1
        existingItem.quantity += 1;
      } else {
        // If new item, add to cart with quantity 1
        state.items.push({
          ...newItem,
          quantity: 1,
          id: Date.now() // Add unique ID for easier management
        });
      }
      
      // Update totals
      updateCartTotals(state);
    },
    
    // Remove item from cart completely
    removeItem: (state, action) => {
      const itemName = action.payload;
      // Remove the item from the array
      state.items = state.items.filter(item => item.name !== itemName);
      
      // Update totals
      updateCartTotals(state);
    },
    
    // Update quantity of specific item
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // Update the quantity
        existingItem.quantity = amount;
        
        // If quantity is 0 or negative, remove the item
        if (amount <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
      
      // Update totals
      updateCartTotals(state);
    },
    
    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  },
});

// Helper function to calculate cart totals
const updateCartTotals = (state) => {
  let totalQuantity = 0;
  let totalAmount = 0;
  
  state.items.forEach(item => {
    // Extract price from string like "$15" -> 15
    const price = parseFloat(item.cost.replace('$', ''));
    totalQuantity += item.quantity;
    totalAmount += price * item.quantity;
  });
  
  state.totalQuantity = totalQuantity;
  state.totalAmount = totalAmount;
};

// Export actions
export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

// Export reducer
export default CartSlice.reducer;