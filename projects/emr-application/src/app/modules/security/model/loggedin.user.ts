import { IApiParams } from "../../common/interfaces/api.params";
import { Clinic } from "../../patient/models/clinic";

export interface LoggedInUser{
    uuid?:string,
    userName?:string,
    clinics?:Clinic[]
    email?:string
    organizationId?:number
    params?: IApiParams
}