import type { EventElement, TrackedEventListener } from './models';
export declare function createEventInstance(): {
    addTrackedEvent: (element: EventElement, eventType: string, callback: EventListener, name?: string | null) => boolean;
    removeTrackedEvent: (element: EventElement, eventType: string, callback: EventListener) => boolean;
    removeNamedEvent: (name: string) => boolean;
    removeAllTrackedEvents: () => boolean;
    getNamedEvents: (name: string) => Array<TrackedEventListener> | false;
    getAllTrackedEvents: () => Array<TrackedEventListener>;
};
//# sourceMappingURL=createInstance.d.ts.map