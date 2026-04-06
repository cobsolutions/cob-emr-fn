import { RomRlInputColumnsConfig } from "../../range-of-motion/config";

export class RepeatedGrip {
    static readonly repeatedGrip: RomRlInputColumnsConfig = {
        rows: [
            { label: '', inputCount: 5, type: 'input' },
            { label: 'COV', inputCount: 1, type: 'input' },
            { label: 'AVG', inputCount: 1, type: 'input' },
            { label: 'Comments', inputCount: 1, type: 'textarea' }
        ],
        fieldPrefix: 'repeated_grip_',
        commentsFieldName: 'repeated_grip_comments',
        showComments: false
    };
}
