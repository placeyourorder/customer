/* 
 * @Author: renjithks
 * @Date:   2015-10-14 01:07:46
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-17 21:42:07
 */

'use strict';

Ext.define('Customer.view.item.ItemGridView', {
  extend: 'Customer.view.Main',
  alias: 'widget.item-grid-view',

  config: {
    id: 'item-grid-view',
    barTitle: 'Items',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'dataview',
      itemId: 'grid',
      inline: true,
      itemCls: 'item-grid',
      itemTpl: Customer.view.Templates.getItemGridTpl(),
      hidden: false,
      flex: 1,
      width: '100%'
    }, {
      xtype:'label',
      itemId: 'no-data',
      hidden: true,
      flex: 1,
      html: 'No items found'
    }]
  }
});
