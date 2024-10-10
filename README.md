# TUIJS-Event
## A simple event listener tracker that will help ensure events are removed when working with an SPA. This will prevent disconnected event listeners from piling up while your website or web app is running.
***TUIJS-Event is built on ES Modules.***

***Last Updated 10/09/2024***

## Event Listener Tracking
1. To start event tracking you must create an instance of TUIJS-Event. This can be done by calling the 'tuiElement' function and storing the instance in a variable.
***If you want the instance to track events for your entire app, it is recommended that you create the instance at the beginning of your app. This can simplify your config, because you can call the 'removeAllTrackedEvents' for each route instead of removing them individually (This will obviously vary for different use cases).***
```js
import { tuiEvent } from 'tuijs-event';

const eventManager = tuiEvent();
```
2. Once you have created your instance, you can manipulate your instance with three functions. These functions are listed below.
- The 'addTrackedEvent' functions adds the event listener to the specified element as well as adds it to the tracker for this instance.
- The 'removeTrackedEvent' functions removes an event listener to the specified element as well as removes it from the tracker for this instance.
- The 'removeAllTrackedEvents' functions removes all event listeners tracked by this instance.
***The event manager variable must be referenced to call these functions.***
```js
eventManager.addTrackedEvent(element, 'event', callback);
eventManager.removeTrackedEvent(element, 'event', callback);
eventManager.removeAllTrackedEvents();
```
