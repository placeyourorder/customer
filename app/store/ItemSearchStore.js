/* 
* @Author: renjithks
* @Date:   2015-10-12 16:18:42
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-12 16:19:55
*/

'use strict';

Ext.define('Customer.store.ItemSearchStore', {
  extend: 'Ext.data.Store',

  config: {
    model: 'Customer.model.ItemSearchModel',
    proxy: {
      type: 'ajax'
    }
  }
});