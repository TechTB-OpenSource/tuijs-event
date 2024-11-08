# TUIJS-Event
### A simple JavaScript event listener tracker that will help ensure events are easy to remove when working with an SPA. This will prevent disconnected event listeners from piling up as elements are added and removed from you site/app.
***TUIJS-Event is built on ES Modules***

***Last Updated 11/07/2024***

## Getting Started
1. To start tracking events you must create an event instance. This can be done by calling the 'tuiEvent' function and storing it in a variable that can be accessed anywhere in your application.
```js
import { tuiEvent } from 'tuijs-event';
const eventInstance = tuiEvent();
```
2. Once you have your instance created and stored, you can refer to it anywhere in your application to create or remove a tracked event.
3. There are six methods that can be used to manipulate your event instance.
    - addTrackedEvent - Adds a tracked event listener to a specified element and to the event instance. Optional: You can add a name string parameter to the method in order to create a "named" tracked event. ***The event name can be any desired string and should not be confused with event type string.***
    - removeTrackedEvent - Removes a tracked event listener from the specified element and the event instance.
    - removeNamedEvent - Removes a tracked named event.
    - removeAllTrackedEvents - Removes all tracked events from the event instance.
    - getNamedEvents - Returns all events that have a matching name.
    - getAllTrackedEvents - Returns all events that are being tracked by the event instance.

## Below are examples of how to call each method
```js
eventInstance.addTrackedEvent(element, 'event', callback, 'eventName');
eventInstance.removeTrackedEvent(element, 'event', callback);
eventInstance.removeNamedEvent('eventName');
eventInstance.removeAllTrackedEvents();
eventInstance.getNamedEvents('eventName');
eventInstance.getAllTrackedEvents();
```