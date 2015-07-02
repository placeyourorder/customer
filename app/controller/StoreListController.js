/* 
* @Author: renjithks
* @Date:   2015-06-27 18:18:46
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-02 23:14:01
*/
Ext.define('Pyo.customer.controller.StoreListController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'stores': 'getStores'
    }
  },

  getStores: function() {
    var me = this;
    var url = Pyo.customer.util.Constants.SERVER_URL + '/stores';
    var store = Ext.create('Pyo.customer.store.StoreListStore');
    store.getProxy().setUrl(url);
    store.load({
      callback: function() {
        me._listStores(store);
      }
    });
  },

  _listStores: function(store) {
    console.log(store);
    var view = Ext.create('Pyo.customer.view.StoreListView');
    view.addListener('itemtap',
      function(list, index) {
        var storeId = list.getStore().getAt(index).get('_id');
        this.redirectTo('stores/' + storeId);
      }, this);
    view.setStore(store);
    //Ext.Viewport.add(view);
    Ext.Viewport.setActiveItem(view);
  }
});