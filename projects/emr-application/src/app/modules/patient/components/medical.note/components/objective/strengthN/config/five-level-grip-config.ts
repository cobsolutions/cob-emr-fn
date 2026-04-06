import { RomRlInputColumnsConfig } from "../../range-of-motion/config";

export class FiveLevelGrip {
    static readonly fiveLevelGrip: RomRlInputColumnsConfig = {
        rows: [
            { label: '', inputCount: 5, type: 'input' },
            { label: 'COV', inputCount: 1, type: 'input' },
            { label: 'AVG', inputCount: 1, type: 'input' },
            { label: 'Comments', inputCount: 1, type: 'textarea' }
        ],
        fieldPrefix: 'five_level_grip_',
        commentsFieldName: 'five_level_grip_comments',
        showComments: false
    };
}
