import Domain from "twilio/lib/base/Domain";
import V1 from "twilio/lib/rest/accounts/V1";
declare class AccountsBase extends Domain {
    _v1?: V1;
    /**
     * Initialize accounts domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = AccountsBase;
