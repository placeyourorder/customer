/* 
 * @Author: renjithks
 * @Date:   2015-07-14 01:46:42
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-12 14:42:36
 */

Ext.define('Pyo.customer.view.CategoryView', {
  extend: 'Pyo.customer.view.Main',
  alias: 'widget.category-view',
  config: {
    id: 'category-view',
    barTitle: 'Categories',
    layout: {
      type: 'vbox'
    },
    items: [{
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