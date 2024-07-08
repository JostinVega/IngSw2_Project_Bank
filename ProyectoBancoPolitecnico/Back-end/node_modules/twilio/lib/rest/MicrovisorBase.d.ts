import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/microvisor/V1";
declare class MicrovisorBase extends Domain {
    _v1?: V1;
    /**
     * Initialize microvisor domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = MicrovisorBase;
