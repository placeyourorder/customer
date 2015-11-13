/* 
 * @Author: renjithks
 * @Date:   2015-06-21 22:53:57
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-11 01:20:21
 */

Ext.define('Customer.view.Main', {
  extend: 'Ext.Container',
  xtype: 'mainPanel',
  requires: [
    'Ext.Panel'
  ],
  config: {
    href: null,
    barTitle: null,
    layout: 'vbox',
    items: []
  },
  applyItems: function(newItems, oldItems) {
    newItems.push({
      xtype: 'titlebar',
      itemId: 'main-title-bar',
      cls: 'main-title-bar',
      docked: 'top',
      title: this.getBarTitle(),
      layout: 'hbox',
      items: [{
        itemId: 'menu-button',
        iconCls: 'menu',
        align: 'left'
      }]
    });
    return this.callParent([newItems, oldItems]);
  },

  initialize: function() {
    this.callParent();
    var me = this;
    me.down('#menu-button').on({
      tap: function(e, t) {
        Ext.Viewport.toggleMenu('left');
      }
    });
  },

  addTitleBarButton: function(id, iconCls, align, text, onClick) {
    var me = this;
    var bar = me.down('#main-title-bar');

    bar.add({
      itemId: id,
      iconCls: iconCls,
      align: align || 'riht',
      badgeText: (text == 0 ? null : text),
      listeners: {
        tap: onClick
      }
    });
  },

  showTitleBarButton: function(id) {
    var me = this;
    var bar = me.down('#main-title-bar');
    var button = bar.down('#id');
    if (button) {
      button.show(true);
    }
  },

  hideTitleBarButton: function(id) {
    var me = this;
    var bar = me.down('#main-title-bar');
    var button = bar.down('#id');
    if (button) {
      button.hide(true);
    }
  },

  updateButtonbadge: function(id, text) {
    var bar = this.down('#main-title-bar');
    var button = bar.down('#' + id);
    if (button) {
      button.setBadgeText((text == 0 ? null : text));
    }
  },

  addSearchField: function() {
    var me = this;
    var bar = me.down('#main-title-bar');
    bar.add({
      xtype: 'searchfield',
      itemId: 'itemSearch',
      autoComplete: true,
      docked: 'right',
      flex: 1,
      placeHolder: 'Search'
    });
  }
});
