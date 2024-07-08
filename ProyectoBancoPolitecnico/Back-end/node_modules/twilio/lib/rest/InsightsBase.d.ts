import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/insights/V1";
declare class InsightsBase extends Domain {
    _v1?: V1;
    /**
     * Initialize insights domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = InsightsBase;
