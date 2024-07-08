import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/voice/V1";
declare class VoiceBase extends Domain {
    _v1?: V1;
    /**
     * Initialize voice domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = VoiceBase;
