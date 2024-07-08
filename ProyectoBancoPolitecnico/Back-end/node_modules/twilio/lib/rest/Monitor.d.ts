import { AlertListInstance } from "twilio/lib/rest/monitor/v1/alert";
import { EventListInstance } from "twilio/lib/rest/monitor/v1/event";
import MonitorBase from "twilio/lib/rest/MonitorBase";
declare class Monitor extends MonitorBase {
    /**
     * @deprecated - Use v1.alerts instead
     */
    get alerts(): AlertListInstance;
    /**
     * @deprecated - Use v1.events instead
     */
    get events(): EventListInstance;
}
export = Monitor;
