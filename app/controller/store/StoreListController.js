/* 
 * @Author: renjithks
 * @Date:   2015-06-27 18:18:46
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-17 00:05:39
 */
Ext.define('Customer.controller.store.StoreListController', {
  extend: 'Customer.controller.MainController',

  config: {
    routes: {
      'stores': '_getStores'
    },
    refs: {
      storeListView: '#store-list',
      addressSelect: "#store-list #address-select"
    },
    control: {
      addressSelect: {
        change: '_onChangeAddress'
      }
    }
  },

  _getStores: function() {
    if (this.getStoreListView()) {
      Ext.Viewport.setActiveItem(this.getStoreListView());
      return;
    }
    var me = this;
    var url = Customer.util.Constants.SERVER_URL + '/stores/search_by_cordinates';
    var store = Ext.create('Customer.store.StoreListStore', {
      storeId: 'storeList'
    });
    var location = Ext.getStore('locationLocalStore').getAt(0);

    if (!location) {
      Customer.app.geoLocation.updateLocation();
      me._listStores(store);
      Ext.Msg.alert('Not able to get current your location');
      return;
    }

    var paramMap = {
      address: {
        latitude: location.get('latitude'),
        longitude: location.get('longitude')
      }
    };
    Ext.Ajax.request({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: paramMap,
      success: function(conn, response, options, eOpts) {
        var data = Ext.decode(conn.responseText);
        store.setData(data);
        me._setStoreContext(store);
        //me._listStores(store);
      },
      failure: function(conn, response, options, eOpts) {
        if (conn.status == 401) {
          me.redirectTo('users/login');
        }
      }
    });
  },

  _setStoreContext: function(store) {
    if (store.getCount() === 0) {
      Ext.Msg.alert('Not able to find any store near the area');
      return;
    }

    var storeId = store.getAt(0).get('_id');
    var queryParams = Ext.urlEncode({
      tags: 'Fresh Fruits'
    });
    this.redirectTo('stores/' + storeId + '/items/?' + queryParams);
  },

  _listStores: function(store) {
    var view = Ext.create('Customer.view.StoreListView');
    Ext.Viewport.setActiveItem(view);
    view.down('#list').addListener('itemtap',
      function(list, index) {
        var storeId = list.getStore().getAt(index).get('_id');
        this.redirectTo('stores/' + storeId + '/categories');
      }, this);
    var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
    view.down('#list').setStore(store);
    var options = [{
      value: 'current_location',
      text: 'Current Location'
    }];

    _.each(userDetails.getData().address, function(address) {
      options.push({
        value: address._id,
        text: ''.concat(address.address1).concat(' ').concat(address.address2).concat(address.address3)
      });
    });
    view.down('#address-select').setOptions(options);
  },

  _onChangeAddress: function(e, newValue, oldValue, eOpts) {
    var me = this;
    var address;
    var url = Customer.util.Constants.SERVER_URL + '/stores/search';

    if (newValue == 'current_location') {
      var location = Ext.getStore('locationLocalStore').getAt(0);
      if (location)
        address = location.getData();
    } else {
      var userDetails = Ext.getStore('userAccountLocalStore').getAt(0);
      address = _.find(userDetails.getData().address, function(address) {
        return address._id === newValue;
      });
    }

    if (!address || !address.latitude || !address.longitude) {
      Ext.Msg.alert('Some went wrong');
      return;
    }

    var paramMap = {
      address: {
        latitude: address.latitude,
        longitude: address.longitude
      }
    };

    Ext.Ajax.request({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      jsonData: paramMap,
      success: function(conn, response, options, eOpts) {
        var data = Ext.decode(conn.responseText);
        var store = Ext.getStore('storeList').setData(data);
        me.getStoreListView().down('#list').setStore(store);
      },
      failure: function(conn, response, options, eOpts) {
        if (conn.status == 401) {
          me.redirectTo('users/login');
        }
      }
    });
  }
});
