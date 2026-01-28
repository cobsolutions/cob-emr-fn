import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EDocumentRecord } from '../../../../services/patient/e-document/patient-e-document.service';

@Component({
  selector: 'patient-case-e-document-list',
  templateUrl: './patient-case-e-document-list.component.html',
  styleUrls: ['./patient-case-e-document-list.component.css']
})
export class PatientCaseEDocumentListComponent {
  @Input() caseDocuments: EDocumentRecord[] = [];
  @Input() allCasesDocuments: EDocumentRecord[] = [];
  @Input() caseName: string = '';
  @Output() viewDocument = new EventEmitter<EDocumentRecord>();
  @Output() editDocument = new EventEmitter<EDocumentRecord>();
  @Output() deleteDocument = new EventEmitter<EDocumentRecord>();
  @Output() downloadDocument = new EventEmitter<EDocumentRecord>();

  private documentTypeMap: { [key: string]: string } = {
    'blood_work_results_labs': 'Blood Work Results/Labs',
    "driver's_license": "Driver's License",
    'hep': 'HEP',
    'insurance_card': 'Insurance Card',
    'medication_listing': 'Medication Listing',
    'mri': 'MRI',
    'other': 'Other',
    'past_medical_history': 'Past Medical History',
    'patient_intake': 'Patient Intake',
    "physician's_notes": "Physician's Notes",
    'plan_of_care': 'Plan of Care',
    'script': 'Script',
    'xray': 'XRay'
  };

  getDocumentTypeName(value: string): string {
    return this.documentTypeMap[value] || value;
  }

  onEdit(document: EDocumentRecord): void {
    this.editDocument.emit(document);
  }

  onView(document: EDocumentRecord): void {
    this.viewDocument.emit(document);
  }

  onDelete(document: EDocumentRecord): void {
    this.deleteDocument.emit(document);
  }

  onDownload(document: EDocumentRecord): void {
    this.downloadDocument.emit(document);
  }
}
