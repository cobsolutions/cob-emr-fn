import { RomOption } from "../../range-of-motion/config";
import { ColumnDefinition } from "../../common/measurement-table-multiple-columns/measurement-table-multiple-columns.component";

export const Cervical_Motor_Control_Tests_OPTION: RomOption[] = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: '0_not_satisfactory', label: '0 - Not Satisfactory' },
    { value: '1_satisfactory', label: '1 - Satisfactory' },
    { value: 'custom', label: 'Custom' }
];

export interface CervicalMotorControlTestsSectionConfig {
    labels: string[];
    columns: ColumnDefinition[];
    options: RomOption[];
    fieldPrefix: string;
    showComments: boolean;
    commentsFieldName: string;
    cellType: 'select' | 'input' | 'both';
    showApplyToAll: boolean;
}

export class CervicalMotorControlTestsConfig {
    static readonly cervicalMotorControlTests: CervicalMotorControlTestsSectionConfig = {
        labels: [
            'Supine Cervical Setting',
            'Prone Cervical Setting',
            'Inclined Sitting Cervical Setting',
            'Left Side Lying Cervical Setting',
            'Right Side Lying Cervical Setting'
        ],
        columns: [
            { name: 'Global Compensation' },
            { name: 'Position' },
            { name: 'Hold Time' }
        ],
        options: Cervical_Motor_Control_Tests_OPTION,
        fieldPrefix: 'cervical_mct_',
        showComments: true,
        commentsFieldName: 'cervical_mct_comments',
        cellType: 'both',
        showApplyToAll: true
    };
}
