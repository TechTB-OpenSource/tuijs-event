export type EventElement = HTMLElement | Document | Window;

export interface TrackedEventListener {
    element: EventElement;
    eventType: string;
    callback: EventListener;
    name?: string | null;
}

export type trackedEventListenerList = TrackedEventListener[];
