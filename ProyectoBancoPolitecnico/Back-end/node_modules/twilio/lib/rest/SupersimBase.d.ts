import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/supersim/V1";
declare class SupersimBase extends Domain {
    _v1?: V1;
    /**
     * Initialize supersim domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = SupersimBase;
