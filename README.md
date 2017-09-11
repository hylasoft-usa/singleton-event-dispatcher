# Singleton Event Dispatcher

This JavaScript event dispatcher creates a Singleton instance and attaches it globally to the page. This event dispatcher is useful when multiple independent component within a page must communicate among them.

[See Demo](https://hylasoft-usa.github.io/singleton-event-dispatcher/example/)


![alt text](https://raw.githubusercontent.com/hylasoft-usa/singleton-event-dispatcher/master/example/screenshot.JPG)

## Usage

### Instantiation

Include the following script within your page:

```
<script src="https://hylasoft-usa.github.io/singleton-event-dispatcher/EventManager.js" type="text/javascript"></script>
```

Event Manager can be created multiple times by independent component within a page. Passing a true argument, Event Manager constructor will check whether an EventManager instance has already been created keeping the Singleton pattern.

```
new EventManager(true)
```

The Event Manager instance can be called in the following way:

```
window.eventManager
```
### Subscription

This command subscribe the callback function 'foo' to an event EVENT_1

```
window.eventManager.subscribe("EVENT_1", foo)
```

'foo' can be subscribed only once to the same event. In case of multiple subscriptions of the same function to an event, Event Manager will just discard the subscription request.

### Unsubscribe

This command unsubscribe the callback function 'foo' to an event EVENT_1

```
window.eventManager.unsubscribe("EVENT_1", foo)
```

### Dispatch

This command dispatches 'EVENT_1'. All the callbacks subscribed for 'EVENT_1' will be called with a payload "Some message" as argument.  

```
window.eventManager.dispatch("EVENT_1", "Some message")
```
### Show all subscription

This command is used for debugging purposes, it shows all the callbacks that are subscribed to all the events.

```
window.eventManager.showAllSubsriptions()
```
### HylaEventManager (it does not use ECMA6 syntax)

If you need to use the event manager without the ECMA6 syntax for classes, you can reference the HylaEventManager.js script. Example of usage:

```
var eventManager = window.HylaEventManager;
eventManager.subscribe("EventName", callback);
```
