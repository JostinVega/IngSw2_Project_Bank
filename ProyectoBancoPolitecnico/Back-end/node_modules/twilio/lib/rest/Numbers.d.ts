import { RegulatoryComplianceListInstance } from "twilio/lib/rest/numbers/v2/regulatoryCompliance";
import NumbersBase from "twilio/lib/rest/NumbersBase";
declare class Numbers extends NumbersBase {
    /**
     * @deprecated - Use v2.regulatoryCompliance instead
     */
    get regulatoryCompliance(): RegulatoryComplianceListInstance;
}
export = Numbers;
