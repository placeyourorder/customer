/* 
 * @Author: renjithks
 * @Date:   2015-08-16 15:35:44
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-03 00:55:04
 */

'use strict';

Ext.define('Customer.controller.user.UserAccountController', {
  extend: 'Customer.controller.MainController',

  config: {
    routes: {
      'users/account': '_showView',
    },
    refs: {
      accountView : '#user-account',
      addressList: '#user-account addresslistitem',
      addAddressButton : '#user-account #add-address'
    },
    control: {
      addressList: {
        editaddress: '_onEditAddressClick'
      },
      addAddressButton :{
        tap: '_onAddAddressClick'
      }
    }
  },

  _showView: function() {
    var me = this;
    console.log('In show view');
    var view = me.getAccountView();
    if(view) {
      view.destroy();
    }
    view = Ext.create('Customer.view.user.UserAccountView');
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    view.setData(userDetails);
    Ext.Viewport.setActiveItem(view);
  },

  _onEditAddressClick: function(data) {
    console.log('Edit address clicked', data);
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    this.redirectTo('users/' + userDetails.data._id + '/address/' + data.get('_id'));
  },

  _onAddAddressClick: function() {
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    //this.getAccountView().destroy()
    this.redirectTo('users/' + userDetails.data._id + '/address');
  }
});