/*
 * @Author: renjithks
 * @Date:   2015-09-06 16:34:51
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-06 22:24:26
 */

'use strict';

Ext.define('Customer.controller.cart.CartListController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'users/carts': '_showView'
    },
    refs: {
      cartListView: '#cart-list-view'
    },
    control: {
      cartListView: {
        cartclick: '_onCartItemClick'
      }
    }
  },

  _showView: function() {
    var me = this;
    var store = Ext.getStore('cartStore');
    this._showCarts(store);
  },

  _showCarts: function(carts) {
    var view = this.getCartListView();
    if(!view) {
      view = Ext.create('Customer.view.cart.CartListView');
    }
    var data = carts ? carts : null;
    view.setData(data);
    Ext.Viewport.setActiveItem(view);
  },

  _onCartItemClick: function(cart) {
    this.redirectTo('stores/'+ cart.data.store_id + '/cart');
  }
});