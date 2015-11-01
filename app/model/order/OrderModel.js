/*
 * @Author: renjithks
 * @Date:   2015-07-01 00:02:01
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-26 01:40:54
 */

'use strict';

Ext.define('Customer.model.order.OrderModel', {
  extend: 'Ext.data.Model',
  config: {
    fields: ['_id', 'store_id', 'address', 'status', 'created_at', 'updated_at', 'total_price', 'store_details', 'phone', 'line_items', 'address'],
  }
});