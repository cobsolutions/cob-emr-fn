import { DEFAULT_APPLY_TO_ALL_OPTIONS, FRTH_IP_EXTENSION_OPTION, FRTH_IP_FEXION_OPTION, FRTH_MTP_EXTENSION_OPTION, FRTH_MTP_FLEXION_OPTION, FTH_IP_EXTENSION_OPTION, FTH_IP_FLEXION_OPTION, FTH_MTP_EXTENSION_OPTION, FTH_MTP_FLEXION_OPTION, SND_IP_EXTENSION_OPTION, SND_IP_FLEXION_OPTION, SND_MTP_EXTENSION_OPTION, SND_MTP_FLEXION_OPTION, TRD_IP_EXTENSION_OPTION, TRD_IP_FLEXION_OPTION, TRD_MTP_EXTENSION_OPTION, TRD_MTP_FLEXION_OPTION } from "./rom-options";
import { RomSectionConfig } from "./rom-types";

export class ToeAROM {
    static readonly toeArom: RomSectionConfig = {
        labels: ['2nd MTP Flexion',
            '2nd MTP Extension',
            '2nd IP Flexion',
            '2nd IP Extension',
            '3rd MTP Flexion',
            '3rd MTP Extension',
            '3rd IP Flexion',
            '3rd IP Extension',
            '4th MTP Flexion',
            '4th MTP Extension',
            '4th IP Fexion',
            '4th IP Extension',
            '5th MTP Flexion',
            '5th MTP Extension',
            '5th IP Flexion',
            '5th IP Extension'],
        options: [],
        applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
        specialOptions: {
            '2nd MTP Flexion': SND_MTP_FLEXION_OPTION,
            '2nd MTP Extension': SND_MTP_EXTENSION_OPTION,
            '2nd IP Flexion': SND_IP_FLEXION_OPTION,
            '2nd IP Extension': SND_IP_EXTENSION_OPTION,
            '3rd MTP Flexion': TRD_MTP_FLEXION_OPTION,
            '3rd MTP Extension': TRD_MTP_EXTENSION_OPTION,
            '3rd IP Flexion': TRD_IP_FLEXION_OPTION,
            '3rd IP Extension': TRD_IP_EXTENSION_OPTION,
            '4th MTP Flexion': FRTH_MTP_FLEXION_OPTION,
            '4th MTP Extension': FRTH_MTP_EXTENSION_OPTION,
            '4th IP Fexion': FRTH_IP_FEXION_OPTION,
            '4th IP Extension': FRTH_IP_EXTENSION_OPTION,
            '5th MTP Flexion': FTH_MTP_FLEXION_OPTION,
            '5th MTP Extension': FTH_MTP_EXTENSION_OPTION,
            '5th IP Flexion': FTH_IP_FLEXION_OPTION,
            '5th IP Extension': FTH_IP_EXTENSION_OPTION
        },
        fieldPrefix: 'toe_arom_',
        applyToAllFieldName: 'toe_arom_apply_to_all',
        commentsFieldName: 'toe_arrom_comments',
        showApplyToAll: true,
        showComments: false
    }
}