import { ServiceListInstance } from "twilio/lib/rest/serverless/v1/service";
import ServerlessBase from "twilio/lib/rest/ServerlessBase";
declare class Serverless extends ServerlessBase {
    /**
     * @deprecated - Use v1.services instead
     */
    get services(): ServiceListInstance;
}
export = Serverless;
