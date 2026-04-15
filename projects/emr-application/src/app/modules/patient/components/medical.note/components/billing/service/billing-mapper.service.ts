import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Billing } from '../model/Billing';
import { CheckCPTCode, SubItem } from '../model/common/check.cpt.code';
import { QuantityCPTCode } from '../model/common/quantity.cpt.code';

@Injectable({
  providedIn: 'root'
})
export class BillingMapperService {

  constructor() { }

  /**
   * Converts form value/DTO to Billing model
   */
  toModel(formValue: FormGroup): Billing {
    if (!formValue) {
      return this.getEmptyBillingModel();
    }
    return {
      dailyNoteIncluded: formValue.get('dailyNoteIncluded')?.value,
      precautions: formValue.get('precautions')?.value ?? '',
      objectiveFindings: formValue.get('objective_findings')?.value ?? '',
      preTreatment: formValue.get('pre_treatment')?.value ?? '',
      postTreatment: formValue.get('post_treatment')?.value ?? '',
      untimedCodes: {
        codes: this.mapCheckCodesToModel(formValue.get('untimedCodes') as FormGroup)
      },
      strapping: {
        codes: this.mapQuantityCodesToModel(formValue.get('strapping') as FormGroup)
      },
      calendarMonth: {
        codes: this.mapQuantityCodesToModel(formValue.get('calendarMonth') as FormGroup)
      },
      nerveConductionStudies: {
        codes: this.mapCheckCodesToModel(formValue.get('nerveConductionStudies') as FormGroup)
      },
      respiratory: {
        codes: this.mapQuantityCodesToModel(formValue.get('respiratory') as FormGroup)
      },
      directTimedCodes: {
        codes: this.mapQuantityCodesToModel(formValue.get('directTimedCodes') as FormGroup)
      },
      otherTreatmentProcedures: {
        codes: this.mapQuantityCodesToModel(formValue.get('otherTreatmentProcedures') as FormGroup)
      },
      supplies: {
        codes: this.mapQuantityCodesToModel(formValue.get('supplies') as FormGroup)
      },
      splintsorthotics: {
        codes: this.mapQuantityCodesToModel(formValue.get('splintsorthotics') as FormGroup)
      },
      casts: {
        codes: this.mapQuantityCodesToModel(formValue.get('casts') as FormGroup)
      },
      braces: {
        codes: this.mapQuantityCodesToModel(formValue.get('braces') as FormGroup)
      }
    };
  }

  /**
   * Converts Billing model to form value/DTO
   */
  fromDto(dto: Billing): any {
    if (!dto) {
      return {};
    }
    console.log('dto.dailyNoteIncluded', dto.dailyNoteIncluded)
    return {
      dailyNoteIncluded: dto.dailyNoteIncluded,
      precautions: dto.precautions ?? '',
      objective_findings: dto.objectiveFindings ?? '',
      pre_treatment: dto.preTreatment ?? '',
      post_treatment: dto.postTreatment ?? '',
      untimedCodes: this.mapCheckCodesToDto(dto.untimedCodes?.codes),
      strapping: this.mapQuantityCodesToDto(dto.strapping?.codes),
      calendarMonth: this.mapQuantityCodesToDto(dto.calendarMonth?.codes),
      nerveConductionStudies: this.mapCheckCodesToDto(dto.nerveConductionStudies?.codes),
      respiratory: this.mapQuantityCodesToDto(dto.respiratory?.codes),
      directTimedCodes: this.mapQuantityCodesToDto(dto.directTimedCodes?.codes),
      otherTreatmentProcedures: this.mapQuantityCodesToDto(dto.otherTreatmentProcedures?.codes),
      supplies: this.mapQuantityCodesToDto(dto.supplies?.codes),
      splintsorthotics: this.mapQuantityCodesToDto(dto.splintsorthotics?.codes),
      casts: this.mapQuantityCodesToDto(dto.casts?.codes),
      braces: this.mapQuantityCodesToDto(dto.braces?.codes)
    };
  }

  /**
   * Maps CheckCPTCode array from FormGroup format (code_checked, code_notes, code_sub_*) to model format.
   * Also extracts user-added custom codes stored under keys like custom_<id>_{name|code|checked|notes}.
   */
  private mapCheckCodesToModel(formGroup: FormGroup): CheckCPTCode[] {
    if (!formGroup) {
      return [];
    }

    const codes: CheckCPTCode[] = [];
    const processedCodes = new Set<string>();
    const controls = formGroup.controls;
    const controlKeys = Object.keys(controls);

    // Iterate through all keys in the FormGroup
    controlKeys.forEach(key => {
      // Custom codes are handled in a separate pass below.
      if (key.startsWith('custom_')) {
        return;
      }

      // Extract code from keys like "97161_checked" or "97161_notes"
      const codeMatch = key.match(/^(.+?)_(checked|notes)$/);
      if (codeMatch) {
        const code = codeMatch[1];

        // Only process each code once
        if (!processedCodes.has(code)) {
          processedCodes.add(code);

          // Extract subItems for this code as array
          const subItems: SubItem[] = [];
          controlKeys.forEach(subKey => {
            const subMatch = subKey.match(new RegExp(`^${code}_sub_(.+)$`));
            if (subMatch) {
              subItems.push({
                name: subMatch[1],
                isCheck: formGroup.get(subKey)?.value ?? false
              });
            }
          });

          codes.push({
            code: code,
            isCheck: formGroup.get(`${code}_checked`)?.value ?? false,
            note: formGroup.get(`${code}_notes`)?.value ?? '',
            subItems: subItems.length > 0 ? subItems : undefined
          });
        }
      }
    });

    // Second pass: custom codes. Group keys by id and emit one entry per id.
    const customIds = new Set<string>();
    controlKeys.forEach(key => {
      const match = key.match(/^custom_(.+?)_(name|code|checked|notes)$/);
      if (match) {
        customIds.add(match[1]);
      }
    });

    customIds.forEach(id => {
      const name = formGroup.get(`custom_${id}_name`)?.value ?? '';
      const code = formGroup.get(`custom_${id}_code`)?.value ?? '';
      // Skip empty rows (user added a row but never filled it in).
      if (!name && !code) {
        return;
      }
      codes.push({
        code: code,
        name: name,
        isCheck: formGroup.get(`custom_${id}_checked`)?.value ?? false,
        note: formGroup.get(`custom_${id}_notes`)?.value ?? '',
        isCustom: true
      });
    });

    return codes;
  }

  /**
   * Maps QuantityCPTCode array from FormGroup format (code: quantity) to model format.
   * Also extracts user-added custom codes stored under keys like
   * custom_<id>_{quantity|name|code|notes}.
   */
  private mapQuantityCodesToModel(formGroup: FormGroup): QuantityCPTCode[] {
    if (!formGroup) {
      return [];
    }

    const codes: QuantityCPTCode[] = [];
    const processedCodes = new Set<string>();
    const controls = formGroup.controls;
    const controlKeys = Object.keys(controls);

    // Iterate through all keys in the FormGroup
    controlKeys.forEach(key => {
      // Skip notes keys for now, we'll handle them when processing the code
      if (key.endsWith('_notes')) {
        return;
      }
      // Custom codes are handled in a separate pass below.
      if (key.startsWith('custom_')) {
        return;
      }

      const code = key;
      if (!processedCodes.has(code)) {
        processedCodes.add(code);
        codes.push({
          code: code,
          quantity: formGroup.get(code)?.value ?? 0,
          note: formGroup.get(`${code}_notes`)?.value ?? ''
        });
      }
    });

    // Second pass: custom codes. Group keys by id and emit one entry per id.
    const customIds = new Set<string>();
    controlKeys.forEach(key => {
      const match = key.match(/^custom_(.+?)_(quantity|name|code|notes)$/);
      if (match) {
        customIds.add(match[1]);
      }
    });

    customIds.forEach(id => {
      const name = formGroup.get(`custom_${id}_name`)?.value ?? '';
      const code = formGroup.get(`custom_${id}_code`)?.value ?? '';
      // Skip empty rows (user added a row but never filled it in).
      if (!name && !code) {
        return;
      }
      codes.push({
        code: code,
        name: name,
        quantity: formGroup.get(`custom_${id}_quantity`)?.value ?? 0,
        note: formGroup.get(`custom_${id}_notes`)?.value ?? '',
        isCustom: true
      });
    });

    return codes;
  }

  /**
   * Maps CheckCPTCode array to DTO format with codes array for child components
   */
  private mapCheckCodesToDto(codes: CheckCPTCode[]): any {
    if (!codes || codes.length === 0) {
      return { codes: [] };
    }

    // Return format that child components expect: { codes: [...] }
    return {
      codes: codes.map(codeItem => ({
        code: codeItem.code,
        isCheck: codeItem.isCheck ?? false,
        note: codeItem.note ?? '',
        subItems: codeItem.subItems || [],
        name: codeItem.name,
        isCustom: codeItem.isCustom ?? false
      }))
    };
  }

  /**
   * Maps QuantityCPTCode array to DTO format with codes array for child components
   */
  private mapQuantityCodesToDto(codes: QuantityCPTCode[]): any {
    if (!codes || codes.length === 0) {
      return { codes: [] };
    }

    // Return format that child components expect: { codes: [...] }
    return {
      codes: codes.map(codeItem => ({
        code: codeItem.code,
        quantity: codeItem.quantity ?? 0,
        note: codeItem.note ?? '',
        name: codeItem.name,
        isCustom: codeItem.isCustom ?? false
      }))
    };
  }

  /**
   * Returns an empty Billing model with default values
   */
  private getEmptyBillingModel(): Billing {
    return {
      dailyNoteIncluded: false,
      precautions: '',
      objectiveFindings: '',
      preTreatment: '',
      postTreatment: '',
      untimedCodes: { codes: [] },
      strapping: { codes: [] },
      calendarMonth: { codes: [] },
      nerveConductionStudies: { codes: [] },
      respiratory: { codes: [] },
      directTimedCodes: { codes: [] },
      otherTreatmentProcedures: { codes: [] },
      supplies: { codes: [] },
      splintsorthotics: { codes: [] },
      casts: { codes: [] },
      braces: { codes: [] }
    };
  }
}
