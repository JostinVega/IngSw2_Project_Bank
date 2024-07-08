import { WorkspaceListInstance } from "twilio/lib/rest/taskrouter/v1/workspace";
import TaskrouterBase from "twilio/lib/rest/TaskrouterBase";
declare class Taskrouter extends TaskrouterBase {
    /**
     * @deprecated - Use v1.workspaces instead
     */
    get workspaces(): WorkspaceListInstance;
}
export = Taskrouter;
