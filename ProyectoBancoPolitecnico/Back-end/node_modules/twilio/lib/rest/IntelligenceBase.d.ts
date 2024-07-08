import Domain from "twilio/lib/base/Domain";
import V2 from "twilio/lib/rest/intelligence/V2";
declare class IntelligenceBase extends Domain {
    _v2?: V2;
    /**
     * Initialize intelligence domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v2(): V2;
}
export = IntelligenceBase;
