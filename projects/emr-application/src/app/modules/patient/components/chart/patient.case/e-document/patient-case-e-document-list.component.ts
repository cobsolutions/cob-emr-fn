import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EDocument } from './patient-case-e-document.component';

@Component({
  selector: 'patient-case-e-document-list',
  templateUrl: './patient-case-e-document-list.component.html',
  styleUrls: ['./patient-case-e-document-list.component.css']
})
export class PatientCaseEDocumentListComponent {
  @Input() documents: EDocument[] = [];
  @Input() caseName: string = '';
  @Output() viewDocument = new EventEmitter<EDocument>();
  @Output() deleteDocument = new EventEmitter<EDocument>();
  @Output() downloadDocument = new EventEmitter<EDocument>();

  get caseDocuments(): EDocument[] {
    return this.documents.filter(doc => doc.assignedCase !== 'all');
  }

  get allCasesDocuments(): EDocument[] {
    return this.documents.filter(doc => doc.assignedCase === 'all');
  }

  onView(document: EDocument): void {
    this.viewDocument.emit(document);
  }

  onDelete(document: EDocument): void {
    this.deleteDocument.emit(document);
  }

  onDownload(document: EDocument): void {
    this.downloadDocument.emit(document);
  }
}
