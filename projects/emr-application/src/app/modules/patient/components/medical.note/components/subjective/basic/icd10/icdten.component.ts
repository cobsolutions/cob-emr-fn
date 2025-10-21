import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CaseDiagnosisService } from 'projects/emr-application/src/app/modules/patient/services/case-diagnosis.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'icdten',
  templateUrl: './icdten.component.html',
  styleUrls: ['./icdten.component.css'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class IcdtenComponent implements OnInit {
  @Input() title: string;
  @Input() style: string;
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Output() emitChanges = new EventEmitter<{ code: string; description: string }[]>();
  @Input() hierarchy: string

  diagnosisCtrl = new FormControl();
  filteredDiagnosis: [string, string][] = [];
  addedDiagnosis: { code: string; description: string; order: number }[] = [];
  isLoading = false;
  showSearch = false;
  //@ViewChild(TreatmentDiagnosisComponent) treatmentDiagnosisComp!: TreatmentDiagnosisComponent;
  constructor(
    private spinner: NgxSpinnerService,
    private caseDiagnosisService: CaseDiagnosisService
  ) { }

  ngOnInit(): void {
    this.fillDiagnosisCode();
    if (this.hierarchy === 'child') {
      this.caseDiagnosisService.currentData$.subscribe(list => {
        if (list && list.length > 0) {
          this.addedDiagnosis = [...list];
          this.parentForm.get(this.parentFieldName)?.setValue(this.addedDiagnosis);
          this.emitChanges.emit(this.addedDiagnosis);
        }
      })
    }
  }

  /** 🔍 Manual search triggered by the Search button */
  onSearch(): void {
    const value = this.diagnosisCtrl.value?.trim();
    if (!value || value.length < 2) {
      this.filteredDiagnosis = [];
      return;
    }

    this.isLoading = true;
    this.caseDiagnosisService
      .find(value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (data: any) => {
          const diagnosisResponse = data || {};
          this.filteredDiagnosis = (diagnosisResponse.listOfCodeName || []) as [string, string][];
        },
        () => {
          this.filteredDiagnosis = [];
        }
      );
  }

  addDiagnosis(option: { code: string; description: string }): void {
    const exists = this.addedDiagnosis.some((d) => d.code === option.code);
    if (!exists) {
      const newDiagnosis = {
        code: option.code,
        description: option.description,
        order: this.addedDiagnosis.length, // store position
      };
      this.addedDiagnosis.push(newDiagnosis);
      this.parentForm.get(this.parentFieldName).setValue(this.addedDiagnosis);
    }
  }

  removeDiagnosis(index: number): void {
    this.addedDiagnosis.splice(index, 1);
    this.parentForm.get(this.parentFieldName)?.setValue(this.addedDiagnosis);
    this.emitChanges.emit(this.addedDiagnosis);
  }
  moveUp(index: number): void {
    const sorted = this.sortedDiagnosis;
    if (index === 0) return;

    // Swap the order values of current and previous items
    const current = sorted[index];
    const previous = sorted[index - 1];

    const tempOrder = current.order;
    current.order = previous.order;
    previous.order = tempOrder;

    this.syncOrder(sorted);
  }

  moveDown(index: number): void {
    const sorted = this.sortedDiagnosis;
    if (index === sorted.length - 1) return;

    // Swap order values
    const current = sorted[index];
    const next = sorted[index + 1];

    const tempOrder = current.order;
    current.order = next.order;
    next.order = tempOrder;

    this.syncOrder(sorted);
  }


  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.diagnosisCtrl.reset();
      this.filteredDiagnosis = [];
    }
  }

  private fillDiagnosisCode(): void {
    const saved = this.parentForm.get(this.parentFieldName)?.value;
    if (saved) this.addedDiagnosis = [...saved];
  }

  transformToObjectArray(item: any[]): { code: string; description: string } {
    return {
      code: item[0],
      description: item[1],
    };
  }
  clearSearch(): void {
    this.diagnosisCtrl.reset();
    this.filteredDiagnosis = [];
  }
  get sortedDiagnosis() {
    return [...this.addedDiagnosis].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  private syncOrder(sorted: any[]): void {
    // Update main array
    this.addedDiagnosis = [...sorted].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    // Ensure the parent form and output event reflect the updated list
    this.parentForm.get(this.parentFieldName)?.setValue(this.addedDiagnosis);
    this.emitChanges.emit(this.addedDiagnosis);
  }
  copyCodes(): void {
    this.caseDiagnosisService.copy(this.addedDiagnosis);
    // if (this.treatmentDiagnosisComp) {
    //   this.treatmentDiagnosisComp.receiveCopiedCodes(this.addedDiagnosis);
    // }
  }
  onTreatmentDiagnosisChange(treatmentList: { code: string; description: string; order: number }[]): void {
    // name of the form control passed to child in the template:
    const controlName = 'treatmentDiagnosis';

    // ensure parentForm exists
    if (!this.parentForm) return;

    // If control doesn't exist, create it so the form always contains the value
    if (!this.parentForm.get(controlName)) {
      // Import FormControl at top if not already imported
      this.parentForm.addControl(controlName, new FormControl(treatmentList || []));
    } else {
      this.parentForm.get(controlName)?.setValue(treatmentList || []);
    }
  }
}
