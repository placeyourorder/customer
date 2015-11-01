/* 
* @Author: renjithks
* @Date:   2015-10-17 12:59:55
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-17 13:34:27
*/

'use strict';

Ext.define('Customer.model.ItemSearchHistoryModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['text'],
    identifier: {
      type: 'uuid'
    }
  }
});