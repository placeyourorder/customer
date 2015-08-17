/* 
 * @Author: renjithks
 * @Date:   2015-08-16 15:35:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-17 02:56:30
 */

'use strict';

Ext.define('Pyo.customer.controller.user.UserAccountController', {
  extend: 'Pyo.customer.controller.MainController',

  config: {
    routes: {
      'users/account': '_showView'
    }
  },

  _showView: function() {
    var me = this;
    var view = Ext.create('Pyo.customer.view.user.UserAccountView');
    Ext.Viewport.setActiveItem(view);
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    view.setData(userDetails);
  }
});