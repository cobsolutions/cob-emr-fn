import { Dependent } from "../model/dependent";
import { Field } from "../model/field";
import { Section } from "../model/section";

export class ActiveDependents {
    static getActiveDependents(field: Field, selectedValues: Record<string, any>): Dependent[] {
        let activeDependents: Dependent[] = [];

        if (field.dependents) {
            for (const dependent of field.dependents) {
                const parentValue = selectedValues[field.name];

                // Check if the parent value matches the required value to render this dependent                
                if (parentValue === field.value) {
                    activeDependents.push(dependent);

                    // Recursively check if the dependent has further dependencies
                    if ("dependents" in dependent && Array.isArray((dependent as any).dependents)) {
                        activeDependents = [
                            ...activeDependents,
                            ...this.getActiveDependents(dependent as unknown as Field, selectedValues),
                        ];
                    }
                }
            }
        }

        return activeDependents;
    }
    static getAllActiveFields(section: Section, selectedValues: Record<string, any>): Dependent[] {
        let allActiveFields: Dependent[] = [];

        for (const field of section.fields) {
            allActiveFields = [...allActiveFields, ...this.getActiveDependents(field, selectedValues)];
        }

        return allActiveFields;
    }
}