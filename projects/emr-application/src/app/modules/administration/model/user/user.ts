import { Clinic } from "../../../patient/models/clinic";
import { DoctorUser } from "./doctor";
import { UserRoleScope } from "./user.role.scope";

export interface User {
    id?: number;
    accountName?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    fullName?:string
    uuid?: string;
    email?: string
    role?: string;
    password?: string
    clinicIds?: number[];
    userType?:string
    roleScope?:UserRoleScope[]
    npi?:string
    licence?:string
    speciality?:string
    credential?:string
}