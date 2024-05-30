import { Clinic } from "../../../patient/models/clinic";
import { DoctorUser } from "./doctor";
import { UserRoleScope } from "./user.role.scope";

export interface User {
    id?: number;
    userName?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    uuid?: string;
    email?: string
    role?: string;
    password?: string
    clinics?: Clinic[];
    doctor?: DoctorUser | undefined
    userType?:string
    roleScope?:UserRoleScope[]

}