export interface RoleMenuEntry {
  role: string;
  menuName: string;
  modifyOnlyChildren: string[];
}

export const ROLE_MENU_MAP: RoleMenuEntry[] = [
  { role: 'emr-patient-role', menuName: 'Patient', modifyOnlyChildren: [] },
  { role: 'user-role', menuName: 'Users', modifyOnlyChildren: ['Create User'] },
  { role: 'clinic-role', menuName: 'Clinic', modifyOnlyChildren: [] },
  { role: 'emr-referring-provider-role', menuName: 'Referring Provider', modifyOnlyChildren: [] },
  { role: 'patient-payment-role', menuName: 'Patient Payment', modifyOnlyChildren: [] },
  { role: 'insurance-company-role', menuName: 'Insurance Company', modifyOnlyChildren: [] },
  { role: 'calendar-role', menuName: 'Calendar', modifyOnlyChildren: [] },
];
