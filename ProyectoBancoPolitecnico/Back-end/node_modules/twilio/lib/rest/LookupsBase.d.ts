import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/lookups/V1";
import V2 from "twilio/lib/rest/lookups/V2";
declare class LookupsBase extends Domain {
    _v1?: V1;
    _v2?: V2;
    /**
     * Initialize lookups domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
    get v2(): V2;
}
export = LookupsBase;
