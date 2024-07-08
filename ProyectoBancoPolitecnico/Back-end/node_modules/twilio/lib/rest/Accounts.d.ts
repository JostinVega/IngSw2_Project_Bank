import { AuthTokenPromotionListInstance } from "twilio/lib/rest/accounts/v1/authTokenPromotion";
import { CredentialListInstance } from "twilio/lib/rest/accounts/v1/credential";
import { SecondaryAuthTokenListInstance } from "twilio/lib/rest/accounts/v1/secondaryAuthToken";
import AccountsBase from "twilio/lib/rest/AccountsBase";
declare class Accounts extends AccountsBase {
    /**
     * @deprecated - Use v1.authTokenPromotion; instead
     */
    get authTokenPromotion(): AuthTokenPromotionListInstance;
    /**
     * @deprecated - Use v1.credentials; instead
     */
    get credentials(): CredentialListInstance;
    /**
     * @deprecated - Use v1.secondaryAuthToken; instead
     */
    get secondaryAuthToken(): SecondaryAuthTokenListInstance;
}
export = Accounts;
