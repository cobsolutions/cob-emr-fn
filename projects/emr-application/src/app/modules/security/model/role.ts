export class Role {
    public static readonly PATIENT_ROLE = 'emr-patient-role';
    public static readonly USER_ROLE = 'user-role';
    public static readonly CLINIC_ROLE = 'clinic-role';
    public static readonly REFERRING_DOCTOR_ROLE = 'emr-referring-provider-role';
    public static readonly PATIENT_PAYMENT_ROLE = 'patient-payment-role';
    public static readonly INSURANCE_COMPANY_ROLE = 'insurance-company-role';
    public static readonly CALENDAR_ROLE = 'calendar-role';

    public static readonly MEDICAL_NOTE_ROLE = 'medical-note-role';
    public static readonly INITIALIZE_MEDICAL_NOTE_ROLE = 'initialize-medical-note-role';
    public static readonly FORWARD_MEDICAL_NOTE_ROLE = 'forward-medical-note-role';
    public static readonly FINALIZE_MEDICAL_NOTE_ROLE = 'finalize-medical-note-role';

    public static readonly ADMIN_ROLE = 'admin-role';

    static readonly roles: string[] = [Role.PATIENT_ROLE, Role.USER_ROLE, Role.CLINIC_ROLE, Role.REFERRING_DOCTOR_ROLE
        , Role.PATIENT_PAYMENT_ROLE, Role.INSURANCE_COMPANY_ROLE, Role.CALENDAR_ROLE, Role.MEDICAL_NOTE_ROLE
        , Role.INITIALIZE_MEDICAL_NOTE_ROLE, Role.FORWARD_MEDICAL_NOTE_ROLE, Role.FINALIZE_MEDICAL_NOTE_ROLE,Role.ADMIN_ROLE];
}