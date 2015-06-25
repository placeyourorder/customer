Ext.define('Pyo.customer.view.StoreListView', {
  extend: 'Ext.dataview.List',
  alias: 'widget.store-list',
  config: {
    id: 'store-list',
    itemTpl: '{title}',
    sorters: 'title',
    grouped: true
  }
});