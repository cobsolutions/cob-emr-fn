import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CaseDiagnosisService } from 'projects/emr-application/src/app/modules/patient/services/case-diagnosis.service';
import { finalize } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { cilCopy } from '@coreui/icons';

@Component({
  selector: 'treatment-diagnosis',
  templateUrl: './treatment-diagnosis.component.html',
  styleUrls: ['./treatment-diagnosis.component.css'],
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
export class TreatmentDiagnosisComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() parentFieldName!: string;
  @Input() style: string;
  @Input() copiedicdten: { code: string; description: string; order: number }
  @Output() emitChanges = new EventEmitter<{ code: string; description: string; order: number }[]>();

  diagnosisCtrl = new FormControl();
  filteredDiagnosis: [string, string][] = [];
  addedDiagnosis: { code: string; description: string; order: number }[] = [];
  isLoading = false;
  showSearch = false;

  constructor(private caseDiagnosisService: CaseDiagnosisService) { }

  ngOnInit(): void {
    this.fillDiagnosisCode();
    this.caseDiagnosisService.currentData$.subscribe((copiedData:any[]) => {
      if (copiedData && copiedData.length > 0) {
        copiedData.forEach(item => {
          const exists = this.addedDiagnosis.some((d) => d.code === item.code);
          if (!exists) {
            const newDiagnosis = {
              code: item.code,
              description: item.description,
              order: this.addedDiagnosis.length,
            };
            this.addedDiagnosis.push(newDiagnosis);
          }
        });
        this.updateParentForm();
      }
    })
    this.parentForm.get(this.parentFieldName)?.valueChanges.subscribe(value => {
      // Sync with parent form whenever it changes, not just when empty
      if (value && Array.isArray(value)) {
        this.addedDiagnosis = [...value];
      } else if (!value || value.length === 0) {
        this.addedDiagnosis = [];
      }
    });
  }

  /** 🔍 Manual search triggered by button */
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
        order: this.addedDiagnosis.length,
      };
      this.addedDiagnosis.push(newDiagnosis);
      this.updateParentForm();
    }
  }

  removeDiagnosis(index: number): void {
    this.addedDiagnosis.splice(index, 1);
    this.updateParentForm();
  }

  moveUp(index: number): void {
    const sorted = this.sortedDiagnosis;
    if (index === 0) return;

    const current = sorted[index];
    const previous = sorted[index - 1];
    [current.order, previous.order] = [previous.order, current.order];

    this.syncOrder(sorted);
  }

  moveDown(index: number): void {
    const sorted = this.sortedDiagnosis;
    if (index === sorted.length - 1) return;

    const current = sorted[index];
    const next = sorted[index + 1];
    [current.order, next.order] = [next.order, current.order];

    this.syncOrder(sorted);
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.diagnosisCtrl.reset();
      this.filteredDiagnosis = [];
    }
  }

  clearSearch(): void {
    this.diagnosisCtrl.reset();
    this.filteredDiagnosis = [];
  }

  get sortedDiagnosis() {
    return [...this.addedDiagnosis].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  private fillDiagnosisCode(): void {
    const saved = this.parentForm.get(this.parentFieldName)?.value;
    if (saved) this.addedDiagnosis = [...saved];
  }

  private syncOrder(sorted: any[]): void {
    this.addedDiagnosis = [...sorted].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    this.updateParentForm();
  }

  private updateParentForm(): void {
    if (!this.parentForm.get(this.parentFieldName)) {
      this.parentForm.addControl(this.parentFieldName, new FormControl(this.addedDiagnosis));
    } else {
      this.parentForm.get(this.parentFieldName)?.setValue(this.addedDiagnosis);
    }
    this.emitChanges.emit(this.addedDiagnosis);
  }

  /** 🧩 Called by parent (Diagnosis) copyCodes() */
  receiveCopiedCodes(codes: { code: string; description: string; order: number }[]): void {
    this.addedDiagnosis = [...codes];
    this.updateParentForm();
  }

  transformToObjectArray(item: any[]): { code: string; description: string } {
    return {
      code: item[0],
      description: item[1],
    };
  }
}
