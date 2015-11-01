/*
 * @Author: renjithks
 * @Date:   2015-06-29 01:13:33
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-10-07 02:10:53
 */
Ext.define('Customer.view.ItemListView', {
  extend: 'Customer.view.Main',
  alias: 'widget.item-list-view',
  requires: [
    // 'Ext.dataview.component.DataItem'
  ],
  config: {
    id: 'item-list-view',
    barTitle: 'Items',
    itemId: 'mainView',
    storeId: null,
    cartStore: null,
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'searchfield',
      itemId: 'item-search',
      name: 'query'
    }, {
      xtype: 'dataview',
      itemId: 'list',
      cls: ['dataview-list'],
      defaultType: 'itemListDataView',
      useComponents: true,
      height: '100%',
      width: '100%'
    }]
  },

  initialize: function() {
    var me = this;
    me.callParent();
    me.on('painted', function() {
      var cartStore = Ext.getStore('cartStore');
      if (cartStore) {
        var cart = cartStore.getCartForStore(this.getStoreId());
        //me.down('#cartIcon').setText(cart.lineItemsStore.getData().items.length || 0);
      }
    });
  }
});

Ext.define('ItemListDataView', {
  extend: 'Ext.dataview.component.DataItem',
  alias: 'widget.itemListDataView',
  config: {
    padding: 5,
    layout: {
      type: 'hbox',
      align: 'center'
    },
    defaults: {
      margin: 5
    },
    items: [{
      xtype: 'label',
      itemId: 'itemName',
      flex: 2
    }, {
      xtype: 'selectfield',
      itemId: 'itemVariants',
      autoSelect: true,
      flex: 2
    }, {
      xtype: 'label',
      itemId: 'itemPrice',
      flex: 1
    }, {
      xtype: 'button',
      itemId: 'itemAddButton',
      iconCls: 'add',
      flex: 1
    }]
  },
  initialize: function() {
    var me = this;
    me.callParent();
    me.on('painted', function() {

      me.down('#itemVariants').on('change', function(obj, newValue, oldValue, eOpts) {
        _.each(obj.getOptions(), function(item, index, list) {
          if (item.value === newValue) {
            me.down('#itemPrice').setHtml('Rs ' + item.price);
          }
        });
      }, me);

      me.down('#itemAddButton').on('tap', function(obj, e, eOpts) {
        var record = this.getRecord();
        var qty = 1;
        var item = record;
        var variant = me.down('#itemVariants').getValue();
        var mainView = me.up('item-list-view');
        var cartStore = mainView.getCartStore();
        cartStore.addItem(item.data, variant, qty);
        var cart = cartStore.getCartForStore(mainView.getStoreId());
        mainView.updateButtonbadge('cart-icon', cart.lineItemsStore.getCount());
      }, me);
    }, me);
  },

  updateRecord: function(record) {
    if (null == record) {
      this.callParent(arguments);
      return;
    }
    var data = record.data;
    this.down('#itemName').setHtml(data.name);

    var options = [];
    var obj = {};
    if (data.variations.length > 0) {
      _.each(data.variations, function(variant, index, list) {
        obj = {};
        obj.value = variant._id;
        obj.price = variant.price;
        obj.text = variant.quantity + ' ' + variant.uom;
        options.push(obj);
      });
    } else {
      obj.value = data._id;
      obj.price = data.price;
      obj.text = data.quantity + ' ' + data.uom;
      options.push(obj);
    }
    this.down('#itemVariants').setOptions(options);
    this.down('#itemPrice').setHtml('Rs ' + options[0].price);

    this.callParent(arguments);
  }
});