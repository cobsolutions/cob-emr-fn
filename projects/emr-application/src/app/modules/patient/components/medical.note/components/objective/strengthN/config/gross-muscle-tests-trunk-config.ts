import { RomSectionWithSelectsConfig } from "../../range-of-motion/config";
import { Gross_Muscle_Tests_Trunk_OPTION } from "./strength-options";

export class GrossMuscleTestsTrunk {
    static readonly grossMuscleTestsTrunk: RomSectionWithSelectsConfig = {
        labels: ['Obliques', 'Trunk Extensors'],
        options: Gross_Muscle_Tests_Trunk_OPTION,
        fieldPrefix: 'gross_muscle_tests_',
        topSelects: [
            {
                label: 'Core Stabilization',
                fieldName: 'gross_muscle_tests_stabilization',
                options: [
                    { value: 'not_tested', label: 'Not Tested' },
                    { value: 'Good', label: 'Good' },
                    { value: 'Fair', label: 'Fair' },
                    { value: 'Poor', label: 'Poor' }
                ]
            },
            {
                label: 'Upper Abdominals',
                fieldName: 'gross_muscle_tests_stabilization',
                options: [
                    { value: 'not_tested', label: 'Not Tested' },
                    { value: '5/5', label: '5/5' },
                    { value: '5-/5', label: '5-/5' },
                    { value: '4+/5', label: '4+/5' },
                    { value: '4/5', label: '4/5' },
                    { value: '4-/5', label: '4-/5' },
                    { value: '3+/5', label: '3+/5' },
                    { value: '3/5', label: '3/5' },
                    { value: '3-/5', label: '3-/5' },
                    { value: '2+/5', label: '2+/5' },
                    { value: '2/5', label: '2/5' },
                    { value: '2-/5', label: '2-/5' },
                    { value: '1+/5', label: '1+/5' },
                    { value: '1/5', label: '1/5' },
                    { value: '1-/5', label: '1-/5' },
                    { value: '0/5', label: '0/5' },
                    { value: 'Custom', label: 'Custom' }
                ]
            },
            {
                label: 'Lower Abdominals',
                fieldName: 'gross_muscle_tests_quality',
                options: [
                    { value: 'not_tested', label: 'Not Tested' },
                    { value: '5/5', label: '5/5' },
                    { value: '5-/5', label: '5-/5' },
                    { value: '4+/5', label: '4+/5' },
                    { value: '4/5', label: '4/5' },
                    { value: '4-/5', label: '4-/5' },
                    { value: '3+/5', label: '3+/5' },
                    { value: '3/5', label: '3/5' },
                    { value: '3-/5', label: '3-/5' },
                    { value: '2+/5', label: '2+/5' },
                    { value: '2/5', label: '2/5' },
                    { value: '2-/5', label: '2-/5' },
                    { value: '1+/5', label: '1+/5' },
                    { value: '1/5', label: '1/5' },
                    { value: '1-/5', label: '1-/5' },
                    { value: '0/5', label: '0/5' },
                    { value: 'Custom', label: 'Custom' }
                ]
            }
        ],
        commentsFieldName: 'elbow_arom_comments',
        showComments: true
    };

}