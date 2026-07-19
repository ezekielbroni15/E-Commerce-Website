import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {
    monitor: 1,
    gamepad: 2,
  },
  wishlist: ['duffle', 'speaker', 'gamepad', 'jacket'],
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
    addToWishlist(state, action) {
      if (!state.wishlist.includes(action.payload)) state.wishlist.push(action.payload)
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter((id) => id !== action.payload)
    },
    toggleWishlist(state, action) {
      if (state.wishlist.includes(action.payload)) {
        state.wishlist = state.wishlist.filter((id) => id !== action.payload)
      } else {
        state.wishlist.push(action.payload)
      }
    },
  },
})

export const {
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
  toggleWishlist,
  updateQuantity,
} = cartSlice.actions
export default cartSlice.reducer
