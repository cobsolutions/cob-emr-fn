import { UserRoleScope } from "../../../../administration/model/user/user.role.scope";
import { Role } from "../../../../security/model/role";
import { Scope } from "../../../../security/model/scope";
import { AdministratorDoctor } from "../../../models/administrator.doctor";

export class CreateAdministratorRoles {
    public static create(administratorDoctor: AdministratorDoctor) {
        var patientRole: UserRoleScope = {
            role: Role.PATIENT_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var userRole: UserRoleScope = {
            role: Role.USER_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var clinicRole: UserRoleScope = {
            role: Role.CLINIC_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var referringProviderRole: UserRoleScope = {
            role: Role.REFERRING_DOCTOR_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var patientPaymentRole: UserRoleScope = {
            role: Role.PATIENT_PAYMENT_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var insuranceCompanyRole: UserRoleScope = {
            role: Role.INSURANCE_COMPANY_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var calendarRole: UserRoleScope = {
            role: Role.CALENDAR_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var medicalNoteRole: UserRoleScope = {
            role: Role.MEDICAL_NOTE_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var initMedicalNoteRole: UserRoleScope = {
            role: Role.INITIALIZE_MEDICAL_NOTE_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var forwardMedicalNoteRole: UserRoleScope = {
            role: Role.FORWARD_MEDICAL_NOTE_ROLE,
            scope: Scope.VIEWSCOPE
        }
        var finalizeMedicalNoteRole: UserRoleScope = {
            role: Role.FORWARD_MEDICAL_NOTE_ROLE,
            scope: Scope.VIEWSCOPE
        }
        administratorDoctor.roleScope.push(patientRole)
        administratorDoctor.roleScope.push(userRole)
        administratorDoctor.roleScope.push(clinicRole)
        administratorDoctor.roleScope.push(referringProviderRole)
        administratorDoctor.roleScope.push(patientPaymentRole)
        administratorDoctor.roleScope.push(insuranceCompanyRole)
        administratorDoctor.roleScope.push(calendarRole)
        administratorDoctor.roleScope.push(medicalNoteRole)
        administratorDoctor.roleScope.push(initMedicalNoteRole)
        administratorDoctor.roleScope.push(forwardMedicalNoteRole)
        administratorDoctor.roleScope.push(finalizeMedicalNoteRole)
    }
}