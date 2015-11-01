/* 
 * @Author: renjithks
 * @Date:   2015-07-14 01:46:59
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-21 21:54:04
 */

'use strict';

Ext.define('Customer.model.CategoryModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'text',
      type: 'string'
    }]
  }
});


