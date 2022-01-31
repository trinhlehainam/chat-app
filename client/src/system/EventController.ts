import { Subject } from "rxjs";

class EventController {
    private eventMap: Map<string, Subject<any>>;
    private static instance?: EventController = undefined;

    public static Create(): EventController {
        if (!this.instance)
            this.instance = new EventController();

        return this.instance;
    }

    public static Destroy(): void {
        if (this.instance) {
            // NOTE: clear all subcriptions and events
            const events = Array.from(this.instance.eventMap.values());
            events.forEach(e => e.unsubscribe());
            this.instance.eventMap.clear();
            //

            delete this.instance;
            this.instance = undefined;
        }
    }

    public static emit(eventName: string, message?: any) {
        if (!this.instance) {
            console.log("BUG: EventController hasn't created !");
            return;
        }

        const eventMap = this.instance.eventMap;
        const event = eventMap.get(eventName);

        if (event) {
            event.next(message);
        }
        else if (!event) {
            const subject = new Subject<any>();
            eventMap.set(eventName, subject);
            subject.next(message);
        }
    }

    public static on(eventName: string, callback: (message: any) => void) {
        if (!this.instance) {
            console.log("BUG: EventController hasn't created !");
            return;
        }

        const eventMap = this.instance.eventMap;
        const event = eventMap.get(eventName);

        if (event) {
            event.subscribe(callback);
        }
        else if (!event) {
            const subject = new Subject<any>();
            eventMap.set(eventName, subject);
            subject.subscribe(callback);
        }
    }

    private constructor() {
        this.eventMap = new Map();
    }
}

export default EventController;
