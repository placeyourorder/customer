/*
* @Author: renjithks
* @Date:   2015-06-30 23:54:50
* @Last Modified by:   renjithks
* @Last Modified time: 2015-08-24 00:20:54
*/

'use strict';

Ext.define('Customer.store.order.OrderStore', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.JsonP'
  ],
  config: {
    model: 'Customer.model.order.OrderModel',
    proxy: {
      type: 'ajax',
      url: '',
      //callbackKey: 'callback'
    }
  }
});