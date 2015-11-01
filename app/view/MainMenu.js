/* 
 * @Author: renjithks
 * @Date:   2015-08-10 16:49:42
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-17 15:21:54
 */

'use strict';
Ext.define('Customer.view.MainMenu', {
  extend: 'Ext.Menu',
  requires: [
    'Ext.ux.AccordionList',
  ],
  config: {
    id: 'main-menu',
    cls: 'main-menu',
    width: '40%',
    layout: 'vbox',
    items: [{
      xtype: 'button',
      iconCls: 'browser',
      itemId: 'menuItemStore',
      html: 'Stores',
      cls: 'menu-item'
    }, {
      xtype: 'button',
      iconCls: 'box',
      html: 'Orders',
      itemId: 'menuItemOrders',
      cls: 'menu-item',
    }, {
      xtype: 'button',
      iconCls: 'cart',
      html: 'Carts',
      itemId: 'menuItemCarts',
      cls: 'menu-item'
    }, {
      xtype: 'button',
      iconCls: 'user',
      html: 'Account',
      itemId: 'menuItemAccount',
      cls: 'menu-item'
    }, {
      xtype: 'button',
      iconCls: 'power',
      html: 'Logout',
      itemId: 'menuItemLogout',
      cls: 'menu-item'
    }, {
      xtype: 'accordionlist',
      itemId: 'menuCategory',
      store: Ext.create('Customer.store.CategoryStore', {
        storeId: 'CategoryStore'
      }),
      listeners: {
        initialize: function() {
          this.load();
        }
      },
      singleMode: true,
      indent: true,
      flex: 1
    }]
  }
});
