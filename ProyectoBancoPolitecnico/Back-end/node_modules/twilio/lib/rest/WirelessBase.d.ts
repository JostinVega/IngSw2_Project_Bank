import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/wireless/V1";
declare class WirelessBase extends Domain {
    _v1?: V1;
    /**
     * Initialize wireless domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = WirelessBase;
