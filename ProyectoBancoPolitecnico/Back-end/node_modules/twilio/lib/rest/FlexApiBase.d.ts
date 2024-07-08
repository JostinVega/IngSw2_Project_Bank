import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/flexApi/V1";
import V2 from "twilio/lib/rest/flexApi/V2";
declare class FlexApiBase extends Domain {
    _v1?: V1;
    _v2?: V2;
    /**
     * Initialize flexApi domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
    get v2(): V2;
}
export = FlexApiBase;
