import { TrunkListInstance } from "twilio/lib/rest/trunking/v1/trunk";
import TrunkingBase from "twilio/lib/rest/TrunkingBase";
declare class Trunking extends TrunkingBase {
    /**
     * @deprecated - Use v1.trunks instead
     */
    get trunks(): TrunkListInstance;
}
export = Trunking;
