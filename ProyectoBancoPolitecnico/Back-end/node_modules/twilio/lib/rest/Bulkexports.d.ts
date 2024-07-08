import { ExportListInstance } from "twilio/lib/rest/bulkexports/v1/export";
import { ExportConfigurationListInstance } from "twilio/lib/rest/bulkexports/v1/exportConfiguration";
import BulkexportsBase from "twilio/lib/rest/BulkexportsBase";
declare class Bulkexports extends BulkexportsBase {
    /**
     * @deprecated - Use v1.exports instead
     */
    get exports(): ExportListInstance;
    /**
     * @deprecated - Use v1.exportConfiguration instead
     */
    get exportConfiguration(): ExportConfigurationListInstance;
}
export = Bulkexports;
