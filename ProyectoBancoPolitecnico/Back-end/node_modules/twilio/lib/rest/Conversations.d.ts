import { AddressConfigurationListInstance } from "twilio/lib/rest/conversations/v1/addressConfiguration";
import { ConfigurationListInstance } from "twilio/lib/rest/conversations/v1/configuration";
import { ConversationListInstance } from "twilio/lib/rest/conversations/v1/conversation";
import { CredentialListInstance } from "twilio/lib/rest/conversations/v1/credential";
import { ParticipantConversationListInstance } from "twilio/lib/rest/conversations/v1/participantConversation";
import { RoleListInstance } from "twilio/lib/rest/conversations/v1/role";
import { ServiceListInstance } from "twilio/lib/rest/conversations/v1/service";
import { UserListInstance } from "twilio/lib/rest/conversations/v1/user";
import ConversationsBase from "twilio/lib/rest/ConversationsBase";
declare class Conversations extends ConversationsBase {
    /**
     * @deprecated - Use v1.configuration instead
     */
    get configuration(): ConfigurationListInstance;
    /**
     * @deprecated - Use v1.addressConfigurations instead
     */
    get addressConfigurations(): AddressConfigurationListInstance;
    /**
     * @deprecated - Use v1.conversations instead
     */
    get conversations(): ConversationListInstance;
    /**
     * @deprecated - Use v1.credentials instead
     */
    get credentials(): CredentialListInstance;
    /**
     * @deprecated - Use v1.participantConversations instead
     */
    get participantConversations(): ParticipantConversationListInstance;
    /**
     * @deprecated - Use v1.roles instead
     */
    get roles(): RoleListInstance;
    /**
     * @deprecated - Use v1.services instead
     */
    get services(): ServiceListInstance;
    /**
     * @deprecated - Use v1.users instead
     */
    get users(): UserListInstance;
}
export = Conversations;
