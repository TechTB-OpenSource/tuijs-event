export function createEventInstance() {
    let trackedEventListenerList = [];
    function addTrackedEvent(element, eventType, callback, name = null) {
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
    function removeTrackedEvent(element, eventType, callback) {
        element.removeEventListener(eventType, callback);
        trackedEventListenerList = trackedEventListenerList.filter((listener) => !(listener.element === element && listener.eventType === eventType && listener.callback === callback));
        return true;
    }
    function removeNamedEvent(name) {
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
    }
    function removeAllTrackedEvents() {
        trackedEventListenerList.forEach(({ element, eventType, callback }) => {
            element.removeEventListener(eventType, callback);
        });
        trackedEventListenerList = [];
        return true;
    }
    function getNamedEvents(name) {
        const namedEvents = trackedEventListenerList.filter(listener => listener.name === name);
        if (namedEvents.length === 0) {
            return false;
        }
        return namedEvents;
    }
    function getAllTrackedEvents() {
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
//# sourceMappingURL=createInstance.js.map