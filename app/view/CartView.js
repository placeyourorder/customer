/* 
* @Author: renjithks
* @Date:   2015-06-29 15:24:03
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:41:17
*/
Ext.define('Pyo.customer.view.CartView', {
  extend: 'Ext.Panel',
  alias: 'widget.cart-view',
  requires: [
    'Ext.TitleBar',
    'Ext.dataview.component.DataItem'
  ],
  config: {
    id: 'cart-view',
    layout: {
      type: 'vbox'
    },
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      title: 'Cart',
      items:[{
        itemId: 'submit-button',
        xtype: 'button',
        text: 'Submit',
        align: 'right'
      }]
    },{
      xtype: 'label',
      itemId: 'orderTotal',
      padding: 30,
      tpl: 'Total Price: Rs {total_price}'
    }, {
      xtype: 'dataview',
      itemId: 'list',
      defaultType: 'cartDataItems',
      useComponents: true,
      height: '100%',
      width: '100%'
    }]
  },

  updateData: function(data) {
    this.down('#list').setStore(data.lineItemsStore);
    this.down('#orderTotal').setData(data.getData());
    this.callParent(arguments);
  }
});

Ext.define('CartDataItems', {
  extend: 'Ext.dataview.component.DataItem',
  alias: 'widget.cartDataItems',
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
      tpl: '{name}',
      flex: 2
    }, {
      xtype: 'label',
      itemId: 'itemVariant',
      tpl: '{quantity} {uom}',
      flex: 2
    }, {
      xtype: 'label',
      itemId: 'itemPrice',
      tpl: 'Rs {price}',
      flex: 1
    }, {
      xtype: 'label',
      itemId: 'quantity',
      tpl: 'Qty {quantity}',
      flex: 2
    }, {
      xtype: 'label',
      itemId: 'totalPrice',
      tpl: 'Rs {total_price}',
      right: 0,
      flex: 2
    }]
  },

  updateRecord: function(record) {
    if(null == record) {
      this.callParent(arguments);
      return;
    }
    var data = record.data;
    this.down('#itemName').setData(data);
    this.down('#itemPrice').setData(data);
    this.down('#quantity').setData(data);
    this.down('#totalPrice').setData(data);
    this.down('#itemVariant').setData(record.getVariant().data);
    this.callParent(arguments);
  }
});