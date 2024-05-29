import { AdministratorDoctor } from "../../organization/models/administrator.doctor";
import { Clinic } from "./clinic";

export interface ClinicDataHolder{
    administratorDoctor?:AdministratorDoctor
    clinicModel?:Clinic
}