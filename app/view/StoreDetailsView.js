Ext.define('Pyo.customer.view.StoreDetailsView', {
  extend: 'Ext.Panel',
  alias: 'widget.store-detail-view',
  requires: [
    'Ext.TitleBar',
    'Ext.dataview.component.DataItem'
  ],
  fullscreen: true,
  config: {
    id: 'store-detail-view',
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
      id: 'store-detail-view-list',
      defaultType: 'storeDetailViewDataItem',
      useComponents: true,
      height: '100%',
      width: '100%'
    }]
  }
});

Ext.define('StoreDetailViewDataItem', {
  extend: 'Ext.dataview.component.DataItem',
  alias: 'widget.storeDetailViewDataItem',
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
      flex: 1
    }]
  },
  initialize: function() {
    var me = this;
    me.callParent();
    me.down('#itemVariants').on('change', function(obj, newValue, oldValue, eOpts) {
      _.each(obj.getOptions(), function(item, index, list) {
        if (item.value === newValue) {
          me.down('#itemPrice').setHtml('Rs' + item.price);
        }
      });
    }, me);

    me.down('#qtySlider').on('change', function(field, newValue) {
      if (newValue.getValue()[0] > 0) {
        this.down('#qtySlider').setLabel('Qty ' + newValue.getValue()[0]);
      } else {
        this.down('#qtySlider').setLabel('Qty');
      }
    }, me);

    me.down('#itemAddButton').on('tap', function(obj, e, eOpts) {
      var record = this.getRecord();
      console.log(record);
      var qty = me.down('#qtySlider').getValue()[0];
      var item = record;
      this.getCartStore().addItem(item, qty);
    }, me);
  },
  updateRecord: function(record) {
    console.log(record);
    var me = this;
    var data = record.data;
    me.down('#itemName').setHtml(data.name);

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
    me.down('#itemVariants').setOptions(options);
    me.down('#itemPrice').setHtml('Rs ' + options[0].price);

    me.callParent(arguments);
  }
});