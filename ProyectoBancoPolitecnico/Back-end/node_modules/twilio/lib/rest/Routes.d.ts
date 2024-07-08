import { PhoneNumberListInstance } from "twilio/lib/rest/routes/v2/phoneNumber";
import { SipDomainListInstance } from "twilio/lib/rest/routes/v2/sipDomain";
import { TrunkListInstance } from "twilio/lib/rest/routes/v2/trunk";
import RoutesBase from "twilio/lib/rest/RoutesBase";
declare class Routes extends RoutesBase {
    /**
     * @deprecated - Use v1.phoneNumbers instead
     */
    get phoneNumbers(): PhoneNumberListInstance;
    /**
     * @deprecated - Use v1.sipDomains instead
     */
    get sipDomains(): SipDomainListInstance;
    /**
     * @deprecated - Use v1.trunks instead
     */
    get trunks(): TrunkListInstance;
}
export = Routes;
