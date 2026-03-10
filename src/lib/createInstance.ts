import type { EventElement, TrackedEventListener, trackedEventListenerList } from './models';

export function createEventInstance() {
    let trackedEventListenerList: trackedEventListenerList = [];

    function addTrackedEvent(element: EventElement, eventType: string, callback: EventListener, name: string | null = null): boolean {
        if (typeof eventType !== 'string') {
            throw new Error(`The 'eventType' param is not a string.`);
        }
        if (name !== null && typeof name !== 'string') {
            throw new Error(`The 'name' param is not a string.`);
        }
        element.addEventListener(eventType, callback);
        trackedEventListenerList.push({
            element,
            eventType,
            callback,
            ...(name !== null && { name })
        });
        return true;
    }

    function removeTrackedEvent(element: EventElement, eventType: string, callback: EventListener): boolean {
        element.removeEventListener(eventType, callback);
        trackedEventListenerList = trackedEventListenerList.filter(
            (listener) => !(listener.element === element && listener.eventType === eventType && listener.callback === callback)
        );
        return true;
    }

    function removeNamedEvent(name: string): boolean {
        if (typeof name !== 'string') {
            throw new Error(`Name is not a string.`);
        }
        const namedEvents = getNamedEvents(name) || [];
        if (!namedEvents) {
            return false;
        }
        for (let i = 0; i < namedEvents.length; i++) {
            const element: EventElement = namedEvents[i].element;
            const eventType: string = namedEvents[i].eventType;
            const callback: EventListener = namedEvents[i].callback;
            removeTrackedEvent(element, eventType, callback);
        }
        return true;
    }

    function removeAllTrackedEvents(): boolean {
        trackedEventListenerList.forEach(({ element, eventType, callback }) => {
            element.removeEventListener(eventType, callback);
        });
        trackedEventListenerList = [];
        return true;
    }

    function getNamedEvents(name: string): Array<TrackedEventListener> | false {
        const namedEvents = trackedEventListenerList.filter(listener => listener.name === name);
        if (namedEvents.length === 0) {
            return false;
        }
        return namedEvents;
    }

    function getAllTrackedEvents(): Array<TrackedEventListener> {
        return trackedEventListenerList;
    }

    return {
        addTrackedEvent,
        removeTrackedEvent,
        removeNamedEvent,
        removeAllTrackedEvents,
        getNamedEvents,
        getAllTrackedEvents
    };
}
