/* 
 * @Author: renjithks
 * @Date:   2015-08-10 20:13:49
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-17 04:52:19
 */

'use strict';

Ext.define('Pyo.customer.controller.MainMenuController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      menu: '#main-menu',
      menuItemStore: '#main-menu #menuItemStore',
      menuItemOrders: '#main-menu #menuItemOrders',
      menuItemAccount: '#main-menu #menuItemAccount',
      menuItemLogout: '#main-menu #menuItemLogout'
    },
    control: {
      loginButton: {
        tap: '_onLoginButtonClick'
      }
    }
  },

  launch: function() {
    var mainMenu = Ext.create('Pyo.customer.view.MainMenu');
    Ext.Viewport.setMenu(mainMenu, {
      side: 'left',
      reveal: true
    });
    var me = this;

    me.getMenuItemStore().element.on({
      tap: function(e, t) {
        me.redirectTo('stores');
        Ext.Viewport.toggleMenu('left');
      }
    });

    me.getMenuItemLogout().element.on({
      tap: function(e, t) {
        me.redirectTo('users/logout');
        Ext.Viewport.toggleMenu('left');
      }
    });

    me.getMenuItemAccount().element.on({
      tap: function(e, t) {
        me.redirectTo('users/account');
        Ext.Viewport.toggleMenu('left');
      }
    });
  }
});