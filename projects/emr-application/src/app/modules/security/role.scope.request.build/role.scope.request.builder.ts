import { Role } from "../model/role";

export class RoleScopeRequestBuilder{
    public static builder(roles: string[]): string[] {
        var requestedRoles: string[] = [];
        for (var i = 0; i < roles.length; i++) {
            this.requestPatientRoles(roles[i], roles, requestedRoles);
        }
        return requestedRoles;
    }
    private static requestPatientRoles(role: string, roles: string[], requestedRoles: string[]) {
        if (role === Role.PATIENT_ROLE)
            requestedRoles.push(Role.PATIENT_ROLE);
    }
}