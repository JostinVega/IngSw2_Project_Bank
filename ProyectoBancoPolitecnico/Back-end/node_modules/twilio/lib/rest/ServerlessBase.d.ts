import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/serverless/V1";
declare class ServerlessBase extends Domain {
    _v1?: V1;
    /**
     * Initialize serverless domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = ServerlessBase;
