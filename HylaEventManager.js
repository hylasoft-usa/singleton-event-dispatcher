(function() {

    //GlobalObject
    window.HylaEventManager = window.HylaEventManager || {};
    var eventManager = window.HylaEventManager;

    eventManager.subscriptions = HylaEventManager.subscriptions || [];

    eventManager.subscribe = function(eventToSubscribe, callback) {
        var eventObject = eventManager.isCallbackSubscribed(eventToSubscribe, callback)
        if (eventObject === undefined) {
            var eventFound = false
            eventManager.subscriptions.forEach(function(e) {
                if (e._event === eventToSubscribe) {
                    eventFound = true
                    e.subscribedCallbacks.push(callback)
                }
            })

            if (!eventFound) {
                var subscribedCallbacks = [callback]
                eventManager.subscriptions.push({
                    _event: eventToSubscribe,
                    subscribedCallbacks: subscribedCallbacks
                })
            }
        }
    };

    eventManager.unsubscribe = function(eventToUnubscribe, callback) {
        var eventObj = eventManager.isCallbackSubscribed(eventToUnubscribe, callback);
        if (eventObj !== undefined) {
            eventManager.subscriptions[eventObj.eventIndex].subscribedCallbacks.pop(eventObj.callbackIndex)
        }
    };

    eventManager.isCallbackSubscribed = function(event, callback) {
        var result = undefined
        eventManager.subscriptions.forEach(function(e, i) {
            if (e._event === event) {
                e.subscribedCallbacks.forEach(function(c, j) {
                    if (c.toString() === callback.toString()) {
                        result = {
                            eventIndex: i,
                            callbackIndex: j
                        }
                    }
                })
            }
        })
        return result
    };

    eventManager.dispatch = function(eventToDispatch, payload) {
        eventManager.subscriptions.forEach(function(e) {
            if (e._event === eventToDispatch) {
                e.subscribedCallbacks.forEach(function(c) {
                    c(payload)
                })
            }
        })
    };

    eventManager.showAllSubsriptions = function() {
        console.log($.extend(true, {}, eventManager.subscriptions));
    };

})();