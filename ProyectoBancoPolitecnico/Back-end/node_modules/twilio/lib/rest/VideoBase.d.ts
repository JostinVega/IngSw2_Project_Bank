import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/video/V1";
declare class VideoBase extends Domain {
    _v1?: V1;
    /**
     * Initialize video domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = VideoBase;
