/* 
 * @Author: renjithks
 * @Date:   2015-07-14 01:46:42
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-06 03:34:48
 */

Ext.define('Customer.view.CategoryView', {
  extend: 'Customer.view.Main',
  alias: 'widget.category-view',
  config: {
    id: 'category-view',
    barTitle: 'Categories',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'searchfield',
      itemId: 'item-search',
      name: 'query'
    }, {
      xtype: 'list',
      itemId: 'list',
      height: '100%',
      width: '100%',
      itemTpl: '{title}'
    }]
  },

  applyItems: function(newItems, oldItems) {
    return this.callParent([newItems, oldItems]);
  }
});