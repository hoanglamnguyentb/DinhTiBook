import { createStore } from 'vuex'

import modules from './modules'

const store = createStore({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',


//giỏ hàng
  state:{
    cart:[],
    cartTotal:0
  },
  mutations:{
    addRemoveCart(state, payload) {
      payload.toAdd?
      state.cart.push(payload.products):
      state.cart = state.cart.filter(function(object){
          return object.id !==payload.products.id
      });
      state.cartTotal = state.cart.reduce((accumlator, object)=>{
          return parseFloat(accumlator) + parseFloat(object.giaTien*object.quantity);
      },0);
      localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
      localStorage.setItem('cart',JSON.stringify(state.cart));
  
      console.log('tổng tiền',state.cartTotal)
      console.log('giỏ hàng',state.cart)
      },

    updateCart(state,payload){
      console.log('looo', payload)
      console.log('ppp', state.cart)
   
      state.cart.find(o => o.id === payload.products.id).quantity = payload.products.quantity;
      
      state.cartTotal = state.cart.reduce((accumlator, object)=>{
        return parseFloat(accumlator) + parseFloat(object.giaTien*object.quantity);
      },0);
      localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
      localStorage.setItem('cart',JSON.stringify(state.cart));

      },
      addCart(state, payload){
        if(payload.Add){
          state.cart.push(payload.products);
        }
        console.log(state.cart)
        state.cartTotal = state.cart.reduce((accumlator, object)=>{
          return parseFloat(accumlator) + parseFloat(object.giaTien * object.quantity);
        },0);
        localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
        localStorage.setItem('cart',JSON.stringify(state.cart));
      },
      updateCart1(state, payload){
        state.cart.find(o => o.id == payload.products.id).quantity += payload.newQty;
          
        state.cartTotal = state.cart.reduce((accumlator, object)=>{
          return parseFloat(accumlator) + parseFloat(object.Price * object.quantity);
        },0);
        localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
        localStorage.setItem('cart',JSON.stringify(state.cart));
      },
      clearCart(state){
        state.cart = [];
        state.cartTotal = 0;
        localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
        localStorage.setItem('cart',JSON.stringify(state.cart));
      },
      CapNhatCart(state, payload) {
        const product = state.cart.find(o => o.id === payload.products.id);
        if (product) {
          product.quantity = payload.products.quantity;
        }
        this.commit('updateCartTotal');
      },
      
    //tai lai gio hàng mà ko mất sp
    async initialiseStore(state) {
      if(localStorage.getItem('cart')){
       state.cart = JSON.parse(localStorage.getItem('cart'))
      }
      if(localStorage.getItem('cartTotal')){
      state.cartTotal = parseFloat(localStorage.getItem('cartTotal')) 
      }
      return true;
 },
  }
})

export default store

