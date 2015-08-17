/* 
 * @Author: renjithks
 * @Date:   2015-08-09 21:38:53
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-09 23:19:54
 */

'use strict';

Ext.define('Pyo.customer.store.LocationStore', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.LocalStorage'
  ],
  config: {
    model: 'Pyo.customer.model.LocationModel',
    autoLoad: true,
    // loginlocalstorage will be auto sync when this store is updated
    autoSync: true,
    proxy: {
      type: 'localstorage',
      id: 'locationlocalstorage'
    }
  }
});