import { CallListInstance } from "twilio/lib/rest/insights/v1/call";
import { CallSummariesListInstance } from "twilio/lib/rest/insights/v1/callSummaries";
import { ConferenceListInstance } from "twilio/lib/rest/insights/v1/conference";
import { RoomListInstance } from "twilio/lib/rest/insights/v1/room";
import { SettingListInstance } from "twilio/lib/rest/insights/v1/setting";
import InsightsBase from "twilio/lib/rest/InsightsBase";
declare class Insights extends InsightsBase {
    /**
     * @deprecated - Use v1.settings instead
     */
    get settings(): SettingListInstance;
    /**
     * @deprecated - Use v1.calls instead
     */
    get calls(): CallListInstance;
    /**
     * @deprecated - Use v1.callSummaries instead
     */
    get callSummaries(): CallSummariesListInstance;
    /**
     * @deprecated - Use v1.conferences instead
     */
    get conferences(): ConferenceListInstance;
    /**
     * @deprecated - Use v1.rooms instead
     */
    get rooms(): RoomListInstance;
}
export = Insights;
