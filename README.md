# TUIJS-Event
***Last Updated 03/10/2026***
### A simple JavaScript event listener tracker that will help ensure events are easy to manage. This will prevent event listeners from piling when working in simple SPAs.

***TUIJS-Event is currently pre-release. Expect breaking changes.***

## Getting Started
1. To start tracking events you must create an event instance. This can be done by using the 'createEventInstance' function.
```js
import { createEventInstance } from 'tuijs-event';
const eventInstance = createEventInstance();
```
2. Once you have created an event instance you can use the instance methods to manage tracked events.
3. There are six methods that can be used to manipulate your event instance.
    - addTrackedEvent - Adds a tracked event listener to a specified element and to the event instance. Optional: You can add a name string parameter in order to create a named tracked event.
    - removeTrackedEvent - Removes a tracked event listener from the specified element and the event instance. The event details much match.
    - removeNamedEvent - Removes a tracked named event using an event name string.
    - removeAllTrackedEvents - Removes all tracked events from the event instance, regardless of if they are named.
    - getNamedEvents - Returns all events that have a matching name string.
    - getAllTrackedEvents - Returns all events that are being tracked by the event instance.

## Example: Create and remove an unnamed tracked Event.
```js
const helloButton = .document.getElementById('#hello-button');
eventInstance.addTrackedEvent(helloButton, 'click', () => {console.log('Hello World')});
eventInstance.removeTrackedEvent(helloButton, 'click', () => {console.log('Hello World')});
```


## Example: Create and remove a named tracked Event.
```js
const helloButton = .document.getElementById('#hello-button');
eventInstance.addTrackedEvent(helloButton, 'click', () => {console.log('Hello World')}, 'helloButton');
eventInstance.removeNamedEvent('helloButton');
```


## Example: Create several events and remove them all.
```js
const helloButton = .document.getElementById('#hello-button');
const trackedInput = .document.getElementById('#tracked-input');
eventInstance.addTrackedEvent(helloButton, 'click', () => {console.log('Hello World')}, 'helloButton');
eventInstance.addTrackedEvent(trackedInput, 'change',  trackedInputChange);
eventInstance.removeAllTrackedEvents();

function trackedInputChange() {
    console.log('The tracked input has changed.')
}

```

## TUIJS-Event Also has some helpful tools to collect information about the event instance state. These can be very useful during troubleshooting.
```js
eventInstance.getNamedEvents('eventName');
eventInstance.getAllTrackedEvents();
```