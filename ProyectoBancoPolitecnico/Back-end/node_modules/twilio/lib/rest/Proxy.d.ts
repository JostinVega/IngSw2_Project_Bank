import { ServiceListInstance } from "twilio/lib/rest/proxy/v1/service";
import ProxyBase from "twilio/lib/rest/ProxyBase";
declare class Proxy extends ProxyBase {
    /**
     * @deprecated - Use v1.services instead
     */
    get services(): ServiceListInstance;
}
export = Proxy;
