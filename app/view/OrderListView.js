/* 
 * @Author: renjithks
 * @Date:   2015-07-01 00:21:55
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-07-02 23:46:35
 */

'use strict';

Ext.define('Pyo.customer.view.OrderListView', {
  extend: 'Ext.Panel',
  alias: 'widget.order-list',
  requires: [
    'Ext.TitleBar'
  ],
  config: {
    id: 'order-list',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      ui: 'light',
      title: 'List of Orders',
    }, {
      xtype: 'list',
      itemId: 'list',
      height: '100%',
      width: '100%',
      itemTpl: new Ext.XTemplate('<div style="display:-webkit-box"><div style="width:20%">{_id}</div>',
        '<div style="width:20%">{status}</div>',
        '<div style="width:20%">{created_at}</div>',
        '<div style="width:20%">{updated_at}</div>',
        '<div style="width:20%">{total_price}</div>',
        '</div>'),
      sorters: 'updated_at'
    }]
  }
});