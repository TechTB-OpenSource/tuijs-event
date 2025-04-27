// tuijs-router.d.ts
declare module 'tuijs-event' {

    export interface TrackedEventListener {
        element: HTMLElement,
        eventType: string,
        callback: Function,
        name?: string | null
    }
    export type trackedEventListenerList = TrackedEventListener[];


    export interface EventInstance {
        addTrackedEvent: (element: Element, eventType: string, callback: Function, name?: string) => boolean;
        removeTrackedEvent: (element: Element, eventType: string, callback: Function) => boolean;
        removeNamedEvent: (name: string) => boolean;
        removeAllTrackedEvents: () => boolean;
        getNamedEvents: (name: string) => TrackedEventListener[];
        getAllTrackedEvents: (name: string) => trackedEventListenerList;
    }

    export { main as tuiEvent };
}
