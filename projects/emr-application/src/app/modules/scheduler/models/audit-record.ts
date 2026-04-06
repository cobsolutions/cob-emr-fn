export interface AuditRecord {
  id: number;
  clinicId: number;
  clinicName: string;
  calendarName: string;
  entityName: string;
  entityId: number;
  action: string;
  changes: AuditChange[];
  performedByUuid: string;
  performedByName: string;
  performedAt: number;
}

export interface AuditChange {
  field: string;
  oldValue: any;
  newValue: any;
}
