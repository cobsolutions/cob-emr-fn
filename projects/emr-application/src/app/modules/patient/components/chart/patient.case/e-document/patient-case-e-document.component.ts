import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface EDocumentFormData {
  documentType: string;
  nameOfDocument: string;
  dateOfReceipt: Date;
  assignedCase: string;
  file: File | null;
}

export interface DocumentTypeOption {
  name: string;
  value: string;
}

export interface CaseOption {
  name: string;
  value: string;
}

export interface EDocument extends EDocumentFormData {
  id: number;
  documentTypeName?: string;
  assignedCaseName?: string;
  fileName?: string;
}

@Component({
  selector: 'patient-case-e-document',
  templateUrl: './patient-case-e-document.component.html',
  styleUrls: ['./patient-case-e-document.component.css']
})
export class PatientCaseEDocumentComponent implements OnInit {
  @Input() caseName: string = '';
  @Input() caseId: string = '';
  @Output() documentSubmitted = new EventEmitter<EDocumentFormData>();
  @Output() cancel = new EventEmitter<void>();

  eDocumentForm: FormGroup;

  selectedFile: File | null = null;
  selectedFileName: string = '';

  documentTypes: DocumentTypeOption[] = [
    { name: 'Blood Work Results/Labs', value: 'blood_work_results_labs' },
    { name: "Driver's License", value: "driver's_license" },
    { name: 'HEP', value: 'hep' },
    { name: 'Insurance Card', value: 'insurance_card' },
    { name: 'Medication Listing', value: 'medication_listing' },
    { name: 'MRI', value: 'mri' },
    { name: 'Other', value: 'other' },
    { name: 'Past Medical History', value: 'past_medical_history' },
    { name: 'Patient Intake', value: 'patient_intake' },
    { name: "Physician's Notes", value: "physician's_notes" },
    { name: 'Plan of Care', value: 'plan_of_care' },
    { name: 'Script', value: 'script' },
    { name: 'XRay', value: 'xray' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.eDocumentForm = this.fb.group({
      documentType: ['', Validators.required],
      nameOfDocument: ['', Validators.required],
      dateOfReceipt: [null, Validators.required],
      assignedCase: [this.caseId || 'current', Validators.required]
    });
  }

  get assignedCaseOptions(): CaseOption[] {
    return [
      { name: this.caseName || 'Current Case', value: this.caseId || 'current' },
      { name: 'All', value: 'all' }
    ];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
  }

  onSubmit(): void {
    if (this.eDocumentForm.valid && this.selectedFile) {
      const formData: EDocumentFormData = {
        ...this.eDocumentForm.value,
        file: this.selectedFile
      };
      this.documentSubmitted.emit(formData);
      this.eDocumentForm.reset();
      this.selectedFile = null;
      this.selectedFileName = '';
    }
  }

  onCancel(): void {
    this.eDocumentForm.reset();
    this.selectedFile = null;
    this.selectedFileName = '';
    this.cancel.emit();
  }
}
