import { RomRlInputColumnsConfig } from "../../range-of-motion/config";

export class RapidExchange {
    static readonly rapidExchange: RomRlInputColumnsConfig = {
        rows: [
            { label: '', inputCount: 5, type: 'input' },
            { label: 'COV', inputCount: 1, type: 'input' },
            { label: 'AVG', inputCount: 1, type: 'input' },
            { label: 'Comments', inputCount: 1, type: 'textarea' }
        ],
        fieldPrefix: 'rapid_exchange_',
        commentsFieldName: 'rapid_exchange_comments',
        showComments: false
    };
}
