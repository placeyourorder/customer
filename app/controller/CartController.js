/* 
 * @Author: renjithks
 * @Date:   2015-06-30 23:36:38
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-18 22:30:10
 */
Ext.define('Customer.controller.CartController', {
  extend: 'Ext.app.Controller',

  config: {
    storeId: null,
    routes: {
      'stores/:storeId/cart': 'getCartDetails'
    },
    refs: {
      cartView: 'cart-view',
      itemListView: '#cart-view #list',
      cartCheckoutButton: 'cart-view #checkout-button'
    },
    control: {
      cartCheckoutButton: {
        tap: '_cartCheckout'
      },
      cartView: {
        ordertypechange: '_onOrderTypeChange'
      }
    }
  },

  launch: function() {
    var cartView = Ext.create('Customer.view.CartView');
  },

  getCartDetails: function(storeId) {
    var me = this;
    var store = Ext.getStore('cartStore');
    this.setStoreId(storeId);
    this._showCart(store);
  },

  _showCart: function(store) {
    var view = this.getCartView();
    var cart = store.getCartForStore(this.getStoreId());
    view.setData(cart);
    Ext.Viewport.setActiveItem(view);
  },

  _cartCheckout: function() {
    this.redirectTo('stores/'.concat(this.getStoreId()).concat('/cart/checkout'));
  },

  _onOrderTypeChange: function(type) {
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    cart.set('order_type', type);
  }
});
