import { EventTypeListInstance } from "twilio/lib/rest/events/v1/eventType";
import { SchemaListInstance } from "twilio/lib/rest/events/v1/schema";
import { SinkListInstance } from "twilio/lib/rest/events/v1/sink";
import { SubscriptionListInstance } from "twilio/lib/rest/events/v1/subscription";
import EventsBase from "twilio/lib/rest/EventsBase";
declare class Events extends EventsBase {
    /**
     * @deprecated - Use v1.eventTypes instead
     */
    get eventTypes(): EventTypeListInstance;
    /**
     * @deprecated - Use v1.schemas instead
     */
    get schemas(): SchemaListInstance;
    /**
     * @deprecated - Use v1.sinks instead
     */
    get sinks(): SinkListInstance;
    /**
     * @deprecated - Use v1.subscriptions instead
     */
    get subscriptions(): SubscriptionListInstance;
}
export = Events;
