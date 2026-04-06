import { RomOption, RomSectionWithSelectsConfig } from "../../range-of-motion/config";

export const Lower_Body_Myofascial_Tests_OPTION: RomOption[] = [
    { value: 'not_tested', label: 'Not Tested' },
    { value: '5/5', label: '5/5' },
    { value: '4/5', label: '4/5' },
    { value: '3/5', label: '3/5' },
    { value: '2/5', label: '2/5' },
    { value: '1/5', label: '1/5' },
    { value: 'custom', label: 'Custom' }
];

export class LowerBodyMyofascialTestsConfig {
    static readonly lowerBodyMyofascialTests: RomSectionWithSelectsConfig = {
        labels: [
            'Supine Pelvic Lift',
            'Supine Bridge',
            'Supine Knee Flexion',
            'Side Lying Hip Abduction',
            'Side Lying Hip Adduction',
            'Prone Bridge',
            'Prone Hip Flexion',
            'Prone Knee Extension'
        ],
        options: Lower_Body_Myofascial_Tests_OPTION,
        fieldPrefix: 'lower_body_mft_',
        topSelects: [],
        commentsFieldName: 'lower_body_mft_comments',
        showComments: true
    };
}
