/* 
 * @Author: renjithks
 * @Date:   2015-08-22 17:09:26
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-23 23:48:15
 */

'use strict';

Ext.define('Pyo.customer.controller.cart.CheckoutController', {
  extend: 'Ext.app.Controller',

  config: {
    storeId: null,
    routes: {
      'stores/:storeId/cart/checkout': '_showView'
    },
    refs: {
      orderCheckoutView: 'ordercheckout-view',
      itemListView: '#ordercheckout-view #list',
      orderSubmitButton: '#ordercheckout-view #submit-button'
    },
    control: {
      orderSubmitButton: {
        tap: '_orderSubmit'
      }
    }
  },

  _showView: function(storeId) {
    var me = this;
    var store = Ext.getStore('cartStore');
    this.setStoreId(storeId);
    this._showOrder(store);
  },

  _showOrder: function(store) {
    var view;
    if (null == this.getOrderCheckoutView()) {
      view = Ext.create('Pyo.customer.view.cart.CheckoutView');
    } else {
      this.getOrderCheckoutView().destroy();
      view = Ext.create('Pyo.customer.view.cart.CheckoutView');
    }
    var cart = store.getCartForStore(this.getStoreId());
    view.setData(cart);
    Ext.Viewport.setActiveItem(view);
  },

  _orderSubmit: function() {
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    var orderJson = {
      store_id: this.getStoreId(),
      store_details: cart.data.store_details,
      address: cart.data.address,
      phone: cart.data.phone,
      order_type: cart.data.order_type,
      total_price: cart.data.total_price,
      line_items: []
    };
    var lineItems = orderJson.line_items;
    _.each(cart.lineItemsStore.getData().items, function(item) {
      lineItems.push({
        item_id: item.data.item_id,
        quantity: item.data.quantity,
        name: item.data.name,
        variant: {
          _id: item.getVariant().get('_id'),
          uom: item.getVariant().get('uom'),
          quantity: item.getVariant().get('quantity'),
        }
      });
    });
    var me = this;
    Ext.Ajax.request({
      url: Pyo.customer.util.Constants.SERVER_URL + '/stores/' + this.getStoreId() + '/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: orderJson,
      success: function(conn, response, options, eOpts) {
        store.getProxy().clear();
        store.data.clear();
        store.sync();
        me.redirectTo('users/orders');
      },
      failure: function(conn, response, options, eOpts) {
        if (response.status == 401) {
          me.redirectTo('users/login');
        }
      }
    });
  }
});