import ContentBase from "twilio/lib/rest/ContentBase";
import { ContentListInstance } from "twilio/lib/rest/content/v1/content";
declare class Content extends ContentBase {
    /**
     * @deprecated - Use v1.contents instead
     */
    get contents(): ContentListInstance;
}
export = Content;
