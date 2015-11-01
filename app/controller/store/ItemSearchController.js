/* 
 * @Author: renjithks
 * @Date:   2015-10-17 12:27:03
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-17 21:24:47
 */

'use strict';

Ext.define('Customer.controller.store.ItemSearchController', {
  extend: 'Customer.controller.MainController',

  config: {
    routes: {
      'stores/:storeId/items/search': '_showView'
    },
    refs: {
      itemSearchView: '#item-search-view',
      clearButton: '#item-search-view #clear-button',
      itemSearch: "#item-search-view #itemSearch",
      searchQueryList: '#item-search-view #history-list'
    },
    control: {
      clearButton: {
        tap: '_onClearButtonClick'
      },
      itemSearch: {
        action: '_onItemSearch'
      },
      searchQueryList: {
        itemtap: '_onSearchQueryListClick'
      }
    },
    storeId: null
  },

  _showView: function(storeId) {
    this.setStoreId(storeId);
    var view = this.getItemSearchView();
    if (!view) {
      view = Ext.create('Customer.view.item.ItemSearchView');
      view.addSearchField();
    }
    Ext.Viewport.setActiveItem(view);
    this.setSearchData();
  },

  setSearchData: function() {
    var store = Ext.getStore('itemSearchHistoryStore');
    if (!store) {
      store = Ext.create('Customer.store.ItemSearchHistoryStore', {
        storeId: 'itemSearchHistoryStore'
      });
    }
    console.log(store.getData().items);
    if (store.getCount() === 0) {
      this.getItemSearchView().down('#clear-button').hide();
      return;
    }
    this.getItemSearchView().down('#clear-button').show();
    this.getItemSearchView().down('#history-list').setStore(store);
  },

  _onClearButtonClick: function() {
    var store = Ext.getStore('itemSearchHistoryStore');
    if (store) {
      store.removeAll();
      this.getItemSearchView().down('#clear-button').hide();
    }
  },

  _onItemSearch: function(searchField, e, eOpts) {
    var query = searchField.getValue();
    if (query && query.length > 2) {
      var store = Ext.getStore('itemSearchHistoryStore');
      if (!store.findRecord('text', query)) {
        store.add({
          text: query
        });
      }
      var queryParams = Ext.urlEncode({
        tags: query
      });
      this.redirectTo('stores/' + this.getStoreId() + '/items/?' + queryParams);
    }
  },

  _onSearchQueryListClick: function(list, index, target, record, e, eOpts) {
    var query = record.get('text');
    var queryParams = Ext.urlEncode({
      tags: query
    });
    this.redirectTo('stores/' + this.getStoreId() + '/items/?' + queryParams);
  }
});
