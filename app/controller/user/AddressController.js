/* 
 * @Author: renjithks
 * @Date:   2015-08-17 15:44:31
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-11-03 01:51:51
 */

'use strict';

Ext.define('Customer.controller.user.AddressController', {
  extend: 'Customer.controller.MainController',

  config: {
    addressStore: null,
    userId: null,
    addressId: null,
    routes: {
      'users/:userId/address/:addressId': '_showView',
      'users/:userId/address': '_showView'
    },
    refs: {
      addressView: '#user-address',
      saveButton: '#user-address #save',
      deleteButton: '#user-address #delete'
    },
    control: {
      saveButton: {
        tap: '_onSaveButtonClick'
      },
      deleteButton: {
        tap: '_onDeleteButtonClick'
      }
    }
  },

  _showView: function(userId, addressId) {
    this.setUserId(userId);
    this.setAddressId(addressId);
    var view = this.getAddressView();
    if (!view) {
      view = Ext.create('Customer.view.user.AddressView');
    }
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    var addressList = userDetails.get('address');
    var address = _.find(addressList, function(item) {
      return item._id == addressId;
    });
    view.down('#delete').setHidden(!this.getAddressId());
    view.down("#addressPanel").reset();
    view.setData(address);
    Ext.Viewport.setActiveItem(view);
  },

  _onSaveButtonClick: function(button, e, eOpts) {
    var form = button.up('formpanel');
    var address = Ext.create('customer.model.address', form.getValues());
    this.setAddressStore(address);
    this._getGeoCodeForAddress(address);
  },

  _onDeleteButtonClick: function(button, e, eOpts) {
    var form = button.up('formpanel');
    var address = Ext.create('customer.model.address', form.getValues());
    var url = Customer.util.Constants.SERVER_URL.concat('/users/', this.getUserId(), '/address/', this.getAddressId());
    var method = 'DELETE';
    Ext.Ajax.request({
      url: url,
      method: method,
      scope: this,
      success: this._onAddressDeleteSuccess,
      failure: this._onAddressDeleteFailure
    });
  },


  _getGeoCodeForAddress: function(address) {
    console.log(address);
    var geoCodeUri = Customer.util.Constants.GOOGLE_GEOCODE_URI;
    var apiKey = Customer.util.Constants.GOOGLE_GEOCODE_ANDROID_API_KEY;
    var url = geoCodeUri + 'address=';
    var addressKey = {
      address1: null,
      address2: null,
      address3: null,
      city: null
    }
    _.each(Object.keys(addressKey), function(item, index) {
      var value = address.data[item];
      if (value) {
        url += value.trim().replace(/\s+/g, '+').concat(',');
      }
    });
    url = url.concat('&', apiKey);
    console.log(url);
    Ext.Ajax.request({
      url: url,
      scope: this,
      success: this._onGeoCodeFetchSuccess,
      failure: this._onGeoCodeFetchFailure
    });
  },

  _onGeoCodeFetchSuccess: function(response) {
    var result = JSON.parse(response.responseText);
    if (result.status === 'OK') {
      var result = JSON.parse(response.responseText);
      var address = this.getAddressStore();
      address.set('latitude', result.results[0].geometry.location.lat);
      address.set('longitude', result.results[0].geometry.location.lng);
    } else {
      Ext.Msg.alert('Error geo tagging your address');
      return;
    }

    var url = Customer.util.Constants.SERVER_URL + '/users/' + this.getUserId() + '/address';
    var method = this.getAddressId() ? 'PUT' : 'POST';
    url += this.getAddressId() ? '/' + this.getAddressId() : '';
    Ext.Ajax.request({
      url: url,
      method: method,
      jsonData: {
        _id: this.getAddressId(),
        address1: address.get('address1'),
        address2: address.get('address2'),
        address3: address.get('address3'),
        city: address.get('city'),
        latitude: address.get('latitude'),
        longitude: address.get('longitude')
      },
      scope: this,
      success: this._onAddressCreateSuccess,
      failure: this._onAddressCreateFailure
    });
  },

  _onGeoCodeFetchFailure: function(arg1) {
    Ext.Msg.alert('Error geo tagging your address');
  },

  _onAddressCreateSuccess: function(conn, response, options, eOpts) {
    var user = Ext.getStore('userAccountLocalStore');
    user.removeAll(true);
    user.add(Ext.decode(conn.responseText));
    this.redirectTo('users/account');
    Ext.create('Ext.ux.Toast', {
      message: 'Successfully saved address',
      toastDuration: 'SHORT'
    });
  },

  _onAddressCreateFailure: function(conn, response, options, eOpts) {
    if (response.status == 401) {
      me.redirectTo('users/login');
    }
    Ext.Msg.alert('Error saving address');
  },

  _onAddressDeleteSuccess: function(conn, response, options, eOpts) {
    var user = Ext.getStore('userAccountLocalStore');
    user.removeAll(true);
    user.add(Ext.decode(conn.responseText));
    console.log(this.getPreviousPage());
    //this.redirectTo(this.getPreviousPage());
    this.redirectTo('users/account');
    Ext.create('Ext.ux.Toast', {
      message: 'Successfully deleted address',
      toastDuration: 'SHORT'
    });
  },

  _onAddressDeleteFailure: function(conn, response, options, eOpts) {
    if (response.status == 401) {
      me.redirectTo('users/login');
    }
    Ext.Msg.alert('Error deleting address');
  }
});
