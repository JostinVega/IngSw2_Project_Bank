import { CredentialListInstance } from "twilio/lib/rest/ipMessaging/v2/credential";
import { ServiceListInstance } from "twilio/lib/rest/ipMessaging/v2/service";
import IpMessagingBase from "twilio/lib/rest/IpMessagingBase";
declare class IpMessaging extends IpMessagingBase {
    /**
     * @deprecated - Use v2.credentials instead
     */
    get credentials(): CredentialListInstance;
    /**
     * @deprecated - Use v2.services instead
     */
    get services(): ServiceListInstance;
}
export = IpMessaging;
