import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/oauth/V1";
declare class OauthBase extends Domain {
    _v1?: V1;
    /**
     * Initialize oauth domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = OauthBase;
