import ChatBase from "twilio/lib/rest/ChatBase";
import Version from "twilio/lib/base/Version";
import { CredentialListInstance } from "twilio/lib/rest/chat/v2/credential";
import { ServiceListInstance } from "twilio/lib/rest/chat/v2/service";
export default class V2 extends Version {
    /**
     * Initialize the V2 version of Chat
     *
     * @param domain - The Twilio (Twilio.Chat) domain
     */
    constructor(domain: ChatBase);
    /** credentials - { Twilio.Chat.V2.CredentialListInstance } resource */
    protected _credentials?: CredentialListInstance;
    /** services - { Twilio.Chat.V2.ServiceListInstance } resource */
    protected _services?: ServiceListInstance;
    /** Getter for credentials resource */
    get credentials(): CredentialListInstance;
    /** Getter for services resource */
    get services(): ServiceListInstance;
}
