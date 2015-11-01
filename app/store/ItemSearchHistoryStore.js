/* 
* @Author: renjithks
* @Date:   2015-10-17 12:57:32
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-17 13:22:17
*/

'use strict';

Ext.define('Customer.store.ItemSearchHistoryStore', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.LocalStorage'
  ],
  config: {
    model: 'Customer.model.ItemSearchHistoryModel',
    autoLoad: true,
    autoSync: true,
    proxy: {
      type: 'localstorage',
      id: 'itemsearchhistorylocalstorage'
    }
  }
});