/// <reference types="node" />
import { inspect, InspectOptions } from "util";
import V1 from "twilio/lib/rest/accounts/V1";
import { AwsListInstance } from "twilio/lib/rest/accounts/v1/credential/aws";
import { PublicKeyListInstance } from "twilio/lib/rest/accounts/v1/credential/publicKey";
export interface CredentialSolution {
}
export interface CredentialListInstance {
    _version: V1;
    _solution: CredentialSolution;
    _uri: string;
    _aws?: AwsListInstance;
    aws: AwsListInstance;
    _publicKey?: PublicKeyListInstance;
    publicKey: PublicKeyListInstance;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function CredentialListInstance(version: V1): CredentialListInstance;
