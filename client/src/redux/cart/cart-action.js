import CartActionTypes from './cart-constants'

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
})

export const shippingOption = (option) => ({
  type: CartActionTypes.SHIPPING_OPTION,
  payload: option,
})

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
})

export const clearItem = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
})

export const updateQuantity = (item, quantity) => ({
  type: CartActionTypes.UPDATE_QUANTITY,
  payload: { item, quantity },
})

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
  payload: {},
})
