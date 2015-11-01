/* 
 * @Author: renjithks
 * @Date:   2015-10-22 12:48:02
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-01 23:18:50
 */

'use strict';

Ext.define('AddressInnerItem', {
  extend: 'Ext.Container',
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
    layout: 'hbox',
    items: [{
      layout: 'vbox',
      items: [{
        xtype: 'label',
        itemId: 'address1'
      }, {
        xtype: 'label',
        itemId: 'address2'
      }]
    }, {
      xtype: 'button',
      iconCls: 'check',
      iconMask: true,
      ui: 'plain',
      itemId: 'select-address',
      docked: 'right',
      hidden: true
    }]
  },

  setAddress1: function(name) {
    this.down("#address1").setHtml(name);
  },
  setAddress2: function(name) {
    this.down("#address2").setHtml(name);
  },
  setSelectIcon: function(selected) {
    this.down('#select-address').setHidden(!selected);
  }
});

Ext.define('Customer.view.user.AddressListView', {
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
        setAddress2: 'address2',
        setSelectIcon: 'selected'
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
    var me = this;
    if (oldItemLine) {

      me.remove(oldItemLine);
    }

    if (newItemLine) {
      newItemLine.addListener({
        element: 'element',
        tap: function() {
          var record = me.getRecord();
          me.fireEvent('addresstap', record);
        }
      });
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
    var record = this.getRecord();
    this.fireEvent('editaddress', record);
  }
});
