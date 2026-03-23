import { RomOption } from "../../range-of-motion/config";
import { ColumnDefinition } from "../../common/measurement-table-multiple-columns/measurement-table-multiple-columns.component";

export const Cervical_Movements_OPTION: RomOption[] = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: '0_not_satisfactory', label: '0 - Not Satisfactory' },
    { value: '1_satisfactory', label: '1 - Satisfactory' },
    { value: 'custom', label: 'Custom' }
];

export interface CervicalMovementsSectionConfig {
    labels: string[];
    columns: ColumnDefinition[];
    options: RomOption[];
    fieldPrefix: string;
    showComments: boolean;
    commentsFieldName: string;
    cellType: 'select' | 'input' | 'both';
    showApplyToAll: boolean;
}

export class CervicalMovementsConfig {
    static readonly cervicalMovements: CervicalMovementsSectionConfig = {
        labels: [
            'Retraction',
            'Right Rotation',
            'Left Rotation',
            'Right Lateral Flexion',
            'Left Lateral Flexion',
            'Extension'
        ],
        columns: [
            { name: 'ROM' },
            { name: 'Movement Quality' },
            { name: 'Pain Free Movement' }
        ],
        options: Cervical_Movements_OPTION,
        fieldPrefix: 'cervical_mvmt_',
        showComments: true,
        commentsFieldName: 'cervical_mvmt_comments',
        cellType: 'both',
        showApplyToAll: true
    };
}
