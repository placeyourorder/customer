/* 
 * @Author: renjithks
 * @Date:   2015-08-16 15:35:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-22 00:38:21
 */

'use strict';

Ext.define('Pyo.customer.controller.user.UserAccountController', {
  extend: 'Pyo.customer.controller.MainController',

  config: {
    routes: {
      'users/account': '_showView',
    },
    refs: {
      accountView : '#user-account',
      addAddressButton : '#user-account #add-address'
    },
    control: {
      accountView: {
        editaddress: '_onEditAddressClick'
      },
      addAddressButton :{
        tap: '_onAddAddressClick'
      }
    }
  },

  _showView: function() {
    var me = this;
    var view = this.getAccountView();
    if(view) {
      view.destroy();
    }
    view = Ext.create('Pyo.customer.view.user.UserAccountView');
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    view.setData(userDetails);
    Ext.Viewport.setActiveItem(view);
  },

  _onEditAddressClick: function(data) {
    console.log('Edit address clicked');
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    this.getAccountView().destroy();
    this.redirectTo('users/' + userDetails.data._id + '/address/' + data.get('_id'));
  },

  _onAddAddressClick: function() {
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    this.getAccountView().destroy()
    this.redirectTo('users/' + userDetails.data._id + '/address');
  }
});