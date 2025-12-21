import { RomSectionWithSelectsConfig } from "../../range-of-motion/config";
import { ManualMuscleTests_OPTION } from "./strength-options";

export class ManualMuscleTests {
    static readonly manualMuscleTests: RomSectionWithSelectsConfig = {
        labels: ['Anterior Deltoid',
            'Middle Deltoid',
            'Posterior Deltoid',
            'Upper Trapezius',
            'Middle Trapezius',
            'Lower Trapezius',
            'Pectorals',
            'Latissimus Dorsi',
            'Supraspinatus',
            'Infraspinatus/Teres Minor',
            'Infraspinatus',
            'Teres Minor',
            'Subscapularis',
            'Serratus Anterior',
            'Rhomboids',
            'Biceps',
            'Triceps',
            'Brachioradialis',
            'Pronator Teres',
            'Wrist Extensors',
            'Wrist Flexors',
            'Supinator',
            'Extensor Digitorum Communis',
            'Iliopsoas',
            'Gluteus Maximus',
            'Gluteus Medius',
            'Quadriceps',
            'Hamstrings',
            'Adductors',
            'Anterior Tibialis',
            'Posterior Tibialis',
            'Gastrocnemius',
            'Soleus',
            'Peroneals',
            'Extensor Hallucis',
            'Flexor Hallucis',
            'Flexor Digitorum Longus'],
        options: ManualMuscleTests_OPTION,
        fieldPrefix: 'manual_muscle_tests',
        topSelects: [
            {
                label: 'Deep Neck Flexors',
                fieldName: 'manual_muscle_tests_deep_neck_flexors',
                options: [
                    { value: 'Not Tested', label: 'Not Tested' },
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
        commentsFieldName: 'manual_muscle_tests_comments',
        showComments: true
    };
}