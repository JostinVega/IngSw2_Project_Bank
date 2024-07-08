import { CommandListInstance } from "twilio/lib/rest/wireless/v1/command";
import { RatePlanListInstance } from "twilio/lib/rest/wireless/v1/ratePlan";
import { SimListInstance } from "twilio/lib/rest/wireless/v1/sim";
import { UsageRecordListInstance } from "twilio/lib/rest/wireless/v1/usageRecord";
import WirelessBase from "twilio/lib/rest/WirelessBase";
declare class Wireless extends WirelessBase {
    /**
     * @deprecated - Use v1.usageRecords instead
     */
    get usageRecords(): UsageRecordListInstance;
    /**
     * @deprecated - Use v1.commands instead
     */
    get commands(): CommandListInstance;
    /**
     * @deprecated - Use v1.ratePlans instead
     */
    get ratePlans(): RatePlanListInstance;
    /**
     * @deprecated - Use v1.sims instead
     */
    get sims(): SimListInstance;
}
export = Wireless;
