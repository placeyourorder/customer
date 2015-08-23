/* 
 * @Author: renjithks
 * @Date:   2015-06-22 01:41:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-22 01:26:39
 */
Ext.define('Pyo.customer.view.StoreListView', {
  extend: 'Pyo.customer.view.Main',
  alias: 'widget.store-list',
  config: {
    id: 'store-list',
    barTitle: 'Stores',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'selectfield',
      itemId: 'address-select',
      label: 'Stores near',
    }, {
      xtype: 'list',
      itemId: 'list',
      itemTpl: '{title}',
      sorters: 'title',
      height: '100%',
      width: '100%',
    }]
  },

  applyItems: function(newItems, oldItems) {
    return this.callParent([newItems, oldItems]);
  }
});