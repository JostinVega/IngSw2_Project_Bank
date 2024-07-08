import { FormListInstance } from "twilio/lib/rest/verify/v2/form";
import { ServiceListInstance } from "twilio/lib/rest/verify/v2/service";
import { TemplateListInstance } from "twilio/lib/rest/verify/v2/template";
import { VerificationAttemptListInstance } from "twilio/lib/rest/verify/v2/verificationAttempt";
import { VerificationAttemptsSummaryListInstance } from "twilio/lib/rest/verify/v2/verificationAttemptsSummary";
import VerifyBase from "twilio/lib/rest/VerifyBase";
declare class Verify extends VerifyBase {
    /**
     * @deprecated - Use v2.forms instead
     */
    get forms(): FormListInstance;
    /**
     * @deprecated - Use v2.services instead
     */
    get services(): ServiceListInstance;
    /**
     * @deprecated - Use v2.verificationAttempts instead
     */
    get verificationAttempts(): VerificationAttemptListInstance;
    /**
     * @deprecated - Use v2.verificationAttemptsSummary instead
     */
    get verificationAttemptsSummary(): VerificationAttemptsSummaryListInstance;
    /**
     * @deprecated - Use v2.templates instead
     */
    get templates(): TemplateListInstance;
}
export = Verify;
