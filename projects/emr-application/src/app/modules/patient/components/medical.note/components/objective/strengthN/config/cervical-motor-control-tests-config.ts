import { RomOption } from "../../range-of-motion/config";
import { ColumnDefinition } from "../../common/measurement-table-multiple-columns/measurement-table-multiple-columns.component";

export const Cervical_Motor_Control_Tests_OPTION: RomOption[] = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: '0_not_satisfactory', label: '0 - Not Satisfactory' },
    { value: '1_satisfactory', label: '1 - Satisfactory' },
    { value: 'custom', label: 'Custom' }
];

export const Motor_Control_Tests_HOLD_TIME_OPTION: RomOption[] = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: '120_sec', label: '120 Seconds' },
    { value: '90_sec', label: '90 Seconds' },
    { value: '60_sec', label: '60 Seconds' },
    { value: '30_sec', label: '30 Seconds' },
    { value: '15_sec', label: '15 Seconds' },
    { value: '10_sec', label: '10 Seconds' },
    { value: '5_sec', label: '5 Seconds' },
    { value: 'less_than_5_sec', label: '<5 Seconds' },
    { value: 'custom', label: 'Custom' }
];

export interface CervicalMotorControlTestsSectionConfig {
    labels: string[];
    columns: ColumnDefinition[];
    options: RomOption[];
    columnOptions?: { [columnName: string]: RomOption[] };
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
        columnOptions: {
            'Hold Time': Motor_Control_Tests_HOLD_TIME_OPTION
        },
        fieldPrefix: 'cervical_mct_',
        showComments: true,
        commentsFieldName: 'cervical_mct_comments',
        cellType: 'both',
        showApplyToAll: true
    };
}
