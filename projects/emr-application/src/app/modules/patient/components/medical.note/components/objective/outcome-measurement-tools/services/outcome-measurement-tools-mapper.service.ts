import { Injectable } from '@angular/core';
import { Omt } from '../models/Omt';

@Injectable({
  providedIn: 'root'
})
export class OutcomeMeasurementToolsMapperService {

  /**
   * Converts form raw value to OutcomeMeasurementToolsModel for backend
   */
  toModel(formValue: any): Omt {
    return {
      // Custom Outcome Measurement
      customOutcomeMeasurement: {
        customOutcomeMeasurement: formValue.custom_outcome_measurement === 'yes',
        customOutcomeName: formValue.custom_outcome_name || '',
        customOutcomeComments: formValue.custom_outcome_comments || '',
        customOutcomeScore: formValue.custom_outcome_score || ''
      },

      // Vestibular
      vestibular: {
        vestibular: formValue.vestibular === 'yes',
        cerebralConcussion: {
          cerebralConcussion: formValue.cerebral_concussion === 'yes',
          lossofConsciousness: {
            lossOfConsciousness: formValue.loss_of_consciousness === 'yes',
            lossOfConsciousnessSelect: formValue.loss_of_consciousness_select || '',
            lossOfConsciousnessText: formValue.loss_of_consciousness_text || ''
          }
        },
        posttraumaticamnesia: {
          postTraumaticAmnesia: formValue.post_traumatic_amnesia === 'yes',
          postTraumaticAmnesiaSelect: formValue.post_traumatic_amnesia_select || '',
          postTraumaticAmnesiaText: formValue.post_traumatic_amnesia_text || ''
        },
        postCerebralConcussionScale: {
          postCerebralConcussionScale: formValue.post_cerebral_concussion_scale === 'yes',
          postCerebralRawScore: formValue.post_cerebral_raw_score || '',
          postCerebralClassification: formValue.post_cerebral_classification || '',
          postCerebralRank: formValue.post_cerebral_rank || '',
          postCerebralText: formValue.post_cerebral_text || ''
        }
      },

      // Upper Extremity
      upperExtremity: {
        upperExtremity: formValue.upper_extremity === 'yes',
        shoulderPainandDisabilityIndex: {
          shoulderPainDisability: formValue.shoulder_pain_disability === 'yes',
          shoulderTotalPercent: formValue.shoulder_total_percent || '',
          shoulderPainPercent: formValue.shoulder_pain_percent || '',
          shoulderDisabilityPercent: formValue.shoulder_disability_percent || ''
        },
        upperExtremityFunctionalIndex: {
          upperExtremityFunctional: formValue.upper_extremity_functional === 'yes',
          upperExtremityFunctionalScore: formValue.upper_extremity_functional_score || ''
        },
        dASHDisabilitiesofArmShouldeHand: {
          dash: formValue.dash === 'yes',
          dashScore: formValue.dash_score || ''
        },
        handProfile: {
          handProfile: formValue.hand_profile === 'yes',
          handProfileText: formValue.hand_profile_text || ''
        }
      },

      // Spine
      spine: {
        spine: formValue.spine === 'yes',
        neckDisabilityIndexQuestionnaire: {
          neckDisabilityIndex: formValue.neck_disability_index === 'yes',
          neckDisabilityScore: formValue.neck_disability_score || '',
          neckDisabilityTotalPercent: formValue.neck_disability_total_percent || ''
        },
        oswestryLowBackPain: {
          oswestryLowBackPain: formValue.oswestry_low_back_pain === 'yes',
          oswestryDisabilityPercent: formValue.oswestry_disability_percent || ''
        },
        modifiedOswestryLowBackPain: {
          modifiedOswestryLowBackPain: formValue.modified_oswestry_low_back_pain === 'yes',
          modifiedOswestryDisabilityPercent: formValue.modified_oswestry_disability_percent || ''
        },
        theQuebecBackPainDisabilityScale: {
          quebecBackPainDisability: formValue.quebec_back_pain_disability === 'yes',
          quebecBackPainScore: formValue.quebec_back_pain_score || ''
        }
      },

      // Lower Extremity
      lowerExtremity: {
        lowerExtremity: formValue.lower_extremity === 'yes',
        lowerExtremityFunctionalScale: {
          lowerExtremityFunctionalScale: formValue.lower_extremity_functional_scale === 'yes',
          lowerExtremityFunctionalScore: formValue.lower_extremity_functional_score || ''
        },
        faamSports: {
          faamSports: formValue.faam_sports === 'yes',
          faamSportsScore: formValue.faam_sports_score || ''
        },
        hoos: {
          hoos: formValue.hoos === 'yes',
          hoosTotalScore: formValue.hoos_total_score || ''
        },
        koos: {
          koos: formValue.koos === 'yes',
          koosTotalScore: formValue.koos_total_score || ''
        }
      },

      // Balance
      balance: {
        balance: formValue.balance === 'yes',
        aBCScale: {
          abcScale: formValue.abc_scale === 'yes',
          abcScaleScore: formValue.abc_scale_score || ''
        },
        mCTSIB: {
          mctsib: formValue.mctsib === 'yes',
          mctsibCondition_1: formValue.mctsib_condition_1 || '',
          mctsibCondition_2: formValue.mctsib_condition_2 || '',
          mctsibCondition_3: formValue.mctsib_condition_3 || '',
          mctsibCondition_4: formValue.mctsib_condition_4 || '',
          mctsibTotal: formValue.mctsib_total || '',
          mctsibComments: formValue.mctsib_comments || ''
        },
        tinetti: {
          tinetti: formValue.tinetti === 'yes',
          tinettiScore: formValue.tinetti_score || ''
        },
        berg: {
          berg: formValue.berg === 'yes',
          bergScore: formValue.berg_score || ''
        },
        fullertonAdvancedBalanceFABScale: {
          fullerton: formValue.fullerton === 'yes',
          fullertonScore: formValue.fullerton_score || ''
        }
      },

      // Pain
      pain: {
        pain: formValue.pain === 'yes',
        mcGillPainQuestionnaire: {
          mcgillPain: formValue.mcgill_pain === 'yes',
          mcgillPainScore: formValue.mcgill_pain_score || '',
          mcgillCompleted: formValue.mcgill_completed || false,
          mcgillFollowupPlan: formValue.mcgill_followup_plan || ''
        },
        wongBakerFACESPainRatingScale: {
          wongBaker: formValue.wong_baker === 'yes',
          wongBakerScore: formValue.wong_baker_score || '',
          wongBakerFollowupPlan: formValue.wong_baker_followup_plan || ''
        },
        painDisabilityIndex: {
          painDisabilityIndex: formValue.pain_disability_index === 'yes',
          painDisabilityScore: formValue.pain_disability_score || '',
          painDisabilityFollowupPlan: formValue.pain_disability_followup_plan || ''
        },
        croftDisabilityQuestionnaire: {
          croftDisability: formValue.croft_disability === 'yes',
          croftDisabilityScore: formValue.croft_disability_score || '',
          croftDisabilityFollowupPlan: formValue.croft_disability_followup_plan || ''
        },
        theFearAvoidanceBeliefsQuestionnaireFABQ: {
          fabq: formValue.fabq === 'yes',
          fabqScale_1: formValue.fabq_scale_1 || '',
          fabqScale_2: formValue.fabq_scale_2 || '',
          fabqFollowupPlan: formValue.fabq_followup_plan || ''
        }
      },

      // General Function
      generalFunction: {
        generalFunction: formValue.general_function === 'yes',
        timedUpandGo: {
          timedUpAndGo: formValue.timed_up_and_go === 'yes',
          timedUpAndGoAlone: formValue.timed_up_and_go_alone === 'yes',
          timedUpAndGoCognitive: formValue.timed_up_and_go_cognitive === 'yes',
          timedUpAndGoManual: formValue.timed_up_and_go_manual === 'yes'
        },
        fiveTimeSitToStand: {
          fiveTimeSit: formValue.five_time_sit === 'yes',
          fiveTimeSitScore: formValue.five_time_sit_score || '',
          fiveTimeSitComments: formValue.five_time_sit_comments || ''
        },
        aUDITC: {
          auditC: formValue.audit_c === 'yes',
          auditCScore: formValue.audit_c_score || ''
        },
        barthelIndex: {
          barthelIndex: formValue.barthel_index === 'yes',
          barthelIndexScore: formValue.barthel_index_score || ''
        },
        fallsEfficacyScale: {
          fallsEfficacy: formValue.falls_efficacy === 'yes',
          fallsEfficacyTotal: formValue.falls_efficacy_total || ''
        },
        dynamicGaitIndex: {
          dynamicGait: formValue.dynamic_gait === 'yes',
          dynamicGaitScore: formValue.dynamic_gait_score || ''
        },
        functionalReachTest: {
          functionalReach: formValue.functional_reach === 'yes',
          functionalReachScore: formValue.functional_reach_score || '',
          functionalReachUnits: formValue.functional_reach_units || 'inches'
        },
        sLUMS: {
          slums: formValue.slums === 'yes',
          slumsScore: formValue.slums_score || ''
        },
        geriatricDepressionScale: {
          geriatricDepression: formValue.geriatric_depression === 'yes',
          geriatricDepressionScore: formValue.geriatric_depression_score || ''
        },
        elderAbuseSuspicionIndex: {
          elderAbuse: formValue.elder_abuse === 'yes',
          elderAbuseScore: formValue.elder_abuse_score || '',
          elderAbuseFollowupPlan: formValue.elder_abuse_followup_plan || ''
        },
        fOTOPatientInquiry: {
          fotoPatient: formValue.foto_patient === 'yes',
          fotoPatientScore: formValue.foto_patient_score || ''
        }
      }
    };
  }

  /**
   * Converts DTO from backend to form value object
   */
  fromDto(dto: Omt): any {
    return {
      // Custom Outcome Measurement
      custom_outcome_measurement: dto.customOutcomeMeasurement?.customOutcomeMeasurement ? 'yes' : 'no',
      custom_outcome_name: dto.customOutcomeMeasurement?.customOutcomeName || '',
      custom_outcome_comments: dto.customOutcomeMeasurement?.customOutcomeComments || '',
      custom_outcome_score: dto.customOutcomeMeasurement?.customOutcomeScore || '',

      // Vestibular
      vestibular: dto.vestibular?.vestibular ? 'yes' : 'no',
      cerebral_concussion: dto.vestibular?.cerebralConcussion?.cerebralConcussion ? 'yes' : 'no',
      loss_of_consciousness: dto.vestibular?.cerebralConcussion?.lossofConsciousness?.lossOfConsciousness ? 'yes' : 'no',
      loss_of_consciousness_select: dto.vestibular?.cerebralConcussion?.lossofConsciousness?.lossOfConsciousnessSelect || 'not_tested',
      loss_of_consciousness_text: dto.vestibular?.cerebralConcussion?.lossofConsciousness?.lossOfConsciousnessText || '',
      post_traumatic_amnesia: dto.vestibular?.posttraumaticamnesia?.postTraumaticAmnesia ? 'yes' : 'no',
      post_traumatic_amnesia_select: dto.vestibular?.posttraumaticamnesia?.postTraumaticAmnesiaSelect || 'not_tested',
      post_traumatic_amnesia_text: dto.vestibular?.posttraumaticamnesia?.postTraumaticAmnesiaText || '',
      post_cerebral_concussion_scale: dto.vestibular?.postCerebralConcussionScale?.postCerebralConcussionScale ? 'yes' : 'no',
      post_cerebral_raw_score: dto.vestibular?.postCerebralConcussionScale?.postCerebralRawScore || '',
      post_cerebral_classification: dto.vestibular?.postCerebralConcussionScale?.postCerebralClassification || '',
      post_cerebral_rank: dto.vestibular?.postCerebralConcussionScale?.postCerebralRank || '',
      post_cerebral_text: dto.vestibular?.postCerebralConcussionScale?.postCerebralText || '',

      // Upper Extremity
      upper_extremity: dto.upperExtremity?.upperExtremity ? 'yes' : 'no',
      shoulder_pain_disability: dto.upperExtremity?.shoulderPainandDisabilityIndex?.shoulderPainDisability ? 'yes' : 'no',
      shoulder_total_percent: dto.upperExtremity?.shoulderPainandDisabilityIndex?.shoulderTotalPercent || '',
      shoulder_pain_percent: dto.upperExtremity?.shoulderPainandDisabilityIndex?.shoulderPainPercent || '',
      shoulder_disability_percent: dto.upperExtremity?.shoulderPainandDisabilityIndex?.shoulderDisabilityPercent || '',
      upper_extremity_functional: dto.upperExtremity?.upperExtremityFunctionalIndex?.upperExtremityFunctional ? 'yes' : 'no',
      upper_extremity_functional_score: dto.upperExtremity?.upperExtremityFunctionalIndex?.upperExtremityFunctionalScore || '',
      dash: dto.upperExtremity?.dASHDisabilitiesofArmShouldeHand?.dash ? 'yes' : 'no',
      dash_score: dto.upperExtremity?.dASHDisabilitiesofArmShouldeHand?.dashScore || '',
      hand_profile: dto.upperExtremity?.handProfile?.handProfile ? 'yes' : 'no',
      hand_profile_text: dto.upperExtremity?.handProfile?.handProfileText || '',

      // Spine
      spine: dto.spine?.spine ? 'yes' : 'no',
      neck_disability_index: dto.spine?.neckDisabilityIndexQuestionnaire?.neckDisabilityIndex ? 'yes' : 'no',
      neck_disability_score: dto.spine?.neckDisabilityIndexQuestionnaire?.neckDisabilityScore || '',
      neck_disability_total_percent: dto.spine?.neckDisabilityIndexQuestionnaire?.neckDisabilityTotalPercent || '',
      oswestry_low_back_pain: dto.spine?.oswestryLowBackPain?.oswestryLowBackPain ? 'yes' : 'no',
      oswestry_disability_percent: dto.spine?.oswestryLowBackPain?.oswestryDisabilityPercent || '',
      modified_oswestry_low_back_pain: dto.spine?.modifiedOswestryLowBackPain?.modifiedOswestryLowBackPain ? 'yes' : 'no',
      modified_oswestry_disability_percent: dto.spine?.modifiedOswestryLowBackPain?.modifiedOswestryDisabilityPercent || '',
      quebec_back_pain_disability: dto.spine?.theQuebecBackPainDisabilityScale?.quebecBackPainDisability ? 'yes' : 'no',
      quebec_back_pain_score: dto.spine?.theQuebecBackPainDisabilityScale?.quebecBackPainScore || '',

      // Lower Extremity
      lower_extremity: dto.lowerExtremity?.lowerExtremity ? 'yes' : 'no',
      lower_extremity_functional_scale: dto.lowerExtremity?.lowerExtremityFunctionalScale?.lowerExtremityFunctionalScale ? 'yes' : 'no',
      lower_extremity_functional_score: dto.lowerExtremity?.lowerExtremityFunctionalScale?.lowerExtremityFunctionalScore || '',
      faam_sports: dto.lowerExtremity?.faamSports?.faamSports ? 'yes' : 'no',
      faam_sports_score: dto.lowerExtremity?.faamSports?.faamSportsScore || '',
      hoos: dto.lowerExtremity?.hoos?.hoos ? 'yes' : 'no',
      hoos_total_score: dto.lowerExtremity?.hoos?.hoosTotalScore || '',
      koos: dto.lowerExtremity?.koos?.koos ? 'yes' : 'no',
      koos_total_score: dto.lowerExtremity?.koos?.koosTotalScore || '',

      // Balance
      balance: dto.balance?.balance ? 'yes' : 'no',
      abc_scale: dto.balance?.aBCScale?.abcScale ? 'yes' : 'no',
      abc_scale_score: dto.balance?.aBCScale?.abcScaleScore || '',
      mctsib: dto.balance?.mCTSIB?.mctsib ? 'yes' : 'no',
      mctsib_condition_1: dto.balance?.mCTSIB?.mctsibCondition_1 || '',
      mctsib_condition_2: dto.balance?.mCTSIB?.mctsibCondition_2 || '',
      mctsib_condition_3: dto.balance?.mCTSIB?.mctsibCondition_3 || '',
      mctsib_condition_4: dto.balance?.mCTSIB?.mctsibCondition_4 || '',
      mctsib_total: dto.balance?.mCTSIB?.mctsibTotal || '',
      mctsib_comments: dto.balance?.mCTSIB?.mctsibComments || '',
      tinetti: dto.balance?.tinetti?.tinetti ? 'yes' : 'no',
      tinetti_score: dto.balance?.tinetti?.tinettiScore || '',
      berg: dto.balance?.berg?.berg ? 'yes' : 'no',
      berg_score: dto.balance?.berg?.bergScore || '',
      fullerton: dto.balance?.fullertonAdvancedBalanceFABScale?.fullerton ? 'yes' : 'no',
      fullerton_score: dto.balance?.fullertonAdvancedBalanceFABScale?.fullertonScore || '',

      // Pain
      pain: dto.pain?.pain ? 'yes' : 'no',
      mcgill_pain: dto.pain?.mcGillPainQuestionnaire?.mcgillPain ? 'yes' : 'no',
      mcgill_pain_score: dto.pain?.mcGillPainQuestionnaire?.mcgillPainScore || '',
      mcgill_completed: dto.pain?.mcGillPainQuestionnaire?.mcgillCompleted || false,
      mcgill_followup_plan: dto.pain?.mcGillPainQuestionnaire?.mcgillFollowupPlan || '',
      wong_baker: dto.pain?.wongBakerFACESPainRatingScale?.wongBaker ? 'yes' : 'no',
      wong_baker_score: dto.pain?.wongBakerFACESPainRatingScale?.wongBakerScore || '',
      wong_baker_followup_plan: dto.pain?.wongBakerFACESPainRatingScale?.wongBakerFollowupPlan || '',
      pain_disability_index: dto.pain?.painDisabilityIndex?.painDisabilityIndex ? 'yes' : 'no',
      pain_disability_score: dto.pain?.painDisabilityIndex?.painDisabilityScore || '',
      pain_disability_followup_plan: dto.pain?.painDisabilityIndex?.painDisabilityFollowupPlan || '',
      croft_disability: dto.pain?.croftDisabilityQuestionnaire?.croftDisability ? 'yes' : 'no',
      croft_disability_score: dto.pain?.croftDisabilityQuestionnaire?.croftDisabilityScore || '',
      croft_disability_followup_plan: dto.pain?.croftDisabilityQuestionnaire?.croftDisabilityFollowupPlan || '',
      fabq: dto.pain?.theFearAvoidanceBeliefsQuestionnaireFABQ?.fabq ? 'yes' : 'no',
      fabq_scale_1: dto.pain?.theFearAvoidanceBeliefsQuestionnaireFABQ?.fabqScale_1 || '',
      fabq_scale_2: dto.pain?.theFearAvoidanceBeliefsQuestionnaireFABQ?.fabqScale_2 || '',
      fabq_followup_plan: dto.pain?.theFearAvoidanceBeliefsQuestionnaireFABQ?.fabqFollowupPlan || '',

      // General Function
      general_function: dto.generalFunction?.generalFunction ? 'yes' : 'no',
      timed_up_and_go: dto.generalFunction?.timedUpandGo?.timedUpAndGo ? 'yes' : 'no',
      timed_up_and_go_alone: dto.generalFunction?.timedUpandGo?.timedUpAndGoAlone ? 'yes' : 'no',
      timed_up_and_go_cognitive: dto.generalFunction?.timedUpandGo?.timedUpAndGoCognitive ? 'yes' : 'no',
      timed_up_and_go_manual: dto.generalFunction?.timedUpandGo?.timedUpAndGoManual ? 'yes' : 'no',
      five_time_sit: dto.generalFunction?.fiveTimeSitToStand?.fiveTimeSit ? 'yes' : 'no',
      five_time_sit_score: dto.generalFunction?.fiveTimeSitToStand?.fiveTimeSitScore || '',
      five_time_sit_comments: dto.generalFunction?.fiveTimeSitToStand?.fiveTimeSitComments || '',
      audit_c: dto.generalFunction?.aUDITC?.auditC ? 'yes' : 'no',
      audit_c_score: dto.generalFunction?.aUDITC?.auditCScore || '',
      barthel_index: dto.generalFunction?.barthelIndex?.barthelIndex ? 'yes' : 'no',
      barthel_index_score: dto.generalFunction?.barthelIndex?.barthelIndexScore || '',
      falls_efficacy: dto.generalFunction?.fallsEfficacyScale?.fallsEfficacy ? 'yes' : 'no',
      falls_efficacy_total: dto.generalFunction?.fallsEfficacyScale?.fallsEfficacyTotal || '',
      dynamic_gait: dto.generalFunction?.dynamicGaitIndex?.dynamicGait ? 'yes' : 'no',
      dynamic_gait_score: dto.generalFunction?.dynamicGaitIndex?.dynamicGaitScore || '',
      functional_reach: dto.generalFunction?.functionalReachTest?.functionalReach ? 'yes' : 'no',
      functional_reach_score: dto.generalFunction?.functionalReachTest?.functionalReachScore || '',
      functional_reach_units: dto.generalFunction?.functionalReachTest?.functionalReachUnits || 'inches',
      slums: dto.generalFunction?.sLUMS?.slums ? 'yes' : 'no',
      slums_score: dto.generalFunction?.sLUMS?.slumsScore || '',
      geriatric_depression: dto.generalFunction?.geriatricDepressionScale?.geriatricDepression ? 'yes' : 'no',
      geriatric_depression_score: dto.generalFunction?.geriatricDepressionScale?.geriatricDepressionScore || '',
      elder_abuse: dto.generalFunction?.elderAbuseSuspicionIndex?.elderAbuse ? 'yes' : 'no',
      elder_abuse_score: dto.generalFunction?.elderAbuseSuspicionIndex?.elderAbuseScore || '',
      elder_abuse_followup_plan: dto.generalFunction?.elderAbuseSuspicionIndex?.elderAbuseFollowupPlan || '',
      foto_patient: dto.generalFunction?.fOTOPatientInquiry?.fotoPatient ? 'yes' : 'no',
      foto_patient_score: dto.generalFunction?.fOTOPatientInquiry?.fotoPatientScore || ''
    };
  }
}
