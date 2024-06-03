import { Address } from "../../common/models";
import { AdministratorDoctor } from "../../organization/models/administrator.doctor";

export interface Clinic {
    id?: string;
    name?: string;
    address?:Address
    organizationId?:number
    administratorDoctor?:AdministratorDoctor;
    selected?:boolean;
}