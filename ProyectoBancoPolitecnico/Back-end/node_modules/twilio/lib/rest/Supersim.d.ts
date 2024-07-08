import { EsimProfileListInstance } from "twilio/lib/rest/supersim/v1/esimProfile";
import { FleetListInstance } from "twilio/lib/rest/supersim/v1/fleet";
import { IpCommandListInstance } from "twilio/lib/rest/supersim/v1/ipCommand";
import { NetworkListInstance } from "twilio/lib/rest/supersim/v1/network";
import { NetworkAccessProfileListInstance } from "twilio/lib/rest/supersim/v1/networkAccessProfile";
import { SettingsUpdateListInstance } from "twilio/lib/rest/supersim/v1/settingsUpdate";
import { SimListInstance } from "twilio/lib/rest/supersim/v1/sim";
import { SmsCommandListInstance } from "twilio/lib/rest/supersim/v1/smsCommand";
import { UsageRecordListInstance } from "twilio/lib/rest/supersim/v1/usageRecord";
import SupersimBase from "twilio/lib/rest/SupersimBase";
declare class Supersim extends SupersimBase {
    /**
     * @deprecated - Use v1.esimProfiles instead
     */
    get esimProfiles(): EsimProfileListInstance;
    /**
     * @deprecated - Use v1.fleets instead
     */
    get fleets(): FleetListInstance;
    /**
     * @deprecated - Use v1.ipCommands instead
     */
    get ipCommands(): IpCommandListInstance;
    /**
     * @deprecated - Use v1.networks instead
     */
    get networks(): NetworkListInstance;
    /**
     * @deprecated - Use v1.settingsUpdates instead
     */
    get settingsUpdates(): SettingsUpdateListInstance;
    /**
     * @deprecated - Use v1.networkAccessProfiles instead
     */
    get networkAccessProfiles(): NetworkAccessProfileListInstance;
    /**
     * @deprecated - Use v1.sims instead
     */
    get sims(): SimListInstance;
    /**
     * @deprecated - Use v1.smsCommands instead
     */
    get smsCommands(): SmsCommandListInstance;
    /**
     * @deprecated - Use v1.usageRecords instead
     */
    get usageRecords(): UsageRecordListInstance;
}
export = Supersim;
