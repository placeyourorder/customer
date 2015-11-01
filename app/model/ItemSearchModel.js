/* 
* @Author: renjithks
* @Date:   2015-10-12 16:20:14
* @Last Modified by:   renjithks
* @Last Modified time: 2015-10-13 18:57:27
*/

'use strict';

Ext.define('Customer.model.ItemSearchModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['has_more', 'item_count', 'pageCount', 'data'],
  }
});