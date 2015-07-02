/* 
 * @Author: renjithks
 * @Date:   2015-06-30 23:42:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-02 23:48:24
 */

'use strict';

Ext.define('Pyo.customer.controller.OrderListController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'stores/:storeId/orders': 'showOrderDetails'
    },
    refs: {
      orderListView: '#order-detail-view',
      cartSubmitBUtton: 'cart-view #submit-button'
    },
    control: {
      cartSubmitBUtton: {
        tap: '_createOrder'
      }
    }
  },

  showOrderDetails: function(storeId) {
    var view = Ext.create('Pyo.customer.view.OrderListView');
    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
    Ext.Viewport.setActiveItem(view);

    var url = Pyo.customer.util.Constants.SERVER_URL + '/stores/' + storeId + '/orders';
    var store = Ext.create('Pyo.customer.store.OrderListStore');
    store.getProxy().setUrl(url);
    store.load({
      callback: function() {
        console.log(store);
        view.down('#list').setStore(store);
      }
    });
  },
});