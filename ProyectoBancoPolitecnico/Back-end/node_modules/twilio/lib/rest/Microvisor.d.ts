import { AppListInstance } from "twilio/lib/rest/microvisor/v1/app";
import { DeviceListInstance } from "twilio/lib/rest/microvisor/v1/device";
import MicrovisorBase from "twilio/lib/rest/MicrovisorBase";
declare class Microvisor extends MicrovisorBase {
    /**
     * @deprecated - Use v1.apps instead
     */
    get apps(): AppListInstance;
    /**
     * @deprecated - Use v1.devices instead
     */
    get devices(): DeviceListInstance;
}
export = Microvisor;
