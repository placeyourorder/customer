/* 
 * @Author: renjithks
 * @Date:   2015-06-30 23:42:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-26 02:29:27
 */

'use strict';

Ext.define('Pyo.customer.controller.order.OrderListController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'users/orders': 'showOrderList'
    },
    refs: {
      orderListView: '#order-list',
      orderList: '#order-list #list'
    },
    control: {
      orderList: {
        itemtap: '_onListItemTap'
      }
    }
  },

  showOrderList: function() {
    var me = this;
    if (this.getOrderListView()) {
      this.getOrderListView().destroy();
    }
    var view = Ext.create('Pyo.customer.view.order.OrderListView');
    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
    Ext.Viewport.setActiveItem(view);

    var url = Pyo.customer.util.Constants.SERVER_URL + '/users/orders';
    var store = Ext.create('Pyo.customer.store.order.OrderStore', {
      storeId: 'orderStore'
    });
    store.getProxy().setUrl(url);
    store.load({
      callback: function(records, operation, success) {
        if (success) {
          view.down('#list').setStore(store);
        } else {
          if (operation.getError().status == 401) {
            me.redirectTo('users/login');
          }
        }
      }
    });
  },

  _onListItemTap: function(item, num, record, ev) {
    var orderId = item.getStore().getAt(num).getData()._id;
    this.redirectTo('orders/' + orderId);
  }
});