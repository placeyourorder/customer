/* 
 * @Author: renjithks
 * @Date:   2015-06-27 18:18:46
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-15 00:11:57
 */
Ext.define('Pyo.customer.controller.StoreListController', {
  extend: 'Pyo.customer.controller.MainController',

  config: {
    routes: {
      'stores': '_getStores'
    },
    refs: {
      storeListView: '#store-list'
    }
  },

  _getStores: function() {
    if(this.getStoreListView()) {
      Ext.Viewport.setActiveItem(this.getStoreListView());
      return;
    }
    var me = this;
    var url = Pyo.customer.util.Constants.SERVER_URL + '/stores/search';
    var store = Ext.create('Pyo.customer.store.StoreListStore', {
      storeId: 'storeList'
    });
    var location = Ext.getStore('locationLocalStore').getAt(0);

    if (!location) {
      customer.app.geoLocation.updateLocation();
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
        me._listStores(store);
      },
      failure: function(conn, response, options, eOpts) {
        if (conn.status == 401) {
          me.redirectTo('users/login');
        }
      }
    });
  },

  _listStores: function(store) {
    var view = Ext.create('Pyo.customer.view.StoreListView');
    Ext.Viewport.setActiveItem(view);
    view.down('#list').addListener('itemtap',
      function(list, index) {
        var storeId = list.getStore().getAt(index).get('_id');
        this.redirectTo('stores/' + storeId + '/categories');
      }, this);
    view.down('#list').setStore(store);
    //Ext.Viewport.add(view);
  }
});