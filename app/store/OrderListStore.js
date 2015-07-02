/*
* @Author: renjithks
* @Date:   2015-06-30 23:54:50
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-01 23:37:26
*/

'use strict';

Ext.define('Pyo.customer.store.OrderListStore', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.JsonP'
  ],
  config: {
    model: 'Pyo.customer.model.OrderListModel',
    proxy: {
      type: 'ajax',
      url: '',
      //callbackKey: 'callback'
    }
  }
});