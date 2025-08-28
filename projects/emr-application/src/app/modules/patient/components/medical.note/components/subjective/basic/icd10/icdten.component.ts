import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CaseDiagnosisService } from 'projects/emr-application/src/app/modules/patient/services/case-diagnosis.service';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'icdten',
  templateUrl: './icdten.component.html',
  styleUrls: ['./icdten.component.css']
})
export class IcdtenComponent implements OnInit {
  @Input() title: string
  @Input() style: string
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Output() emitChanges = new EventEmitter<{ code: string; description: string }[]>()
  @Input() hierarchy: string
  diagnosisCtrl = new FormControl();
  isLoading = false;
  selectedDiagnosis: { code: string; description: string }[];
  addedDiagnosis: { code: string; description: string }[] = [];
  filteredDiagnosis: any;
  problems: any;
  addCode() {
    this.addedDiagnosis = [...this.addedDiagnosis, ...this.selectedDiagnosis];
    this.parentForm.get(this.parentFieldName).setValue(this.addedDiagnosis);
  }

  removeDiagnosis(index: number): void {
    this.addedDiagnosis.splice(index, 1);
    this.parentForm.get(this.parentFieldName).setValue(this.addedDiagnosis);
  }
  constructor(private spinner: NgxSpinnerService, private caseDiagnosisService: CaseDiagnosisService) { }
  icdSearch() {
    const icdVal = this.diagnosisCtrl.value
    this.spinner.show();
    this.caseDiagnosisService.find(icdVal)
      .pipe(
        finalize(() => {
          this.isLoading = false
        }),
      ).subscribe(data => {
        this.spinner.hide();
        if (data == undefined) {
          this.filteredDiagnosis = [];
        } else {
          var diagnosisResponse: any = data;
          this.filteredDiagnosis = diagnosisResponse.listOfCodeName;
        }
      },
        error => {
          this.isLoading = false
        });
  }
  ngOnInit(): void {

    this.fillDiagnosisCode();
  }
  copyCodes() {

  }
  addICD10diagnosis(diagnosis: any) {
    this.selectedDiagnosis = this.transformListToObjects(diagnosis);
  }
  transformListToObjects(list: string[]): { code: string; description: string }[] {
    return list.map(item => {
      // Split only at the first comma
      const firstCommaIndex = item.indexOf(',');
      const code = item.slice(0, firstCommaIndex).trim();
      const description = item.slice(firstCommaIndex + 1).trim();
      return { code, description };
    });
  }
  private fillDiagnosisCode() {
    var getDiagnosis: { code: string; description: string }[] = this.parentForm.get(this.parentFieldName).value;
    if (getDiagnosis !== null)
      this.addedDiagnosis = [...getDiagnosis]
  }
}
