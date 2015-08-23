/* 
 * @Author: renjithks
 * @Date:   2015-08-06 10:19:08
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-17 02:59:14
 */

'use strict';

Ext.define('Pyo.customer.controller.user.UserLoginController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'users/login': '_login'
    },
    refs: {
      userLoginView: '#user-login',
      loginButton: '#user-login #login',
      userRegistrationButton: '#user-login #userRegistration'
    },
    control: {
      loginButton: {
        tap: '_onLoginButtonClick'
      }
    }
  },

  _login: function() {
    var me = this;
    var view = Ext.create('Pyo.customer.view.user.UserLoginView');
    Ext.getStore('userAccountLocalStore').removeAll(true);
    this.getUserRegistrationButton().element.on({
      tap: function(e, t) {
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        me.redirectTo('users/register');
      }
    });
    Ext.Viewport.setActiveItem(view);
  },

  _onLoginButtonClick: function(button, e, eOpts) {
    var form = button.up('formpanel');
    var user = Ext.create('Pyo.customer.model.UserLoginModel', form.getValues());
    var errors = user.validate();
    if (!errors.isValid()) {
      var errorMsg = "";
      errors.each(function(item, index, length) {
        console.log(item.getField());
        form.down("field[name='" + item.getField() + "']").addCls('invalidField');
        errorMsg += ' ' + item.getField() + ' ' + item.getMessage() + '<br/>';
      });
      Ext.Msg.alert("Validation Failed", errorMsg);
    } else {
      this._loginUser(user);
    }
  },

  _loginUser: function(user) {
    Ext.Ajax.request({
      url: Pyo.customer.util.Constants.SERVER_URL + '/users/login',
      method: 'POST',
      params: {
        email: user.get('Email'),
        password: user.get('Password'),
      },
      scope: this,
      success: this._onLoginSuccess,
      failure: this._onLoginFailure
    });
  },

  _onLoginSuccess: function(conn, response, options, eOpts) {
    var me = this;
    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
    var store = Ext.getStore('userAccountLocalStore');
    store.removeAll(true);
    store.add(Ext.decode(conn.responseText));
    this.redirectTo('users/account');
  },

  _onLoginFailure: function(conn, response, options, eOpts) {
    Ext.Msg.alert('Login Failed');
  }
});