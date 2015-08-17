/* 
 * @Author: renjithks
 * @Date:   2015-07-29 17:35:10
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-11 00:32:28
 */

'use strict';

Ext.define('Pyo.customer.controller.MainController', {
  extend: 'Ext.app.Controller',

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
  }
});