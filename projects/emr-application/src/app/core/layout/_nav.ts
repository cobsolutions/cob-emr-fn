import { INavData } from '@coreui/angular-pro';

export const NavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Patient',
    url: '/emr/patient',
    iconComponent: { name: 'cil-disabled' },
    children: [
      {
        name: 'Patients',
        url: 'patient/list'
      },
    ]
  },
  {
    name: 'Organization',
    url: '/emr/organization',
    iconComponent: { name: 'cilHome' },
    children: [
      {
        name: 'Organizations',
        url: 'organization/list'
      }
    ]
  },
  {
    name: 'Scheduler',
    url: '/emr/scheduler',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name: 'View Scheduler',
        url: 'scheduler/view'
      },
      {
        name: 'View Calendars',
        url: 'scheduler/calendar'
      },
      {
        name: 'Scheduler Configuration',
        url: 'scheduler/configuration'
      },
      {
        name: 'Appointment Type',
        url: 'scheduler/appointment-type'
      }

    ]
  },
  {
    name: 'Users',
    url: '/emr/users',
    iconComponent: { name: 'cilUser' },
    children: [
      {
        name: 'Create User',
        url: 'users/create'
      },
      {
        name: 'Clinical Users',
        url: 'users/list/clinical/users'
      }, {
        name: 'Clerical Users',
        url: 'users/list/clerical/users'
      }
    ]
  },
  {
    name: 'Clinics',
    url: '/emr/clinics',
    iconComponent: { name: 'cilMedicalCross' },
    children: [
      {
        name: 'View Clinics',
        url: 'clinics/list'
      }
    ]
  },
  {
    name: 'Insurance Company',
    url: '/emr/insurance/company',
    iconComponent: { name: 'cilHouse' },
    children: [
      {
        name: 'View Companies',
        url: 'insurance/company/list'
      }
    ]
  }, {
    name: 'Referring Provider',
    url: '/emr/referring/provider',
    iconComponent: { name: 'cilUserPlus' },
    children: [
      {
        name: 'ReferringProviders',
        url: 'referring/provider/list'
      }
    ]
  },
];
