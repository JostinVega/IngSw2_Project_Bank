import Domain from "twilio/lib/base/Domain";
import V2 from "twilio/lib/rest/routes/V2";
declare class RoutesBase extends Domain {
    _v2?: V2;
    /**
     * Initialize routes domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v2(): V2;
}
export = RoutesBase;
