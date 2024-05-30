export interface AdministratorDoctor{
    id?: number;
    accountName?: string,
    password?:string,
    firstName?: string
    middleName?: string,
    lastName?: string
    email?: string
    phone?: string
    npi?: string
    licence?:string
    speciality?:string
    credential?:string
    roles?:string[]
}