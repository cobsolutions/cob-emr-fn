import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Output() emitChanges = new EventEmitter<{ code: string; description: string }[]>()
  diagnosisCtrl = new FormControl();
  isLoading = false;
  selectedDiagnosis: { code: string; description: string }[];
  addedDiagnosis: { code: string; description: string }[] = [];
  filteredDiagnosis: any;
  problems: any;

  addCode() {
    this.addedDiagnosis = [...this.addedDiagnosis, ...this.selectedDiagnosis];
    this.emitChanges.emit(this.addedDiagnosis)
  }

  removeDiagnosis(index: number): void {
    this.addedDiagnosis.splice(index, 1);
    this.emitChanges.emit(this.addedDiagnosis)
  }
  constructor(private spinner: NgxSpinnerService, private caseDiagnosisService: CaseDiagnosisService) { }

  ngOnInit(): void {
    this.diagnosisCtrl.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 1) {
            return true
          } else {
            this.filteredDiagnosis = [];
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.filteredDiagnosis = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          this.spinner.show();
          return this.caseDiagnosisService.find(value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
        }
        )
      )
      .subscribe(data => {
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
}
