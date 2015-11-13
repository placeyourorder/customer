/* 
 * @Author: renjithks
 * @Date:   2015-10-21 01:42:33
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-04 23:16:45
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
      store: Ext.create('Customer.store.user.AddressStore')
    }, {
      xtype: 'button',
      height: '44px',
      text: 'Next - Set Instructions',
      itemId: 'next',
      docked: 'bottom',
      disabled: true
    }, {
      xtype: 'button',
      text: 'Add new address',
      height: '44px',
      docked: 'bottom'
    }]
  }
})
