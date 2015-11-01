/* 
 * @Author: renjithks
 * @Date:   2015-10-17 12:30:47
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-17 14:49:25
 */

'use strict';

Ext.define('Customer.view.item.ItemSearchView', {
  extend: 'Customer.view.Main',
  alias: 'widget.item-serch-view',

  config: {
    id: 'item-search-view',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'button',
      itemId: 'clear-button',
      text: 'Clear search history',
      height: '44px'
    }, {
      xtype: 'list',
      itemId: 'history-list',
      itemTpl: '{text}',
      flex: 1
    }]
  }
});
