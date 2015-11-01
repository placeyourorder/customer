/* 
 * @Author: renjithks
 * @Date:   2015-07-29 17:35:10
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-18 00:05:50
 */

'use strict';

Ext.define('Customer.controller.MainController', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      mainMenu: '#main-menu'
    },
    control: {
      mainMenu: {
        show: 'onMenuVisible',
        hide: 'onMenuHidden'
      }
    }
  },
  // Transitions
  slideLeftTransition: {
    type: 'slide',
    direction: 'left'
  },
  slideRightTransition: {
    type: 'slide',
    direction: 'right'
  },

  getActionFromHistory: function() {
    var me = this;
    var history = this.getApplication().getHistory();
    var actions = (history.getActions() || []).slice();
    var location = String(window.location.hash).substr(1);
    actions.pop();
    return _.find(actions, function(item) {
      return item.getUrl() === location;
    });
  },

  getPreviousPage: function() {
    var me = this;
    var history = this.getApplication().getHistory();
    var actions = history.getActions();
    if(actions.length > 1)
      return actions[actions.length - 2].getUrl();
  },

  onMenuVisible: function() {
    Ext.Viewport.getActiveItem().setMasked(true);
  },

  onMenuHidden: function() {
    Ext.Viewport.getActiveItem().setMasked(false);
  }
});