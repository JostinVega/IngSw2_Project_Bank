import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/marketplace/V1";
declare class MarketplaceBase extends Domain {
    _v1?: V1;
    /**
     * Initialize marketplace domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = MarketplaceBase;
