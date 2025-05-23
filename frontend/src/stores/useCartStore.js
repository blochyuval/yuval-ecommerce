import {create} from 'zustand';
import axios from '../lib/axios';
import {toast} from 'react-hot-toast';


export const useCartStore = create((set, get) => ({
cart: [],
coupon: null,
total: 0,
subtotal: 0,
isCouponApplied: false,

getMyCoupon: async () => {
  try {
    const res = await axios.get('/coupons');
    set({ coupon: res.data })
  } catch (error) {
    console.error('Error fetching coupon', error);
  }
},

applyCoupon: async (code) => {
  try {
    const res = await axios.post('/coupons/validate', { code });
    set({ coupon: res.data, isCouponApplied: true });
    get().calculateTotals();
    toast.success('Coupon applied successfully')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to apply coupon');
  }
},

removeCoupon: () => {
  set({ coupon: null, isCouponApplied: false });
  get().calculateTotals();
  toast.success('Coupon removed')
},

getCartItems: async () => {
  try {
    const res = await axios.get('/cart');
    set ({ cart: res.data});
    get().calculateTotals();
  } catch (error) {
    set({cart: []})
    toast.error(error.response.data.message || 'An error accurred')
  }
},

clearCart: async() => {

  try{
    await axios.delete('/cart')
    set({ cart: [], coupon: null, total: 0, subtotal: 0 })
  }catch {
    toast.error('Error clearing cart', error.message)
  }
    
  },

addToCart: async(product) => {
  try {
    await axios.post('/cart', {productId: product._id});
    toast.success('Product Added to cart');
    set((prevState) => {
      const existingItem = prevState.cart.find(item => item._id === product._id);
      
      const newCart = existingItem ? prevState.cart.map(item => item._id === product._id ? {...item, quantity: item.quantity + 1} : item) : [...prevState.cart, {...product, quantity: 1}];
      return {cart: newCart}
    })
    get().calculateTotals();
  } catch (error) {
    toast.error(error.response.data.message || 'An error occurred')
  }
},

removeFromCart: async(productId) => {
  try {
    const res = await axios.delete('/cart', { data: { productId } });

    set((prev) => 
      ({
        cart: prev.cart.filter(product => product._id !== productId)
      }));

      get().calculateTotals()
  } catch (error) {
    toast.error(error.response.data.message || 'Error in deleting product')
  }
},

updateQuantity: async(productId, quantity) => {
  if(quantity === 0) {
    get().removeFromCart(productId)
    return;
  }

  try {
    await axios.put(`/cart/${productId}`);

  set((prev) => ({
    cart: prev.cart.map(product => product._id === productId ? {...product, quantity} : product)
  }))
    get().calculateTotals()
  } catch (error) {
    toast.error(error.response.data.message || 'Error updating quantity')
  }
  
},

calculateTotals: () => {
  const {cart, coupon} = get();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let total = subtotal;

  if(coupon){
    const discount = subtotal * (coupon.discountPercentage / 100);
    total = subtotal - discount;
  }
  set({ subtotal, total })
},


}))

