/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
"use strict";
(function ($, window, undefined) {
  /// <param name="$" type="jQuery" />
  "use strict";

  if (typeof ($.signalR) !== "function") {
    throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
  }

  var signalR = $.signalR;

  function makeProxyCallback(hub, callback) {
    return function () {
      callback.apply(hub, $.makeArray(arguments));
    };
  }

  function registerHubProxies(instance, shouldSubscribe) {
    var key, hub, memberKey, memberValue, subscriptionMethod;

    for (key in instance) {
      if (instance.hasOwnProperty(key)) {
        hub = instance[key];

        if (!(hub.hubName)) {
          continue;
        }

        if (shouldSubscribe) {
          subscriptionMethod = hub.on;
        } else {
          subscriptionMethod = hub.off;
        }

        for (memberKey in hub.client) {
          if (hub.client.hasOwnProperty(memberKey)) {
            memberValue = hub.client[memberKey];

            if (!$.isFunction(memberValue)) {
              continue;
            }

            subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
          }
        }
      }
    }
  }

  $.hubConnection.prototype.createHubProxies = function () {
    var proxies = {};
    this.starting(function () {
      registerHubProxies(proxies, true);
      this._registerSubscribedHubs();
    }).disconnected(function () {
      registerHubProxies(proxies, false);
    });

    proxies['streamingHub'] = this.createHubProxy('streamingHub');
    proxies['streamingHub'].client = {};
    proxies['streamingHub'].server = {
      registerStream: function (userId) {
        return proxies['streamingHub'].invoke.apply(proxies['streamingHub'], $.merge(["RegisterStream"], $.makeArray(arguments)));
      }
    };

    return proxies;
  };

  signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
  $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));