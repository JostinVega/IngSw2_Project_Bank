import { MessagingListInstance } from "twilio/lib/rest/pricing/v1/messaging";
import { PhoneNumberListInstance } from "twilio/lib/rest/pricing/v1/phoneNumber";
import { VoiceListInstance } from "twilio/lib/rest/pricing/v2/voice";
import { CountryListInstance } from "twilio/lib/rest/pricing/v2/country";
import { NumberListInstance } from "twilio/lib/rest/pricing/v2/number";
import PricingBase from "twilio/lib/rest/PricingBase";
declare class Pricing extends PricingBase {
    /**
     * @deprecated - Use v1.messaging instead
     */
    get messaging(): MessagingListInstance;
    /**
     * @deprecated - Use v1.phoneNumbers instead
     */
    get phoneNumbers(): PhoneNumberListInstance;
    /**
     * @deprecated - Use v2.voice instead
     */
    get voice(): VoiceListInstance;
    /**
     * @deprecated - Use v2.countries instead
     */
    get countries(): CountryListInstance;
    /**
     * @deprecated - Use v2.numbers instead
     */
    get numbers(): NumberListInstance;
}
export = Pricing;
