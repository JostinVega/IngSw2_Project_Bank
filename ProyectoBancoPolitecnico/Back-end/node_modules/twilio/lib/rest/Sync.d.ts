import { ServiceListInstance } from "twilio/lib/rest/sync/v1/service";
import SyncBase from "twilio/lib/rest/SyncBase";
declare class Sync extends SyncBase {
    /**
     * @deprecated - Use v1.services instead
     */
    get services(): ServiceListInstance;
}
export = Sync;
