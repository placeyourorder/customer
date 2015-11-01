/* 
 * @Author: renjithks
 * @Date:   2015-08-05 21:25:11
 * @Last Modified by:   renjithks
 * @Last Modified time: 2015-08-16 15:31:37
 */

'use strict';

Ext.define('Customer.controller.user.UserForgotPasswordController', {
  extend: 'Ext.app.Controller',

  config: {
    routes: {
      'users/forgotpassword': '_forgotpassword'
    },
    refs: {
      userForgotPasswordView: '#user-forgotpassword',
      submitButton: '#user-forgotpassword #submit'
    },
    control: {
      submitButton: {
        tap: '_onSubmitButtonClick'
      }
    }
  },

  _forgotpassword: function() {
    var view = this.getUserForgotPasswordView();
    if(!view) {
      view = Ext.create('Customer.view.user.UserForgotPasswordView');
    }
    Ext.Viewport.add(view);
  },

  _onSubmitButtonClick: function(button, e, eOpts) {
    var form = button.up('formpanel');
    var user = Ext.create('Customer.model.UserForgotPasswordModel', form.getValues());
    console.log(user);
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
      this._restoreUser(user);
    }
  },

  _restoreUser: function(user) {
    Ext.Ajax.request({
      url: Customer.util.Constants.SERVER_URL + '/users/restore',
      method: 'POST',
      params: {
        email: user.get('Email'),
        phone: user.get('Phone'),
        type: 'CUSTOMER'
      },
      scope: this,
      success: this._onRestorationSuccess,
      failure: this._onRestorationFailure
    });
  },

  _onRestorationSuccess: function() {
    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
    this.redirectTo('users/login');
  },

  _onRestorationFailure: function() {
    Ext.Msg.alert('Failed');
  }
});