/* 
 * @Author: renjithks
 * @Date:   2015-09-04 16:27:41
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-09-05 20:46:55
 */


Ext.define('Customer.view.fgtest', {
  extend: 'Ext.Container',
  alias: 'widget.fgtest',
  config: {
    id: 'fgtest',
    padding: 10,
    layout: {
    //  type: 'vbox',
    },
    items: [{
      itemId: 'ftest',
      xtype: 'fieldgroup',
      flex: 1
    }]
  }
});