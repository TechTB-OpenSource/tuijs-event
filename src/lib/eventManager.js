export function eventManager() {
    let trackedListeners = [];

    /**
     * Adds an event listener that is tracked.
     * @param {Element} element 
     * @param {string} eventType 
     * @param {Function} callback 
     * @returns {void}
     * @throws {Error} - Throws an error if an Error occurs.
     */
    function addTrackedEvent(element, eventType, callback) {
        try {
            element.addEventListener(eventType, callback);
            trackedListeners.push({ element, eventType, callback });
        } catch (er) {
            throw new Error(er.message);
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
        } catch (er) {
            throw new Error(er.message);
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
            throw new Error(er.message);
        }
    }

    return {
        addTrackedEvent,
        removeTrackedEvent,
        removeAllTrackedEvents,
    };
}
