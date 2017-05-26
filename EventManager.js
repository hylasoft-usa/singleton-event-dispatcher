class EventManager {
  constructor(isSingleton) {
    console.log("EventManager: starting");
    // Collection of {event, [subscribedCallbacks]}
    this.subscriptions = []
    // if isSingleton is true, the object is attached to the document (only once)
    if(isSingleton){
      if(window.eventManager === undefined){
        console.log("EventManager: creating singleton");
        window.eventManager = this
      }
      else{
        console.log("EventManager: already instantiated");
      }
    }
    else{
      console.log("EventManager: is not a singleton");
    }

  }

  subscribe(eventToSubscribe, callback){
    var eventObject = this.isCallbackSubscribed(eventToSubscribe, callback)
    if(eventObject === undefined){
      var eventFound = false
      this.subscriptions.forEach(function(e){
        if(e._event === eventToSubscribe){
          eventFound = true
          e.subscribedCallbacks.push(callback)
        }
      })

      if(!eventFound){
        var subscribedCallbacks = [callback]
        this.subscriptions.push({_event: eventToSubscribe, subscribedCallbacks: subscribedCallbacks})
      }
    }
    else{
      console.log("EventManager: callback already subscribed to event " + eventToSubscribe);
    }
  }

  unsubscribe(eventToUnubscribe, callback){
    var eventObj = this.isCallbackSubscribed(eventToUnubscribe, callback);
    if(eventObj!==undefined)
    {
      this.subscriptions[eventObj.eventIndex].subscribedCallbacks.pop(eventObj.callbackIndex)
    }
    console.log("EventManager: callback unsubscribed from " + eventToUnubscribe);
  }

  isCallbackSubscribed(event, callback){
    var result = undefined
    this.subscriptions.forEach(function(e, i){
      if(e._event === event){
        e.subscribedCallbacks.forEach(function(c, j){
          if(c.toString() === callback.toString()){
            result = {eventIndex:i, callbackIndex:j }
          }
        })
      }
    })
    return result
  }

  dispatch(eventToDispatch, payload){
    console.log("EventManager: dispatching");
    console.log({_event: eventToDispatch, payload: payload});
    this.subscriptions.forEach(function(e){
      if(e._event === eventToDispatch){
        e.subscribedCallbacks.forEach(function(c){
          c(payload)
        })
      }
    })
  }

  showAllSubsriptions(){
    console.log($.extend(true, {}, this.subscriptions));
  }
}
