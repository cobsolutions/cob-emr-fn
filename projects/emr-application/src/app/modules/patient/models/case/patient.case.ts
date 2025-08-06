import { CaseDiagnosis } from "./case.diagnosis";
import { CaseOtherInformation } from "./case.other.information";
import { CaseInsuranceInformation } from "./case.insurance.info";
import { TreatingDoctor } from "./case.treating.doctor";
import { ReferralCase } from "./case.referral";
import { PlaceOfService } from "../../../common/models/enums/place.service";
import { InjuryCase } from "../../../common/models/enums/injury.case";

export interface PatientCase {
    id?: number| null;
    title?: string;
    placeOfService?: PlaceOfService | null;
    treatingDoctor?: TreatingDoctor | null;
    injuryCase?: InjuryCase | null;
    caseInsuranceInformation?: CaseInsuranceInformation;
    caseDiagnosis?: CaseDiagnosis[] ;
    referralCase?: ReferralCase ;
    therapist?: number;
    therapistUUID?:string;
    caseOtherInformation?: CaseOtherInformation;
    patientRecordActions?:string[]
}