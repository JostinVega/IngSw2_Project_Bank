import { BrandRegistrationListInstance } from "twilio/lib/rest/messaging/v1/brandRegistration";
import { DeactivationsListInstance } from "twilio/lib/rest/messaging/v1/deactivations";
import { ExternalCampaignListInstance } from "twilio/lib/rest/messaging/v1/externalCampaign";
import { ServiceListInstance } from "twilio/lib/rest/messaging/v1/service";
import { UsecaseListInstance } from "twilio/lib/rest/messaging/v1/usecase";
import { DomainCertsListInstance } from "twilio/lib/rest/messaging/v1/domainCerts";
import { DomainConfigListInstance } from "twilio/lib/rest/messaging/v1/domainConfig";
import MessagingBase from "twilio/lib/rest/MessagingBase";
declare class Messaging extends MessagingBase {
    /**
     * @deprecated - Use v1.brandRegistrations instead
     */
    get brandRegistrations(): BrandRegistrationListInstance;
    /**
     * @deprecated - Use v1.deactivations instead
     */
    get deactivations(): DeactivationsListInstance;
    /**
     * @deprecated - Use v1.domainCerts instead
     */
    get domainCerts(): DomainCertsListInstance;
    /**
     * @deprecated - Use v1.domainConfig instead
     */
    get domainConfig(): DomainConfigListInstance;
    /**
     * @deprecated - Use v1.externalCampaign instead
     */
    get externalCampaign(): ExternalCampaignListInstance;
    /**
     * @deprecated - Use v1.services instead
     */
    get services(): ServiceListInstance;
    /**
     * @deprecated - Use v1.usecases instead
     */
    get usecases(): UsecaseListInstance;
}
export = Messaging;
