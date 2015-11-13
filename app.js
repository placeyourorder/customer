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

Ext.Loader.setPath({
  'Ext': 'touch/src',
  'Ext.ux': 'app/ux',
  'Customer': 'app'
});

Ext.application({
  name: 'Customer',

  requires: [
    'Ext.MessageBox'
  ],

   controllers: [
    'MainController',
    'MainMenuController',
    'store.StoreListController',
    'store.ItemSearchController',
    'item.ItemDetailsController',
    'ItemListController',
    'CartController',
    'order.OrderListController',
    'CategoryController',
    'user.UserRegistrationController',
    'user.UserLoginController',
    'UserLogoutController',
    'user.UserAccountController',
    'user.AddressController',
    'cart.CheckoutController',
    'order.OrderDetailsController',
    'user.UserForgotPasswordController',
    'cart.CartListController',
    'cart.CartAddressController',
    'cart.CartReviewController',
    'cart.CartAddressController',
    'cart.CartDeliverySlotController',
    'cart.CartInstructionsController',
    'cart.CartPaymentController'
   ],

  views: [
    'Templates',
    'Main',
    'MainMenu',
    'user.AddressListView',
    'StoreListView',
    'ItemListView',
    'item.ItemGridView',
    'item.ItemSearchView',
    'item.ItemDetailView',
    'CartView',
    'order.OrderListView',
    'order.OrderDetailsView',
    'CategoryView',
    'user.UserRegistrationView',
    'user.UserLoginView',
    'user.UserAccountView',
    'user.AddressView',
    'cart.CheckoutView',
    'user.UserForgotPasswordView',
    'cart.CartListView',
    'cart.CartAddressView',
    'cart.CartReviewView',
    'cart.CartAddressView',
    'cart.CartDeliverySlotView',
    'cart.CartInstructionsView',
    'cart.CartPaymentView'
  ],

  models: [
    'StoreModel',
    'ItemModel',
    'ItemSearchModel',
    'ItemSearchHistoryModel',
    'CartModel',
    'CategoryModel',
    'UserRegistrationModel',
    'UserLoginModel',
    'LocationModel',
    'order.OrderModel',
    'user.UserAccountLocalStorageModel',
    'user.UserAccountModel',
    'UserForgotPasswordModel',
    'CategoryModel'
  ],

  stores: [
    'user.AddressStore',
    'StoreListStore',
    'ItemStore',
    'ItemSearchHistoryStore',
    'CartStore',
    'order.OrderStore',
    'CategoryStore',
    'LocationStore',
    'user.UserAccountStore',
    'user.UserAccountLocalStorageStore',
    'CategoryStore'
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
    // <debug>
    try {
      /**
       * init() defaults to "http://local.senchainspector.com:1839"
       * so we don't have to pass a URL
       */
      //SenchaInspector.init();


      /**
       * NOTE: The URL needs to match what you defined in app.json.
       * If you connected app.json via a machine name or IP address,
       * you'll need to explicitly configure that here too
       */
      // SenchaInspector.init('http:localhost:1839');
    } catch (e) {}
    // </debug>
    //Fires before a network request is made to retrieve a data object.
    Ext.Ajax.on('beforerequest', function(con, opt) {
      //To show the mask
      Ext.Viewport.setMasked({
        xtype: 'loadmask',
        indicator: true
      });

    }, this);

    //Fires if the request was successfully completed and hide the mask.
    Ext.Ajax.on('requestcomplete', function(con, res, opt) {
      //To hide the mask
      Ext.Viewport.setMasked(false);
    }, this);

    //Fires if an error HTTP status was returned from the server  and hide the mask.
    Ext.Ajax.on('requestexception', function(con, response, opt) {
      //To hide the mask
      Ext.Viewport.setMasked(false);
    }, this);

    Ext.create('Customer.store.CategoryStore', {
      storeId: 'CategoryStore'
    });

    Ext.create('Customer.store.LocationStore', {
      storeId: 'locationLocalStore'
    });

    Ext.create('Customer.store.user.UserAccountLocalStorageStore', {
      storeId: 'userAccountLocalStore'
    });

    // Get the location of user
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
    Ext.create('Customer.store.CategoryStore', {
      storeId: 'CategoryStore'
    });
    Ext.fly('appLoadingIndicator').destroy();

    // Initialize the main view
    //Ext.Viewport.add(Ext.create('Customer.view.Main'));
    console.log('Redirecting to login');
    //this.redirectTo('users/register');
  }
});
