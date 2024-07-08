import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/frontlineApi/V1";
declare class FrontlineApiBase extends Domain {
    _v1?: V1;
    /**
     * Initialize frontlineApi domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = FrontlineApiBase;
