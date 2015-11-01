/* 
 * @Author: renjithks
 * @Date:   2015-06-22 01:41:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-06 01:30:11
 */
Ext.define('Customer.view.StoreListView', {
  extend: 'Customer.view.Main',
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
      cls: 'store-list',
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