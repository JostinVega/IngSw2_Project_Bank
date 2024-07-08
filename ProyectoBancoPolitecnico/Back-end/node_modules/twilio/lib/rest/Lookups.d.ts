import { PhoneNumberListInstance } from "twilio/lib/rest/lookups/v1/phoneNumber";
import LookupsBase from "twilio/lib/rest/LookupsBase";
declare class Lookups extends LookupsBase {
    /**
     * @deprecated - Use v1.phoneNumbers instead
     */
    get phoneNumbers(): PhoneNumberListInstance;
}
export = Lookups;
