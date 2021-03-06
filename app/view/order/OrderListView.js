/* 
 * @Author: renjithks
 * @Date:   2015-07-01 00:21:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-06 01:19:56
 */

'use strict';

Ext.define('Customer.view.order.OrderListView', {
  extend: 'Customer.view.Main',
  alias: 'widget.order-list',
  config: {
    id: 'order-list',
    barTitle: 'Orders',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'list',
      itemId: 'list',
      height: '100%',
      width: '100%',
      cls: 'order-list',
      itemTpl: new Ext.XTemplate('<div style="display:-webkit-box"><div style="width:25%">{store_details.title}</div>',
        '<div style="width:25%">{status}</div>',
        '<div style="width:25%">{[Ext.util.Format.date(values.created_at, "d,M")]}</div>',
        '<div style="width:25%">Rs {total_price}</div>',
        '</div>'),
      sorters: 'created_at'
    }]
  }
});