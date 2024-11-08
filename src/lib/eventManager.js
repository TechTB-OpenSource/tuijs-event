import { checkIsElement, checkIsFunction } from 'tuijs-util'

export function main() {
    let trackedListeners = [];

    /**
     * Adds an event listener that is tracked.
     * @param {Element} element 
     * @param {string} eventType 
     * @param {Function} callback 
     * @returns {void}
     * @throws {Error} - Throws an error if an Error occurs.
     */
    function addTrackedEvent(element, eventType, callback, name = null) {
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
            trackedListeners.push({
                element,
                eventType,
                callback,
                ...(name !== null && { name })
            });
            return;
        } catch (er) {
            throw new Error(`TUI Event Error: ${er.message}`);
        }
    }

    /**
     * Removes an event listener that is tracked.
     * @param {Element} element 
     * @param {string} eventType 
     * @param {Function} callback
     * @returns {void}
     * @throws {Error} - Throws an error if an Error occurs.
     */
    function removeTrackedEvent(element, eventType, callback) {
        try {
            element.removeEventListener(eventType, callback);
            trackedListeners = trackedListeners.filter(
                (listener) => !(listener.element === element && listener.eventType === eventType && listener.callback === callback)
            );
            return;
        } catch (er) {
            throw new Error(`TUI Event Error: ${er.message}`);
        }
    }

    /**
     * Removes an event listener by its name.
     * @param {string} name - Name of the event that should be removed.
     * @returns {void}
     * @throws {Error} - Throws an error if an Error occurs.
     */
    function removeNamedEvent(name) {
        try {
            if (typeof name !== 'string') {
                throw new Error(`Name is not a string.`);
            }
            const namedEvents = getNamedEvents(name);
            if (!namedEvents) {
                console.warn(`TUIJS-Event Warning (removeNamedEvent): Named event '${name}' does not exist.`);
                return;
            }
            for (let i = 0; i < namedEvents.length; i++) {
                const element = namedEvents[i].element;
                const eventType = namedEvents[i].eventType;
                const callback = namedEvents[i].callback;
                removeTrackedEvent(element, eventType, callback);
            }
            return;
        } catch (er) {
            throw new Error(`TUI Event Error: ${er.message}`);
        }
    }

    /**
     * Removes all event listeners that are tracked.
     * @returns {void}
     * @throws {Error} - Throws an error if an Error occurs.
     */
    function removeAllTrackedEvents() {
        try {
            trackedListeners.forEach(({ element, eventType, callback }) => {
                element.removeEventListener(eventType, callback);
            });
            trackedListeners = [];
        } catch (er) {
            throw new Error(`TUI Event Error: ${er.message}`);
        }
    }

    /**
     * Returns the event Object where the 'name' string matches the name in the object.
     * @param {string} name 
     * @returns {Object|undefined}
     * @throws {Error} - Throws an error if an Error occurs.
     */
    function getNamedEvents(name) {
        try {
            return trackedListeners.filter(listener => listener.name === name);
        } catch (er) {
            throw new Error(`TUI Event Error: ${er.message}`);
        }
    }

    /**
     * Returns all event Objects in an Array.
     * @returns {Array}
     * @throws {Error} - Throws an error if an Error occurs.
     */
    function getAllTrackedEvents() {
        try {
            return trackedListeners;
        } catch (er) {
            throw new Error(`TUI Event Error: ${er.message}`);
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
