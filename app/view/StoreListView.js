/* 
* @Author: renjithks
* @Date:   2015-06-22 01:41:44
* @Last Modified by:   renjithks
* @Last Modified time: 2015-06-30 23:40:35
*/
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