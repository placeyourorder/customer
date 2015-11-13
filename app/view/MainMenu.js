/* 
 * @Author: renjithks
 * @Date:   2015-08-10 16:49:42
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-10 17:42:59
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
    width: '50%',
    layout: 'vbox',
    defaults: {
        cls: ['md-trasparent', 'menu-item']
    },
    items: [{
      xtype: 'button',
      iconCls: 'browser',
      itemId: 'menuItemStore',
      html: 'Stores'
    }, {
      xtype: 'button',
      iconCls: 'box',
      html: 'Orders',
      itemId: 'menuItemOrders'
    }, {
      xtype: 'button',
      iconCls: 'cart',
      html: 'Carts',
      itemId: 'menuItemCarts'
    }, {
      xtype: 'button',
      iconCls: 'user',
      html: 'Account',
      itemId: 'menuItemAccount'
    }, {
      xtype: 'button',
      iconCls: 'power',
      html: 'Logout',
      itemId: 'menuItemLogout'
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
      flex: 1,
      useSelectedHighlights: false,
      showCount: true,
      cls: ['x-accordion-list']
    }]
  }
});
