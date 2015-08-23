/* 
 * @Author: renjithks
 * @Date:   2015-08-16 15:36:08
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-22 00:29:25
 */

Ext.define('Pyo.customer.view.user.UserAccountView', {
  extend: 'Pyo.customer.view.Main',
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
    this.down('#address-list').setData(userDetails.address);
  }
});

Ext.define('AddressInnerItem', {
  extend: 'Ext.Panel',
  xtype: 'addresstinneritem',

  config: {
    itemId: 'addressinneritem',
    flex: 2,
    /**
     * Object with product's data
     */
    defaults: {
      cls: ['account-address-list']
    },
    layout: 'vbox',
    items: [{
      xtype: 'label',
      itemId: 'address1'
    }, {
      xtype: 'label',
      itemId: 'address2'
    }]
  },

  setAddress1: function(name) {
    this.down("#address1").setHtml(name);
  },
  setAddress2: function(name) {
    this.down("#address2").setHtml(name);
  }
});

Ext.define('AddressListItem', {
  extend: 'Ext.dataview.component.DataItem',
  xtype: 'addresslistitem',

  config: {
    itemId: 'addresslistitem',
    storeId: null,
    layout: 'fit',
    cls: 'addresslistitem-cls',

    dataMap: {
      // Map product's data to dataItem setter
      getAddressinneritem: {
        setAddress1: 'address1',
        setAddress2: 'address2'
      }
    },
    addressinneritem: {
      flex: 2
    },
    editButton: {
      iconCls: 'pencil',
      iconMask: true,
      ui: 'plain',
      itemId: "edit-address"
    },

    layout: {
      type: 'hbox',
      align: 'center'
    }
  },

  applyAddressinneritem: function(config) {
    return Ext.factory(config,
      AddressInnerItem,
      this.getAddressinneritem());
  },

  updateAddressinneritem: function(newItemLine, oldItemLine) {
    if (oldItemLine) {

      this.remove(oldItemLine);
    }

    if (newItemLine) {
      // Attach lines to DataView
      this.add(newItemLine);
    }
  },

  applyEditButton: function(config) {
    return Ext.factory(config, Ext.Button, this.getEditButton());
  },

  updateEditButton: function(newEditButton, oldEditButton) {
    if (oldEditButton) {
      this.remove(oldEditButton);
    }

    if (newEditButton) {
      // add an event listeners for the `tap` event onto the new button, and tell it to call the onNameButtonTap method
      // when it happens
      newEditButton.on('tap', this.onEditButtonTap, this);

      this.add(newEditButton);
    }
  },

  onEditButtonTap: function(button, e) {
    var record = this.getRecord(),
      me = this;
    this.up('#user-account').fireEvent('editaddress', record);
  }
});