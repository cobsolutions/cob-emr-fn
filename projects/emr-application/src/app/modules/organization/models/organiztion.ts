import { Address } from "../../common/models";
import { Clinic } from "../../patient/models/clinic";
import { ClinicDataHolder } from "../../patient/models/clinic.data.holder";

export interface Organization {
    id?: number;
    name?: string;
    dba?: string;
    groupNPI?: string;
    taxID?: string;
    billingAddress?: Address;
    clinics?:ClinicDataHolder[]
}