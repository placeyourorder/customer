/* 
 * @Author: renjithks
 * @Date:   2015-06-21 22:53:57
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-22 18:32:36
 */

Ext.define('Pyo.customer.view.Main', {
  extend: 'Ext.Container',
  xtype: 'mainPanel',
  requires: [
    'Ext.Panel'
  ],
  config: {
    href: null,
    barTitle: 'Navigation',
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
      items: [{
        itemId: 'menu-button',
        iconCls: 'list',
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
      align: align,
      badgeText: (text == 0 ? null : text),
      listeners: {
        tap: onClick
      }
    });
  },

  updateButtonbadge: function(id, text) {
    var bar = this.down('#main-title-bar');
    var button = bar.down('#'+id);
    if (button) {
      button.setBadgeText((text == 0 ? null : text));
    }
  }
});