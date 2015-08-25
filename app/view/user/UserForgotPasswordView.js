/* 
 * @Author: renjithks
 * @Date:   2015-08-05 21:25:41
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-16 15:28:06
 */

'use strict';

Ext.define('Pyo.customer.view.user.UserForgotPasswordView', {
  extend: 'Ext.Container',
  alias: 'widget.user-forgotpassword',
  config: {
    id: 'user-forgotpassword',
    //fullscreen: true,
    padding: 10,
    layout: {
      type: 'vbox',
    },
    items: [{
      xtype: 'panel',
      flex: 1,
    }, {
      xtype: 'formpanel',
      flex: 2,
      items: [{
        xtype: 'label',
        name: 'EmailLabel',
        text: 'Please enter your email address',
        margin: 10
      },{
        xtype: 'emailfield',
        name: 'Email',
        placeHolder: 'Email',
        margin: 10
      }, {
        xtype: 'button',
        itemId: 'submit',
        text: 'Submit',
        margin: 10
      }]
    }, {
      xtype: 'panel',
      flex: 1
    }]
  }
});