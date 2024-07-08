import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/trunking/V1";
declare class TrunkingBase extends Domain {
    _v1?: V1;
    /**
     * Initialize trunking domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = TrunkingBase;
