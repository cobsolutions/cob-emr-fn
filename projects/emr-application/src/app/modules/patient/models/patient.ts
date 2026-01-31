import { Address } from "../../common/models";
import { Gender } from "../../common/models/enums/geneder";
import { IdType } from "../../common/models/enums/id.type";
import { MaritalStatus } from "../../common/models/enums/marital.status";
import { Suffix } from "../../common/models/enums/suffix";
import { Title } from "../../common/models/enums/title";
import { PatientCase } from "./case/patient.case";
import { Clinic } from "./clinic";
import { Dependent } from "./dependent/patient.dependent";
import { Emergency } from "./emergency/patient.emergency";
import { PatientInsurance } from "./insurance/patient.insurance";
import { Contact } from "./patient.contact";

export interface Patient {
    id?: number | null;
    fullName?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    displayName?: string;
    birthDate?: number;
    birthDate_date?: Date | null;
    gender?: Gender | null;
    maritalStatus?: MaritalStatus | null;
    suffix?: Suffix | null;
    employerName?: string;
    title?: Title | null;
    addtionalInfo?: string;
    idType?: IdType | null;
    patientId?: string;
    effectiveFromDate?: number;
    effectiveFromDate_Date?: Date | null;
    effectiveToDate?: number;
    effectiveToDate_Date?: Date | null;
    uuid?:string,
    addresses?: Address[];
    contacts?: Contact[];
    emergencies?: Emergency[];
    isDependent?: boolean
    dependent?: Dependent;
    clinicsId?: number[];
    clinicModels?: Clinic[]
    cases?: PatientCase[];
    emrId?:string,
    patientStatus?:string
    patientInsuranceModels?: PatientInsurance[];

}