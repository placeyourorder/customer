/*
* @Author: renjithks
* @Date:   2015-06-29 01:13:33
* @Last Modified by:   renjithks
* @Last Modified time: 2015-07-02 23:17:25
*/
Ext.define('Pyo.customer.view.ItemListView', {
  extend: 'Ext.Panel',
  alias: 'widget.store-detail-view',
  requires: [
    'Ext.TitleBar',
    'Ext.dataview.component.DataItem'
  ],
  config: {
    id: 'store-detail-view',
    itemId: 'mainView',
    storeId: null,
    cartStore: null,
    layout: {
      type: 'hbox',
      align: 'middle'
    },
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      ui: 'light',
      title: 'List of items',
      items: [{
        itemId: 'cartIcon',
        iconCls: 'action',
        align: 'right',
        text: '0'
      }],
    }, {
      xtype: 'dataview',
      itemId: 'list',
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
    padding: 10,
    layout: {
      type: 'hbox'
    },
    defaults: {
      margin: 10
    },
    items: [{
      xtype: 'label',
      itemId: 'itemName',
      flex: 2
    }, {
      xtype: 'selectfield',
      itemId: 'itemVariants',
      autoSelect: true,
      flex: 1
    }, {
      xtype: 'sliderfield',
      itemId: 'qtySlider',
      label: 'Qty',
      value: 0,
      minValue: 0,
      maxValue: 10,
      flex: 2
    }, {
      xtype: 'label',
      itemId: 'itemPrice',
      flex: 1
    }, {
      xtype: 'button',
      itemId: 'itemAddButton',
      iconCls: 'add',
      disabled: true,
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

      me.down('#qtySlider').on('change', function(field, newValue) {
        if (newValue.getValue()[0] > 0) {
          this.down('#qtySlider').setLabel('Qty ' + newValue.getValue()[0]);
          me.down('#itemAddButton').setDisabled(false);
        } else {
          this.down('#qtySlider').setLabel('Qty');
          me.down('#itemAddButton').setDisabled(true);
        }
      }, me);

      me.down('#itemAddButton').on('tap', function(obj, e, eOpts) {
        var record = this.getRecord();
        var qty = me.down('#qtySlider').getValue()[0];
        var item = record;
        var variant = me.down('#itemVariants').getValue();
        var mainView = me.up('store-detail-view');
        var cartStore = mainView.getCartStore();
        cartStore.addItem(item, variant, qty);
        var cart = cartStore.getCartForStore(mainView.getStoreId());
        me.up('store-detail-view').down('#cartIcon').setText(cart.lineItemsStore.getData().items.length || 0);
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