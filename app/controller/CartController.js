/* 
 * @Author: renjithks
 * @Date:   2015-06-30 23:36:38
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-15 23:30:12
 */
Ext.define('Pyo.customer.controller.CartController', {
  extend: 'Ext.app.Controller',

  config: {
    storeId: null,
    routes: {
      'stores/:storeId/cart': 'getCartDetails'
    },
    refs: {
      cartView: 'cart-view',
      itemListView: '#cart-view #list',
      cartSubmitButton: 'cart-view #submit-button'
    },
    control: {
      itemListView: {
       // itemtap: '_itemListTap'
      }
    }
  },

  getCartDetails: function(storeId) {
    var me = this;
    var store = Ext.getStore('cartStore');
    this.setStoreId(storeId);
    this._showCart(store);
  },

  _showCart: function(store) {
    var view;
    if (null == this.getCartView()) {
      view = Ext.create('Pyo.customer.view.CartView');
    } else {
      Ext.Viewport.remove(this.getCartView());
      view = Ext.create('Pyo.customer.view.CartView');
    }
    var cart = store.getCartForStore(this.getStoreId());
    view.setData(cart);
    Ext.Viewport.setActiveItem(view);
  },

  _createOrder: function() {
    var store = Ext.getStore('cartStore');
    var cart = store.getCartForStore(this.getStoreId());
    var orderJson = {
      store_id: this.getStoreId(),
      address: cart.data.address,
      phone: cart.data.phone,
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
      },
      failure: function(conn, response, options, eOpts) {
        if (response.status == 401) {
          me.redirectTo('users/login');
        }
      }
    });
  }
});