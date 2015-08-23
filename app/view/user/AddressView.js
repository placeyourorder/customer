/* 
 * @Author: renjithks
 * @Date:   2015-08-17 15:48:30
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-20 02:15:22
 */

Ext.define('Pyo.customer.view.user.AddressView', {
  extend: 'Pyo.customer.view.Main',
  alias: 'widget.user-address',
  config: {
    id: 'user-address',
    barTitle: 'Address',
    padding: 10,
    layout: {
      type: 'vbox',
    },
    items: [{
      xtype: 'formpanel',
      itemId: 'addressPanel',
      flex: 2,
      items: [{
        xtype: 'textfield',
        name: 'address1',
        placeHolder: 'Address 1',
        margin: 10
      }, {
        xtype: 'textfield',
        name: 'address2',
        placeHolder: 'Address 2',
        margin: 10
      }, {
        xtype: 'textfield',
        name: 'address3',
        placeHolder: 'Address 3',
        margin: 10
      }, {
        xtype: 'textfield',
        name: 'city',
        placeHolder: 'City',
        margin: 10
      }, {
        xtype: 'button',
        itemId: 'save',
        text: 'Save',
        margin: 10
      }, {
        xtype: 'button',
        itemId: 'delete',
        text: 'Delete',
        margin: 10
      }]
    }]
  },

  updateData: function(data) {
    this.callParent(arguments);
    if (!data)
      return;
    console.log(data);
    this.down('#addressPanel').setValues(data);
  }
});