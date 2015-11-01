/* 
 * @Author: renjithks
 * @Date:   2015-08-10 20:13:49
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-16 23:59:10
 */

'use strict';

Ext.define('Customer.controller.MainMenuController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      menu: '#main-menu',
      menuItemStore: '#main-menu #menuItemStore',
      menuItemOrders: '#main-menu #menuItemOrders',
      menuItemCarts: '#main-menu #menuItemCarts',
      menuItemAccount: '#main-menu #menuItemAccount',
      menuItemLogout: '#main-menu #menuItemLogout',
      menuItemCategory: '#main-menu #menuCategory'
    },
    control: {
      loginButton: {
        tap: '_onLoginButtonClick'
      },
      menuItemCategory: {
        leafitemtap: 'onLeafItemTap'
      }
    }
  },

  launch: function() {
    var mainMenu = Ext.create('Customer.view.MainMenu');
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

    me.getMenuItemOrders().element.on({
      tap: function(e, t) {
        me.redirectTo('users/orders');
        Ext.Viewport.toggleMenu('left');
      }
    });

    me.getMenuItemCarts().element.on({
      tap: function(e, t) {
        me.redirectTo('users/carts');
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
  },

  onLeafItemTap: function(list, index, target, record) {
    //var parentCategory = record.parentNode.get('text') || '';
    Ext.Viewport.toggleMenu('left');
    var subCategory = record.get('text');
    if (subCategory) {
      var store = Ext.getStore('storeList');
      if (store) {
        var storeId = store.getAt(0).get('_id');
        var queryParams = Ext.urlEncode({
          tags: subCategory
        });
        this.redirectTo('stores/' + storeId + '/items/?' + queryParams);
      } else {
        Ext.Msg.alert('Something went wrong, please logout and login');
      }
    }
  }
});
