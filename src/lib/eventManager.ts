import { checkIsElement, checkIsFunction } from 'tuijs-util'

import type { EventElement, TrackedEventListener, trackedEventListenerList } from './models';

export function createEventInstance() {
    let trackedEventListenerList: trackedEventListenerList = [];

    function addTrackedEvent(element: EventElement, eventType: string, callback: Function, name: string | null = null): boolean {
        try {
            if (!checkIsElement(element)) {
                throw new Error(`The 'element' param is not an Element.`);
            }
            if (typeof eventType !== 'string') {
                throw new Error(`The 'eventType' param is not a string.`);
            }
            if (!checkIsFunction(callback)) {
                throw new Error(`The 'callback' param is not a Function.`);
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
        } catch (er: unknown) {
            throw new Error(`TUI Event Error: ${er}`);
        }
    }

    function removeTrackedEvent(element: EventElement, eventType: string, callback: Function): boolean {
        try {
            element.removeEventListener(eventType, callback);
            trackedEventListenerList = trackedEventListenerList.filter(
                (listener) => !(listener.element === element && listener.eventType === eventType && listener.callback === callback)
            );
            return true;
        } catch (er: unknown) {
            throw new Error(`TUI Event Error: ${er}`);
        }
    }

    function removeNamedEvent(name: string): boolean {
        try {
            if (typeof name !== 'string') {
                throw new Error(`Name is not a string.`);
            }
            const namedEvents = getNamedEvents(name) || [];
            if (!namedEvents) {
                return false;
            }
            for (let i = 0; i < namedEvents.length; i++) {
                const element = namedEvents[i].element;
                const eventType = namedEvents[i].eventType;
                const callback = namedEvents[i].callback;
                removeTrackedEvent(element, eventType, callback);
            }
            return true;
        } catch (er: unknown) {
            throw new Error(`TUI Event Error: ${er}`);
        }
    }

    function removeAllTrackedEvents(): boolean {
        try {
            trackedEventListenerList.forEach(({ element, eventType, callback }) => {
                element.removeEventListener(eventType, callback);
            });
            trackedEventListenerList = [];
            return true;
        } catch (er: unknown) {
            throw new Error(`TUI Event Error: ${er}`);
        }
    }

    function getNamedEvents(name: string): Array<TrackedEventListener> | false {
        try {
            const namedEvents = trackedEventListenerList.filter(listener => listener.name === name);
            if (namedEvents.length === 0) {
                return false;
            }
            return namedEvents;
        } catch (er: unknown) {
            throw new Error(`TUI Event Error: ${er}`);
        }
    }

    function getAllTrackedEvents(): Array<TrackedEventListener> {
        try {
            return trackedEventListenerList;
        } catch (er: unknown) {
            throw new Error(`TUI Event Error: ${er}`);
        }
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
