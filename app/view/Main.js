Ext.define('Pyo.customer.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'Ext.TitleBar'
  ],
  config: {
    tabBarPosition: 'bottom',

    items: [{
      title: 'Welcome',
      iconCls: 'home',

      styleHtmlContent: true,
      scrollable: true,

      items: {
        docked: 'top',
        xtype: 'titlebar',
        title: 'Welcome to Sencha Touch 2'
      },

      html: [
        "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
        "contents of <a href=\"#stores\">List stores</a> - edit that file ",
        "and refresh to change what's rendered here. testing"
      ].join("")
    }]
  }
});