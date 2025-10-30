import { CPTModel } from "../../../../../models/medical.note/cpt.model";

export class CPTBillingConverter {
    private static readonly SECTIONS: string[] = [
        'untimedCodes',
        'calendarMonth',
        'nerveConduction',
        'respiratory',
        'directTimedCodes',
        'otherTreatmentProcedures',
        'supplies',
        'splintsorthotics',
        'casts',
        'braces'
    ];
    static convertSection(section: Record<string, any>): CPTModel[] {
        if (!section || typeof section !== 'object') {
            return [];
        }

        return Object.entries(section)
            .filter(([_, value]) => value !== null && typeof value === 'object')
            .map(([key, value]: [string, any]) => {
                const code = value.code ?? key;
                const quantity = Number(value.quantity ?? null);
                const description = value.description ?? '';
                return {
                    cpt: code,
                    description: description,
                    quantity: quantity
                };
            });
    }
    static convertBillingSections(billing: any): any {
        console.log(JSON.stringify(billing))
        if (!billing || typeof billing !== 'object') {
            return billing;
        }

        const convertedBilling: any = { ...billing };

        for (const section of this.SECTIONS) {
            const sectionValue = billing[section];
            convertedBilling[section] = sectionValue
                ? this.convertSection(sectionValue)
                : [];
        }

        return convertedBilling;
    }
}