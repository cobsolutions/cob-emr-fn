import { RomOption } from "../../range-of-motion/config";
import { ColumnDefinition } from "../../common/measurement-table-multiple-columns/measurement-table-multiple-columns.component";
import { Motor_Control_Tests_HOLD_TIME_OPTION } from "./cervical-motor-control-tests-config";

export const Lumbar_Motor_Control_Tests_OPTION: RomOption[] = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: '0_not_satisfactory', label: '0 - Not Satisfactory' },
    { value: '1_satisfactory', label: '1 - Satisfactory' },
    { value: 'custom', label: 'Custom' }
];

export interface LumbarMotorControlTestsSectionConfig {
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

export class LumbarMotorControlTestsConfig {
    static readonly lumbarMotorControlTests: LumbarMotorControlTestsSectionConfig = {
        labels: [
            'Supine Lumbar Setting',
            'Prone Lumbar Setting',
            'Kneeling Lumbar Setting',
            'Left Side Lying Lumbar Setting',
            'Right Side Lying Lumbar Setting'
        ],
        columns: [
            { name: 'Global Compensation' },
            { name: 'Position' },
            { name: 'Pain' },
            { name: 'Hold Time' }
        ],
        options: Lumbar_Motor_Control_Tests_OPTION,
        columnOptions: {
            'Hold Time': Motor_Control_Tests_HOLD_TIME_OPTION
        },
        fieldPrefix: 'lumbar_mct_',
        showComments: true,
        commentsFieldName: 'lumbar_mct_comments',
        cellType: 'both',
        showApplyToAll: true
    };
}
