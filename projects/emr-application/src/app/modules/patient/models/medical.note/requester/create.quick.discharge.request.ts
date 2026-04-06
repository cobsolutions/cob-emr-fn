import { ProviderInfo } from "../../../../security/model/provider-info"

export interface CreateQuickDischargeRequest {
    patientCaseId: string;
    createdBy?: ProviderInfo;
}
