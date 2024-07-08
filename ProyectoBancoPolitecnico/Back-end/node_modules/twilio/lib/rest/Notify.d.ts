import { CredentialListInstance } from "twilio/lib/rest/notify/v1/credential";
import { ServiceListInstance } from "twilio/lib/rest/notify/v1/service";
import NotifyBase from "twilio/lib/rest/NotifyBase";
declare class Notify extends NotifyBase {
    /**
     * @deprecated - Use v1.credentials instead
     */
    get credentials(): CredentialListInstance;
    /**
     * @deprecated - Use v1.services instead
     */
    get services(): ServiceListInstance;
}
export = Notify;
