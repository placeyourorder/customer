/* 
 * @Author: renjithks
 * @Date:   2015-08-16 15:36:08
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-22 12:59:29
 */

Ext.define('Customer.view.user.UserAccountView', {
  extend: 'Customer.view.Main',
  alias: 'widget.user-account',

  config: {
    id: 'user-account',
    barTitle: 'Account',
    //fullscreen: true,
    //padding: 10,
    layout: {
      type: 'vbox',
    },

    items: [{
      xtype: 'fieldset',
      title: 'About You',
      items: [{
        xtype: 'textfield',
        itemId: 'email',
        label: 'Email',
        name: 'email',
        readOnly: true
      }, {
        xtype: 'textfield',
        itemId: 'phone',
        component: {
          xtype: 'input',
          type: 'tel'
        },
        name: 'Phone',
        label: 'phone',
        readOnly: true
      }]
    }, {
      xtype: 'fieldset',
      title: 'Adderss',
      height: '40%',
      padding: 10,
      items: [{
        xtype: 'button',
        itemId: 'add-address',
        iconCls: 'add'
      }, {
        xtype: 'dataview',
        itemId: 'address-list',
        cls: ['dataview-list'],
        defaultType: 'addresslistitem',
        useComponents: true,
        height: '100%',
        width: '100%'
      }]
    }]
  },

  updateData: function(data) {
    this.callParent(arguments);
    if (!data)
      return;
    var userDetails = data.getData();
    console.log(userDetails);
    this.down('#email').setValue(userDetails.email);
    this.down('#phone').setValue(userDetails.phone);
    if(userDetails.address && userDetails.address.length) {
      this.down('#address-list').setData(userDetails.address);
    }
  }
});