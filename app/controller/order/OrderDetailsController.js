/* 
 * @Author: renjithks
 * @Date:   2015-08-24 00:03:09
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-26 02:37:07
 */

'use strict';

Ext.define('Customer.controller.order.OrderDetailsController', {
  extend: 'Ext.app.Controller',

  config: {
    orderId: null,
    routes: {
      'orders/:orderId': '_showView'
    },
    refs: {
      orderDetailsView: 'orderdetails-view',
      itemListView: '#orderdetails-view #list',
      orderChangeButton: '#orderdetails-view #change-button'
    },
    control: {
      orderChangeButton: {
        tap: '_orderChange'
      }
    }
  },

  _showView: function(orderId) {
    var me = this;
    this.setOrderId(orderId);
    this._showOrder(orderId);
  },

  _showOrder: function(orderId) {
    var view;
    if (null == this.getOrderDetailsView()) {
      view = Ext.create('Customer.view.order.OrderDetailsView');
    } else {
      this.getOrderDetailsView().destroy();
      view = Ext.create('Customer.view.order.OrderDetailsView');
    }
    var store = Ext.getStore('orderStore');
    var order = store.findRecord('_id', orderId);
    view.setData(order);
    Ext.Viewport.setActiveItem(view);
  }
});