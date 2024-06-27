import { User } from "../../administration/model/user/user"
import { Clinic } from "../../patient/models/clinic"

export interface Organization {
    orgname?: string,
    dba?: string,
    groupNPI?: string,
    taxID?: string,
    firstAddress?: string,
    secondAddress?: string,
    state?: string,
    city?: string,
    zipCode?: string
    clinics?: Clinic[]
    administrator?: User,
    users?: User[]
}