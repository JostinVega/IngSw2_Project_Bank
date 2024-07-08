import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/numbers/V1";
import V2 from "twilio/lib/rest/numbers/V2";
declare class NumbersBase extends Domain {
    _v1?: V1;
    _v2?: V2;
    /**
     * Initialize numbers domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
    get v2(): V2;
}
export = NumbersBase;
