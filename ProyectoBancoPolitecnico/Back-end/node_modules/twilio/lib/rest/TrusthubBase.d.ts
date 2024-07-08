import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/trusthub/V1";
declare class TrusthubBase extends Domain {
    _v1?: V1;
    /**
     * Initialize trusthub domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = TrusthubBase;
