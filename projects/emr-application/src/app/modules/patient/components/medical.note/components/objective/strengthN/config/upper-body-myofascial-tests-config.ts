import { RomOption, RomSectionWithSelectsConfig } from "../../range-of-motion/config";

export const Upper_Body_Myofascial_Tests_OPTION: RomOption[] = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: '5/5', label: '5/5' },
    { value: '4/5', label: '4/5' },
    { value: '3/5', label: '3/5' },
    { value: '2/5', label: '2/5' },
    { value: '1/5', label: '1/5' },
    { value: 'custom', label: 'Custom' }
];

export class UpperBodyMyofascialTestsConfig {
    static readonly upperBodyMyofascialTests: RomSectionWithSelectsConfig = {
        labels: [
            'Kneeling Scapular Protraction',
            'Kneeling Push Up',
            'Kneeling Shoulder Extension',
            'Supine Scapular Retraction',
            'Supine Pull Up'
        ],
        options: Upper_Body_Myofascial_Tests_OPTION,
        fieldPrefix: 'upper_body_mft_',
        topSelects: [],
        commentsFieldName: 'upper_body_mft_comments',
        showComments: true
    };
}
