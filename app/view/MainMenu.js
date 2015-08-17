/* 
 * @Author: renjithks
 * @Date:   2015-08-10 16:49:42
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-16 01:56:24
 */

'use strict';
Ext.define('Pyo.customer.view.MainMenu', {
  extend: 'Ext.Menu',
  config: {
    id: 'main-menu',
    cls: 'main-menu',
    width: '30%',
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
    }]
  }
});