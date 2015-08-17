/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
  name: 'customer',

  requires: [
    'Ext.MessageBox'
  ],

  controllers: [
    'Pyo.customer.controller.MainController',
    'Pyo.customer.controller.MainMenuController',
    'Pyo.customer.controller.StoreListController',
    'Pyo.customer.controller.ItemListController',
    'Pyo.customer.controller.CartController',
    'Pyo.customer.controller.OrderListController',
    'Pyo.customer.controller.CategoryController',
    'Pyo.customer.controller.user.UserRegistrationController',
    'Pyo.customer.controller.user.UserLoginController',
    'Pyo.customer.controller.UserLogoutController',
    'Pyo.customer.controller.user.UserAccountController'
  ],

  views: [
    'Pyo.customer.view.Main',
    'Pyo.customer.view.MainMenu',
    'Pyo.customer.view.StoreListView',
    'Pyo.customer.view.ItemListView',
    'Pyo.customer.view.CartView',
    'Pyo.customer.view.OrderListView',
    'Pyo.customer.view.CategoryView',
    'Pyo.customer.view.user.UserRegistrationView',
    'Pyo.customer.view.user.UserLoginView',
    'Pyo.customer.view.user.UserAccountView'
  ],

  models: [
    'Pyo.customer.model.StoreModel',
    'Pyo.customer.model.ItemModel',
    'Pyo.customer.model.CartModel',
    'Pyo.customer.model.OrderListModel',
    'Pyo.customer.model.CategoryModel',
    'Pyo.customer.model.UserRegistrationModel',
    'Pyo.customer.model.UserLoginModel',
    'Pyo.customer.model.LocationModel',
    'Pyo.customer.model.OrderModel',
    'Pyo.customer.model.user.UserAccountLocalStorageModel',
    'Pyo.customer.model.user.UserAccountModel',
    'address'
  ],

  stores: [
    'Pyo.customer.store.StoreListStore',
    'Pyo.customer.store.ItemListStore',
    'Pyo.customer.store.CartStore',
    'Pyo.customer.store.OrderListStore',
    'Pyo.customer.store.CategoryStore',
    'Pyo.customer.store.LocationStore',
    'Pyo.customer.store.user.UserAccountStore',
    'Pyo.customer.store.user.UserAccountLocalStorageStore'
  ],

  icon: {
    '57': 'resources/icons/Icon.png',
    '72': 'resources/icons/Icon~ipad.png',
    '114': 'resources/icons/Icon@2x.png',
    '144': 'resources/icons/Icon~ipad@2x.png'
  },

  isIconPrecomposed: true,

  startupImage: {
    '320x460': 'resources/startup/320x460.jpg',
    '640x920': 'resources/startup/640x920.png',
    '768x1004': 'resources/startup/768x1004.png',
    '748x1024': 'resources/startup/748x1024.png',
    '1536x2008': 'resources/startup/1536x2008.png',
    '1496x2048': 'resources/startup/1496x2048.png'
  },

  geoLocation: null,
  viewport: {
    //layout: 'vbox'
  },

  launch: function() {
    Ext.create('Pyo.customer.store.LocationStore', {
      storeId: 'locationLocalStore'
    });

    Ext.create('Pyo.customer.store.user.UserAccountLocalStorageStore', {
      storeId: 'userAccountLocalStore'
    });

    var geoLocation = Ext.create('Ext.util.Geolocation', {
      autoUpdate: false,
      listeners: {
        locationupdate: function(geo) {
          console.log('Got geocode');
          var store = Ext.getStore('locationLocalStore');
          store.removeAll(true);
          store.add({
            latitude: geo.getLatitude(),
            longitude: geo.getLongitude()
          });
        },
        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
          var store = Ext.getStore('locationLocalStore');
          store.removeAll(true);
          if (bTimeout)
            console.log('Timeout occurred', "Could not get current position");
          else
            console.log('Error getting geocode.');
          console.log(message);
        }
      }
    });
    this.geoLocation = geoLocation;
    geoLocation.updateLocation();
    Ext.fly('appLoadingIndicator').destroy();

    // Initialize the main view
    //Ext.Viewport.add(Ext.create('Pyo.customer.view.Main'));
    //this.redirectTo('stores');
  }
});