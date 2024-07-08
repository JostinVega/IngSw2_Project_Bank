import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/taskrouter/V1";
declare class TaskrouterBase extends Domain {
    _v1?: V1;
    /**
     * Initialize taskrouter domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = TaskrouterBase;
