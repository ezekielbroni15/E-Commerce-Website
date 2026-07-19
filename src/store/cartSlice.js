import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {
    monitor: 1,
    gamepad: 2,
  },
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const id = action.payload
      state.items[id] = (state.items[id] || 0) + 1
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        delete state.items[id]
      } else {
        state.items[id] = quantity
      }
    },
    removeFromCart(state, action) {
      delete state.items[action.payload]
    },
  },
})

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
