import { Injectable } from '@angular/core';
import { Billing } from '../model/Billing';
import { CheckCPTCode } from '../model/common/check.cpt.code';
import { QuantityCPTCode } from '../model/common/quantity.cpt.code';

@Injectable({
  providedIn: 'root'
})
export class BillingMapperService {

  constructor() { }

  /**
   * Converts form value/DTO to Billing model
   */
  toModel(formValue: any): Billing {
    if (!formValue) {
      return this.getEmptyBillingModel();
    }

    return {
      dailyNoteIncluded: formValue.dailyNoteIncluded ?? false,
      precautions: formValue.precautions ?? '',
      objectiveFindings: formValue.objective_findings ?? formValue.objectiveFindings ?? '',
      pre_Treatment: formValue.pre_Treatment ?? '',
      post_Treatment: formValue.post_Treatment ?? '',
      untimedCodes: {
        codes: this.mapCheckCodesToModel(formValue.untimedCodes)
      },
      strapping: {
        codes: this.mapQuantityCodesToModel(formValue.strapping)
      },
      calendarMonth: {
        codes: this.mapQuantityCodesToModel(formValue.calendarMonth)
      },
      nerveConductionStudies: {
        codes: this.mapCheckCodesToModel(formValue.nerveConductionStudies)
      },
      respiratory: {
        codes: this.mapQuantityCodesToModel(formValue.respiratory)
      },
      directTimedCodes: {
        codes: this.mapQuantityCodesToModel(formValue.directTimedCodes)
      },
      otherTreatmentProcedures: {
        codes: this.mapQuantityCodesToModel(formValue.otherTreatmentProcedures)
      },
      supplies: {
        codes: this.mapQuantityCodesToModel(formValue.supplies)
      },
      splintsorthotics: {
        codes: this.mapQuantityCodesToModel(formValue.splintsorthotics)
      },
      casts: {
        codes: this.mapQuantityCodesToModel(formValue.casts)
      },
      braces: {
        codes: this.mapQuantityCodesToModel(formValue.braces)
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

    return {
      dailyNoteIncluded: dto.dailyNoteIncluded ?? false,
      precautions: dto.precautions ?? '',
      objective_findings: dto.objectiveFindings ?? '',
      pre_Treatment: dto.pre_Treatment ?? '',
      post_Treatment: dto.post_Treatment ?? '',
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
   * Maps CheckCPTCode array from DTO format (code_checked, code_notes) to model format
   */
  private mapCheckCodesToModel(dtoSection: any): CheckCPTCode[] {
    if (!dtoSection) {
      return [];
    }

    const codes: CheckCPTCode[] = [];
    const processedCodes = new Set<string>();

    // Iterate through all keys in the DTO section
    Object.keys(dtoSection).forEach(key => {
      // Extract code from keys like "97161_checked" or "97161_notes"
      const codeMatch = key.match(/^(.+?)_(checked|notes)$/);
      if (codeMatch) {
        const code = codeMatch[1];

        // Only process each code once
        if (!processedCodes.has(code)) {
          processedCodes.add(code);
          codes.push({
            code: code,
            isCheck: dtoSection[`${code}_checked`] ?? false,
            note: dtoSection[`${code}_notes`] ?? ''
          });
        }
      }
    });

    return codes;
  }

  /**
   * Maps QuantityCPTCode array from DTO format (code: quantity) to model format
   */
  private mapQuantityCodesToModel(dtoSection: any): QuantityCPTCode[] {
    if (!dtoSection) {
      return [];
    }

    const codes: QuantityCPTCode[] = [];
    const processedCodes = new Set<string>();

    // Iterate through all keys in the DTO section
    Object.keys(dtoSection).forEach(key => {
      // Skip notes keys for now, we'll handle them when processing the code
      if (key.endsWith('_notes')) {
        return;
      }

      const code = key;
      if (!processedCodes.has(code)) {
        processedCodes.add(code);
        codes.push({
          code: code,
          quantity: dtoSection[code] ?? 0,
          note: dtoSection[`${code}_notes`] ?? ''
        });
      }
    });

    return codes;
  }

  /**
   * Maps CheckCPTCode array to DTO format (code_checked, code_notes)
   */
  private mapCheckCodesToDto(codes: CheckCPTCode[]): any {
    if (!codes || codes.length === 0) {
      return {};
    }

    const dto: any = {};
    codes.forEach(codeItem => {
      if (codeItem.code) {
        dto[`${codeItem.code}_checked`] = codeItem.isCheck ?? false;
        dto[`${codeItem.code}_notes`] = codeItem.note ?? '';
      }
    });

    return dto;
  }

  /**
   * Maps QuantityCPTCode array to DTO format (code: quantity)
   */
  private mapQuantityCodesToDto(codes: QuantityCPTCode[]): any {
    if (!codes || codes.length === 0) {
      return {};
    }

    const dto: any = {};
    codes.forEach(codeItem => {
      if (codeItem.code) {
        dto[codeItem.code] = codeItem.quantity ?? 0;
        // Always map notes if they exist
        if (codeItem.note) {
          dto[`${codeItem.code}_notes`] = codeItem.note;
        }
      }
    });

    return dto;
  }

  /**
   * Returns an empty Billing model with default values
   */
  private getEmptyBillingModel(): Billing {
    return {
      dailyNoteIncluded: false,
      precautions: '',
      objectiveFindings: '',
      pre_Treatment: '',
      post_Treatment: '',
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
