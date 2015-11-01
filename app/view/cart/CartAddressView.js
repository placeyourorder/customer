/* 
 * @Author: renjithks
 * @Date:   2015-10-21 01:42:33
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-23 00:58:57
 */

'use strict';

Ext.define('Customer.view.cart.CartAddressView', {
  extend: 'Ext.Container',
  alias: 'widget.cart-address-view',

  config: {
    id: 'cart-address-view',
    layout: 'vbox',
    items: [{
      xtype: 'label',
      html: 'Address Container',
      height: '44px'
    }, {
      xtype: 'dataview',
      itemId: 'address-list',
      cls: ['dataview-list'],
      defaultType: 'addresslistitem',
      useComponents: true,
      showSelectIcon: true,
      width: '100%',
      flex: 1,
      store: Ext.create('Customer.store.user.AddressStore'),
      // store: {
      //   fields: ['address1', 'address2', 'address3', 'city']
      // }
    }, {
      xtype: 'button',
      text: 'Add new address',
      height: '44px',
      docked: 'bottom'
    }]
  }
})
