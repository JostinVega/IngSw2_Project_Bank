import { UserListInstance } from "twilio/lib/rest/frontlineApi/v1/user";
import FrontlineApiBase from "twilio/lib/rest/FrontlineApiBase";
declare class FrontlineApi extends FrontlineApiBase {
    /**
     * @deprecated - Use v1.users instead
     */
    get users(): UserListInstance;
}
export = FrontlineApi;
