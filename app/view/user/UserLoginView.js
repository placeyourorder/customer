/* 
 * @Author: renjithks
 * @Date:   2015-08-06 10:28:36
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-16 15:27:36
 */

'use strict';

Ext.define('Pyo.customer.view.user.UserLoginView', {
  extend: 'Ext.Container',
  alias: 'widget.user-Login',
  config: {
    id: 'user-login',
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
      flex: 1,
      items: [{
        xtype: 'emailfield',
        name: 'Email',
        placeHolder: 'Email',
        margin: 10
      }, {
        xtype: 'passwordfield',
        name: 'Password',
        placeHolder: 'Password',
        margin: 10
      }, {
        xtype: 'button',
        itemId: 'login',
        text: 'Login',
        cls: 'button',
        margin: 10
      }]
    }, {
      xtype: 'panel',
      flex: 1
    }, {
      xtype: 'label',
      itemId: 'userRegistration',
      html: 'Not a member? Register here!',
      flex: 1,
      padding: 10,
      styleHtmlContent: true,
      styleHtmlCls : 'login-view-registration-link underlined',
      docked: 'bottom',
    },
    {
      xtype: 'label',
      itemId: 'userForgotPassword',
      html: 'Forgot Password?',
      flex: 1,
      padding: 10,
      styleHtmlContent: true,
      styleHtmlCls : 'login-view-registration-link underlined',
      docked: 'bottom',
    }]
  }
});