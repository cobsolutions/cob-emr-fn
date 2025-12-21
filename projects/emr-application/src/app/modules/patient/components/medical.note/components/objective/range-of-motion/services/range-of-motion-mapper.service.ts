import { Injectable } from '@angular/core';
import { CervicalAROMModel, CostovertebralExpansionModel, ElbowAROMModel, ElbowPROMModel, HandAromPromModel, HipAROMModel, IndexFingerAromPromModel, MiddleFingerAromPromModel, NoLimitationsNotedModel, RangeOfMotionModel, RingFingerAromPromModel, ShoulderAROMModel, ShoulderPROMModel, SmallFingerAromPromModel, ThoracicAromSittingWithPassiveOverpressureModel, ThoracicAROMStandingModel, ThumbAromPromModel, ToeAROMModel, ToePROMModel, WristAROMModel, WristPROMModel, LumbarAROMModel, HipPROMModel, KneeAROMModel, AnkleAROMModel, AnklePROMModel, FirstMtpAROMModel, FirstIpAROMModel } from '../models/range-of-motion.model';
import { mapSingleColumnSection, fromDtoSingleColumnSection, mapMeasurementSection, fromDtoMeasurementSection, mapMeasurementEndfeelSection, fromDtoMeasurementEndfeelSection } from '../common/mapper-utils';
import { CervicalAROMConfig } from '../config/cervical-arom';
import { LumbarAROMConfig } from '../config/lumbar-arom-config';
import { CostovertebralExpansionConfig } from '../config/costovertebral.expansion-config';
import { ShoulderAROM } from '../config/shoulder-arom-config';
import { ShoulderPROM } from '../config/shoulder-prom-config';
import { ElbowAROM } from '../config/elbow-arom-config';
import { ElbowPROM } from '../config/elbow-prom-config';
import { WristAROM } from '../config/wrist-arom-config';
import { WristPROM } from '../config/wrist-prom-config';
import { HipAromConfig } from '../config/hip-arom-config';
import { HipPROM } from '../config/hip-prom-config';
import { KneeAROM } from '../config/knee-arom-config';
import { AnkleAROM } from '../config/ankle-arom-config';
import { AnklePROM } from '../config/ankle-prom-config';
import { FstMTPArom } from '../config/fst-mtp-arom-config';
import { FstIPAROM } from '../config/fst-ip-arom-config';
import { ToeAROM } from '../config/toe-arom-config';
import { ToePROM } from '../config/toe-prom-config';

@Injectable({
  providedIn: 'root'
})
export class RangeOfMotionMapperService {

  constructor() { }

  /**
   * Convert form values to RangeOfMotionModel (for sending to backend)
   */
  toModel(formValue: any): RangeOfMotionModel {
    return {
      noLimitationsNoted: this.mapNoLimitationsNoted(formValue),
      cervicalArom: this.mapCervicalArom(formValue),
      costovertebralExpansion: this.mapCostovertebralExpansion(formValue),
      shoulderArom: this.mapShoulderArom(formValue),
      shoulderProm: this.mapShoulderProm(formValue),
      elbowArom: this.mapElbowArom(formValue),
      elbowProm: this.mapElbowProm(formValue),
      wristArom: this.mapWristArom(formValue),
      wristProm: this.mapWristProm(formValue),
      handAromProm: this.mapHandAromProm(formValue),
      thoracicAromSittingWithPassiveOverpressure: this.mapThoracicAromSittingWithPassiveOverpressure(formValue),
      thoracicAROMStandingModel: this.mapThoracicAROMStanding(formValue),
      lumbarAROMModel: this.mapLumbarAROM(formValue),
      hipArom: this.mapHipArom(formValue),
      hipProm: this.mapHipPROM(formValue),
      kneeArom: this.mapKneeArom(formValue),
      ankleArom: this.mapAnkleArom(formValue),
      ankleProm: this.mapAnkleProm(formValue),
      firstMtpArom: this.mapFirstMtpArom(formValue),
      firstIpArom: this.mapFirstIpArom(formValue),
      toeArom: this.mapToeArom(formValue),
      toeProm: this.mapToeProm(formValue)
    };
  }

  /**
   * Convert RangeOfMotionModel to form values (for loading from backend)
   */
  fromDto(dto: RangeOfMotionModel): any {
    return {
      ...this.fromDtoNoLimitationsNoted(dto),
      ...this.fromDtoCervicalArom(dto),
      ...this.fromDtoCostovertebralExpansion(dto),
      ...this.fromDtoShoulderArom(dto),
      ...this.fromDtoShoulderProm(dto),
      ...this.fromDtoElbowArom(dto),
      ...this.fromDtoElbowProm(dto),
      ...this.fromDtoWristArom(dto),
      ...this.fromDtoWristProm(dto),
      ...this.fromDtoHandAromProm(dto),
      ...this.fromDtoThoracicAromSittingWithPassiveOverpressure(dto),
      ...this.fromDtoThoracicAROMStanding(dto),
      ...this.fromDtoLumbarAROM(dto),
      ...this.fromDtoHipArom(dto),
      ...this.fromDtoHipProm(dto),
      ...this.fromDtoKneeArom(dto),
      ...this.fromDtoAnkleArom(dto),
      ...this.fromDtoAnkleProm(dto),
      ...this.fromDtoFirstMtpArom(dto),
      ...this.fromDtoFirstIpArom(dto),
      ...this.fromDtoToeArom(dto),
      ...this.fromDtoToeProm(dto)
    };
  }

  private fromDtoNoLimitationsNoted(dto: RangeOfMotionModel): any {
    return {
      // No Limitations Noted
      no_limitations_noted: dto.noLimitationsNoted.enabled ? 'no' : 'yes',
      arom: dto.noLimitationsNoted.arom || false,
      prom: dto.noLimitationsNoted.prom?.enabled || false,
      prom_cervical: dto.noLimitationsNoted.prom?.cervical || false,
      prom_thoracic: dto.noLimitationsNoted.prom?.thoracic || false,
      prom_shoulder: dto.noLimitationsNoted.prom?.shoulder || false,
      prom_elbow: dto.noLimitationsNoted.prom?.elbow || false,
      prom_wrist: dto.noLimitationsNoted.prom?.wrist || false,
      prom_hand: dto.noLimitationsNoted.prom?.hand || false,
      prom_lumbar: dto.noLimitationsNoted.prom?.lumbar || false,
      prom_hip: dto.noLimitationsNoted.prom?.hip || false,
      prom_knee: dto.noLimitationsNoted.prom?.knee || false,
      prom_ankle: dto.noLimitationsNoted.prom?.ankle || false,
      prom_feet: dto.noLimitationsNoted.prom?.feet || false,
      prom_comments: dto.noLimitationsNoted.prom?.comments || ''
    };
  }

  private fromDtoCervicalArom(dto: RangeOfMotionModel): any {
    // Using generic mapper with config - no manual field mapping!
    return fromDtoSingleColumnSection(
      dto.cervicalArom,
      CervicalAROMConfig.cervicalArom,
      'cervical_arrom'
    );
  }

  private fromDtoCostovertebralExpansion(dto: RangeOfMotionModel): any {
    return fromDtoSingleColumnSection(
      dto.costovertebralExpansion,
      CostovertebralExpansionConfig.costovertebralExpansion,
      'costovertebral_expansion'
    );
  }

  private fromDtoShoulderArom(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementSection(
      dto.shoulderArom,
      ShoulderAROM.shoulderArom,
      'shoulder_arrom'
    );
  }

  private fromDtoShoulderProm(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementEndfeelSection(
      dto.shoulderProm,
      ShoulderPROM.shoulderProm,
      'shoulder_prom'
    );
  }

  private fromDtoElbowArom(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementSection(
      dto.elbowArom,
      ElbowAROM.elbowArom,
      'elbow_arrom'
    );
  }

  private fromDtoElbowProm(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementEndfeelSection(
      dto.elbowProm,
      ElbowPROM.elbowProm,
      'elbow_prom'
    );
  }

  private fromDtoWristArom(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementSection(
      dto.wristArom,
      WristAROM.wristArom,
      'wrist_arrom'
    );
  }

  private fromDtoWristProm(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementEndfeelSection(
      dto.wristProm,
      WristPROM.wristProm,
      'wrist_prom'
    );
  }

  private fromDtoHandAromProm(dto: RangeOfMotionModel): any {
    return {
      // Hand AROM-PROM
      hand_arrom_prom: dto.handAromProm?.enabled ? 'yes' : 'no',
      calculate_total_rom: dto.handAromProm?.calculateTotalRom || false,
      thumb_arrom_prom: dto.handAromProm?.thumbAromProm?.enabled || false,

      // Thumb AROM-PROM
      thumb_cmc_palmar_abduction_right_arom: dto.handAromProm?.thumbAromProm?.cmcPalmarAbductionRightArom || 'not_tested',
      thumb_cmc_palmar_abduction_right_prom: dto.handAromProm?.thumbAromProm?.cmcPalmarAbductionRightProm || 'not_tested',
      thumb_cmc_palmar_abduction_left_arom: dto.handAromProm?.thumbAromProm?.cmcPalmarAbductionLeftArom || 'not_tested',
      thumb_cmc_palmar_abduction_left_prom: dto.handAromProm?.thumbAromProm?.cmcPalmarAbductionLeftProm || 'not_tested',
      thumb_cmc_radial_abduction_right_arom: dto.handAromProm?.thumbAromProm?.cmcRadialAbductionRightArom || 'not_tested',
      thumb_cmc_radial_abduction_right_prom: dto.handAromProm?.thumbAromProm?.cmcRadialAbductionRightProm || 'not_tested',
      thumb_cmc_radial_abduction_left_arom: dto.handAromProm?.thumbAromProm?.cmcRadialAbductionLeftArom || 'not_tested',
      thumb_cmc_radial_abduction_left_prom: dto.handAromProm?.thumbAromProm?.cmcRadialAbductionLeftProm || 'not_tested',
      thumb_cmc_adduction_right_arom: dto.handAromProm?.thumbAromProm?.cmcAdductionRightArom || 'not_tested',
      thumb_cmc_adduction_right_prom: dto.handAromProm?.thumbAromProm?.cmcAdductionRightProm || 'not_tested',
      thumb_cmc_adduction_left_arom: dto.handAromProm?.thumbAromProm?.cmcAdductionLeftArom || 'not_tested',
      thumb_cmc_adduction_left_prom: dto.handAromProm?.thumbAromProm?.cmcAdductionLeftProm || 'not_tested',
      thumb_cmc_extension_right_arom: dto.handAromProm?.thumbAromProm?.cmcExtensionRightArom || 'not_tested',
      thumb_cmc_extension_right_prom: dto.handAromProm?.thumbAromProm?.cmcExtensionRightProm || 'not_tested',
      thumb_cmc_extension_left_arom: dto.handAromProm?.thumbAromProm?.cmcExtensionLeftArom || 'not_tested',
      thumb_cmc_extension_left_prom: dto.handAromProm?.thumbAromProm?.cmcExtensionLeftProm || 'not_tested',
      thumb_cmc_flexion_right_arom: dto.handAromProm?.thumbAromProm?.cmcFlexionRightArom || 'not_tested',
      thumb_cmc_flexion_right_prom: dto.handAromProm?.thumbAromProm?.cmcFlexionRightProm || 'not_tested',
      thumb_cmc_flexion_left_arom: dto.handAromProm?.thumbAromProm?.cmcFlexionLeftArom || 'not_tested',
      thumb_cmc_flexion_left_prom: dto.handAromProm?.thumbAromProm?.cmcFlexionLeftProm || 'not_tested',
      thumb_cmc_total_motion_right_arom: dto.handAromProm?.thumbAromProm?.cmcTotalMotionRightArom || '',
      thumb_cmc_total_motion_right_prom: dto.handAromProm?.thumbAromProm?.cmcTotalMotionRightProm || '',
      thumb_cmc_total_motion_left_arom: dto.handAromProm?.thumbAromProm?.cmcTotalMotionLeftArom || '',
      thumb_cmc_total_motion_left_prom: dto.handAromProm?.thumbAromProm?.cmcTotalMotionLeftProm || '',
      thumb_mp_extension_right_arom: dto.handAromProm?.thumbAromProm?.mpExtensionRightArom || 'not_tested',
      thumb_mp_extension_right_prom: dto.handAromProm?.thumbAromProm?.mpExtensionRightProm || 'not_tested',
      thumb_mp_extension_left_arom: dto.handAromProm?.thumbAromProm?.mpExtensionLeftArom || 'not_tested',
      thumb_mp_extension_left_prom: dto.handAromProm?.thumbAromProm?.mpExtensionLeftProm || 'not_tested',
      thumb_mp_flexion_right_arom: dto.handAromProm?.thumbAromProm?.mpFlexionRightArom || 'not_tested',
      thumb_mp_flexion_right_prom: dto.handAromProm?.thumbAromProm?.mpFlexionRightProm || 'not_tested',
      thumb_mp_flexion_left_arom: dto.handAromProm?.thumbAromProm?.mpFlexionLeftArom || 'not_tested',
      thumb_mp_flexion_left_prom: dto.handAromProm?.thumbAromProm?.mpFlexionLeftProm || 'not_tested',
      thumb_mp_total_motion_right_arom: dto.handAromProm?.thumbAromProm?.mpTotalMotionRightArom || '',
      thumb_mp_total_motion_right_prom: dto.handAromProm?.thumbAromProm?.mpTotalMotionRightProm || '',
      thumb_mp_total_motion_left_arom: dto.handAromProm?.thumbAromProm?.mpTotalMotionLeftArom || '',
      thumb_mp_total_motion_left_prom: dto.handAromProm?.thumbAromProm?.mpTotalMotionLeftProm || '',
      thumb_ip_extension_right_arom: dto.handAromProm?.thumbAromProm?.ipExtensionRightArom || 'not_tested',
      thumb_ip_extension_right_prom: dto.handAromProm?.thumbAromProm?.ipExtensionRightProm || 'not_tested',
      thumb_ip_extension_left_arom: dto.handAromProm?.thumbAromProm?.ipExtensionLeftArom || 'not_tested',
      thumb_ip_extension_left_prom: dto.handAromProm?.thumbAromProm?.ipExtensionLeftProm || 'not_tested',
      thumb_ip_flexion_right_arom: dto.handAromProm?.thumbAromProm?.ipFlexionRightArom || 'not_tested',
      thumb_ip_flexion_right_prom: dto.handAromProm?.thumbAromProm?.ipFlexionRightProm || 'not_tested',
      thumb_ip_flexion_left_arom: dto.handAromProm?.thumbAromProm?.ipFlexionLeftArom || 'not_tested',
      thumb_ip_flexion_left_prom: dto.handAromProm?.thumbAromProm?.ipFlexionLeftProm || 'not_tested',
      thumb_ip_total_motion_right_arom: dto.handAromProm?.thumbAromProm?.ipTotalMotionRightArom || '',
      thumb_ip_total_motion_right_prom: dto.handAromProm?.thumbAromProm?.ipTotalMotionRightProm || '',
      thumb_ip_total_motion_left_arom: dto.handAromProm?.thumbAromProm?.ipTotalMotionLeftArom || '',
      thumb_ip_total_motion_left_prom: dto.handAromProm?.thumbAromProm?.ipTotalMotionLeftProm || '',
      thumb_comments: dto.handAromProm?.thumbAromProm?.comments || '',

      // Index Finger AROM-PROM
      index_finger_arrom_prom: dto.handAromProm?.indexFingerAromProm?.enabled || false,
      index_mp_adduction_right_arom: dto.handAromProm?.indexFingerAromProm?.mpAdductionRightArom || 'not_tested',
      index_mp_adduction_right_prom: dto.handAromProm?.indexFingerAromProm?.mpAdductionRightProm || 'not_tested',
      index_mp_adduction_left_arom: dto.handAromProm?.indexFingerAromProm?.mpAdductionLeftArom || 'not_tested',
      index_mp_adduction_left_prom: dto.handAromProm?.indexFingerAromProm?.mpAdductionLeftProm || 'not_tested',
      index_mp_extension_right_arom: dto.handAromProm?.indexFingerAromProm?.mpExtensionRightArom || 'not_tested',
      index_mp_extension_right_prom: dto.handAromProm?.indexFingerAromProm?.mpExtensionRightProm || 'not_tested',
      index_mp_extension_left_arom: dto.handAromProm?.indexFingerAromProm?.mpExtensionLeftArom || 'not_tested',
      index_mp_extension_left_prom: dto.handAromProm?.indexFingerAromProm?.mpExtensionLeftProm || 'not_tested',
      index_mp_flexion_right_arom: dto.handAromProm?.indexFingerAromProm?.mpFlexionRightArom || 'not_tested',
      index_mp_flexion_right_prom: dto.handAromProm?.indexFingerAromProm?.mpFlexionRightProm || 'not_tested',
      index_mp_flexion_left_arom: dto.handAromProm?.indexFingerAromProm?.mpFlexionLeftArom || 'not_tested',
      index_mp_flexion_left_prom: dto.handAromProm?.indexFingerAromProm?.mpFlexionLeftProm || 'not_tested',
      index_mp_total_motion_right_arom: dto.handAromProm?.indexFingerAromProm?.mpTotalMotionRightArom || '',
      index_mp_total_motion_right_prom: dto.handAromProm?.indexFingerAromProm?.mpTotalMotionRightProm || '',
      index_mp_total_motion_left_arom: dto.handAromProm?.indexFingerAromProm?.mpTotalMotionLeftArom || '',
      index_mp_total_motion_left_prom: dto.handAromProm?.indexFingerAromProm?.mpTotalMotionLeftProm || '',
      index_pip_extension_right_arom: dto.handAromProm?.indexFingerAromProm?.pipExtensionRightArom || 'not_tested',
      index_pip_extension_right_prom: dto.handAromProm?.indexFingerAromProm?.pipExtensionRightProm || 'not_tested',
      index_pip_extension_left_arom: dto.handAromProm?.indexFingerAromProm?.pipExtensionLeftArom || 'not_tested',
      index_pip_extension_left_prom: dto.handAromProm?.indexFingerAromProm?.pipExtensionLeftProm || 'not_tested',
      index_pip_flexion_right_arom: dto.handAromProm?.indexFingerAromProm?.pipFlexionRightArom || 'not_tested',
      index_pip_flexion_right_prom: dto.handAromProm?.indexFingerAromProm?.pipFlexionRightProm || 'not_tested',
      index_pip_flexion_left_arom: dto.handAromProm?.indexFingerAromProm?.pipFlexionLeftArom || 'not_tested',
      index_pip_flexion_left_prom: dto.handAromProm?.indexFingerAromProm?.pipFlexionLeftProm || 'not_tested',
      index_pip_total_motion_right_arom: dto.handAromProm?.indexFingerAromProm?.pipTotalMotionRightArom || '',
      index_pip_total_motion_right_prom: dto.handAromProm?.indexFingerAromProm?.pipTotalMotionRightProm || '',
      index_pip_total_motion_left_arom: dto.handAromProm?.indexFingerAromProm?.pipTotalMotionLeftArom || '',
      index_pip_total_motion_left_prom: dto.handAromProm?.indexFingerAromProm?.pipTotalMotionLeftProm || '',
      index_dip_extension_right_arom: dto.handAromProm?.indexFingerAromProm?.dipExtensionRightArom || 'not_tested',
      index_dip_extension_right_prom: dto.handAromProm?.indexFingerAromProm?.dipExtensionRightProm || 'not_tested',
      index_dip_extension_left_arom: dto.handAromProm?.indexFingerAromProm?.dipExtensionLeftArom || 'not_tested',
      index_dip_extension_left_prom: dto.handAromProm?.indexFingerAromProm?.dipExtensionLeftProm || 'not_tested',
      index_dip_flexion_right_arom: dto.handAromProm?.indexFingerAromProm?.dipFlexionRightArom || 'not_tested',
      index_dip_flexion_right_prom: dto.handAromProm?.indexFingerAromProm?.dipFlexionRightProm || 'not_tested',
      index_dip_flexion_left_arom: dto.handAromProm?.indexFingerAromProm?.dipFlexionLeftArom || 'not_tested',
      index_dip_flexion_left_prom: dto.handAromProm?.indexFingerAromProm?.dipFlexionLeftProm || 'not_tested',
      index_dip_total_motion_right_arom: dto.handAromProm?.indexFingerAromProm?.dipTotalMotionRightArom || '',
      index_dip_total_motion_right_prom: dto.handAromProm?.indexFingerAromProm?.dipTotalMotionRightProm || '',
      index_dip_total_motion_left_arom: dto.handAromProm?.indexFingerAromProm?.dipTotalMotionLeftArom || '',
      index_dip_total_motion_left_prom: dto.handAromProm?.indexFingerAromProm?.dipTotalMotionLeftProm || '',
      index_comments: dto.handAromProm?.indexFingerAromProm?.comments || '',

      middle_finger_arrom_prom: dto.handAromProm?.middleFingerAromProm?.enabled || false,
      middle_mp_adduction_right_arom: dto.handAromProm?.middleFingerAromProm?.mpAdductionRightArom || 'not_tested',
      middle_mp_adduction_right_prom: dto.handAromProm?.middleFingerAromProm?.mpAdductionRightProm || 'not_tested',
      middle_mp_adduction_left_arom: dto.handAromProm?.middleFingerAromProm?.mpAdductionLeftArom || 'not_tested',
      middle_mp_adduction_left_prom: dto.handAromProm?.middleFingerAromProm?.mpAdductionLeftProm || 'not_tested',
      middle_mp_extension_right_arom: dto.handAromProm?.middleFingerAromProm?.mpExtensionRightArom || 'not_tested',
      middle_mp_extension_right_prom: dto.handAromProm?.middleFingerAromProm?.mpExtensionRightProm || 'not_tested',
      middle_mp_extension_left_arom: dto.handAromProm?.middleFingerAromProm?.mpExtensionLeftArom || 'not_tested',
      middle_mp_extension_left_prom: dto.handAromProm?.middleFingerAromProm?.mpExtensionLeftProm || 'not_tested',
      middle_mp_flexion_right_arom: dto.handAromProm?.middleFingerAromProm?.mpFlexionRightArom || 'not_tested',
      middle_mp_flexion_right_prom: dto.handAromProm?.middleFingerAromProm?.mpFlexionRightProm || 'not_tested',
      middle_mp_flexion_left_arom: dto.handAromProm?.middleFingerAromProm?.mpFlexionLeftArom || 'not_tested',
      middle_mp_flexion_left_prom: dto.handAromProm?.middleFingerAromProm?.mpFlexionLeftProm || 'not_tested',
      middle_mp_total_motion_right_arom: dto.handAromProm?.middleFingerAromProm?.mpTotalMotionRightArom || '',
      middle_mp_total_motion_right_prom: dto.handAromProm?.middleFingerAromProm?.mpTotalMotionRightProm || '',
      middle_mp_total_motion_left_arom: dto.handAromProm?.middleFingerAromProm?.mpTotalMotionLeftArom || '',
      middle_mp_total_motion_left_prom: dto.handAromProm?.middleFingerAromProm?.mpTotalMotionLeftProm || '',
      middle_pip_extension_right_arom: dto.handAromProm?.middleFingerAromProm?.pipExtensionRightArom || 'not_tested',
      middle_pip_extension_right_prom: dto.handAromProm?.middleFingerAromProm?.pipExtensionRightProm || 'not_tested',
      middle_pip_extension_left_arom: dto.handAromProm?.middleFingerAromProm?.pipExtensionLeftArom || 'not_tested',
      middle_pip_extension_left_prom: dto.handAromProm?.middleFingerAromProm?.pipExtensionLeftProm || 'not_tested',
      middle_pip_flexion_right_arom: dto.handAromProm?.middleFingerAromProm?.pipFlexionRightArom || 'not_tested',
      middle_pip_flexion_right_prom: dto.handAromProm?.middleFingerAromProm?.pipFlexionRightProm || 'not_tested',
      middle_pip_flexion_left_arom: dto.handAromProm?.middleFingerAromProm?.pipFlexionLeftArom || 'not_tested',
      middle_pip_flexion_left_prom: dto.handAromProm?.middleFingerAromProm?.pipFlexionLeftProm || 'not_tested',
      middle_pip_total_motion_right_arom: dto.handAromProm?.middleFingerAromProm?.pipTotalMotionRightArom || '',
      middle_pip_total_motion_right_prom: dto.handAromProm?.middleFingerAromProm?.pipTotalMotionRightProm || '',
      middle_pip_total_motion_left_arom: dto.handAromProm?.middleFingerAromProm?.pipTotalMotionLeftArom || '',
      middle_pip_total_motion_left_prom: dto.handAromProm?.middleFingerAromProm?.pipTotalMotionLeftProm || '',
      middle_dip_extension_right_arom: dto.handAromProm?.middleFingerAromProm?.dipExtensionRightArom || 'not_tested',
      middle_dip_extension_right_prom: dto.handAromProm?.middleFingerAromProm?.dipExtensionRightProm || 'not_tested',
      middle_dip_extension_left_arom: dto.handAromProm?.middleFingerAromProm?.dipExtensionLeftArom || 'not_tested',
      middle_dip_extension_left_prom: dto.handAromProm?.middleFingerAromProm?.dipExtensionLeftProm || 'not_tested',
      middle_dip_flexion_right_arom: dto.handAromProm?.middleFingerAromProm?.dipFlexionRightArom || 'not_tested',
      middle_dip_flexion_right_prom: dto.handAromProm?.middleFingerAromProm?.dipFlexionRightProm || 'not_tested',
      middle_dip_flexion_left_arom: dto.handAromProm?.middleFingerAromProm?.dipFlexionLeftArom || 'not_tested',
      middle_dip_flexion_left_prom: dto.handAromProm?.middleFingerAromProm?.dipFlexionLeftProm || 'not_tested',
      middle_dip_total_motion_right_arom: dto.handAromProm?.middleFingerAromProm?.dipTotalMotionRightArom || '',
      middle_dip_total_motion_right_prom: dto.handAromProm?.middleFingerAromProm?.dipTotalMotionRightProm || '',
      middle_dip_total_motion_left_arom: dto.handAromProm?.middleFingerAromProm?.dipTotalMotionLeftArom || '',
      middle_dip_total_motion_left_prom: dto.handAromProm?.middleFingerAromProm?.dipTotalMotionLeftProm || '',
      middle_comments: dto.handAromProm?.middleFingerAromProm?.comments || '',

      ring_finger_arrom_prom: dto.handAromProm?.ringFingerAromProm?.enabled || false,
      ring_mp_adduction_right_arom: dto.handAromProm?.ringFingerAromProm?.mpAdductionRightArom || 'not_tested',
      ring_mp_adduction_right_prom: dto.handAromProm?.ringFingerAromProm?.mpAdductionRightProm || 'not_tested',
      ring_mp_adduction_left_arom: dto.handAromProm?.ringFingerAromProm?.mpAdductionLeftArom || 'not_tested',
      ring_mp_adduction_left_prom: dto.handAromProm?.ringFingerAromProm?.mpAdductionLeftProm || 'not_tested',
      ring_mp_extension_right_arom: dto.handAromProm?.ringFingerAromProm?.mpExtensionRightArom || 'not_tested',
      ring_mp_extension_right_prom: dto.handAromProm?.ringFingerAromProm?.mpExtensionRightProm || 'not_tested',
      ring_mp_extension_left_arom: dto.handAromProm?.ringFingerAromProm?.mpExtensionLeftArom || 'not_tested',
      ring_mp_extension_left_prom: dto.handAromProm?.ringFingerAromProm?.mpExtensionLeftProm || 'not_tested',
      ring_mp_flexion_right_arom: dto.handAromProm?.ringFingerAromProm?.mpFlexionRightArom || 'not_tested',
      ring_mp_flexion_right_prom: dto.handAromProm?.ringFingerAromProm?.mpFlexionRightProm || 'not_tested',
      ring_mp_flexion_left_arom: dto.handAromProm?.ringFingerAromProm?.mpFlexionLeftArom || 'not_tested',
      ring_mp_flexion_left_prom: dto.handAromProm?.ringFingerAromProm?.mpFlexionLeftProm || 'not_tested',
      ring_mp_total_motion_right_arom: dto.handAromProm?.ringFingerAromProm?.mpTotalMotionRightArom || '',
      ring_mp_total_motion_right_prom: dto.handAromProm?.ringFingerAromProm?.mpTotalMotionRightProm || '',
      ring_mp_total_motion_left_arom: dto.handAromProm?.ringFingerAromProm?.mpTotalMotionLeftArom || '',
      ring_mp_total_motion_left_prom: dto.handAromProm?.ringFingerAromProm?.mpTotalMotionLeftProm || '',
      ring_pip_extension_right_arom: dto.handAromProm?.ringFingerAromProm?.pipExtensionRightArom || 'not_tested',
      ring_pip_extension_right_prom: dto.handAromProm?.ringFingerAromProm?.pipExtensionRightProm || 'not_tested',
      ring_pip_extension_left_arom: dto.handAromProm?.ringFingerAromProm?.pipExtensionLeftArom || 'not_tested',
      ring_pip_extension_left_prom: dto.handAromProm?.ringFingerAromProm?.pipExtensionLeftProm || 'not_tested',
      ring_pip_flexion_right_arom: dto.handAromProm?.ringFingerAromProm?.pipFlexionRightArom || 'not_tested',
      ring_pip_flexion_right_prom: dto.handAromProm?.ringFingerAromProm?.pipFlexionRightProm || 'not_tested',
      ring_pip_flexion_left_arom: dto.handAromProm?.ringFingerAromProm?.pipFlexionLeftArom || 'not_tested',
      ring_pip_flexion_left_prom: dto.handAromProm?.ringFingerAromProm?.pipFlexionLeftProm || 'not_tested',
      ring_pip_total_motion_right_arom: dto.handAromProm?.ringFingerAromProm?.pipTotalMotionRightArom || '',
      ring_pip_total_motion_right_prom: dto.handAromProm?.ringFingerAromProm?.pipTotalMotionRightProm || '',
      ring_pip_total_motion_left_arom: dto.handAromProm?.ringFingerAromProm?.pipTotalMotionLeftArom || '',
      ring_pip_total_motion_left_prom: dto.handAromProm?.ringFingerAromProm?.pipTotalMotionLeftProm || '',
      ring_dip_extension_right_arom: dto.handAromProm?.ringFingerAromProm?.dipExtensionRightArom || 'not_tested',
      ring_dip_extension_right_prom: dto.handAromProm?.ringFingerAromProm?.dipExtensionRightProm || 'not_tested',
      ring_dip_extension_left_arom: dto.handAromProm?.ringFingerAromProm?.dipExtensionLeftArom || 'not_tested',
      ring_dip_extension_left_prom: dto.handAromProm?.ringFingerAromProm?.dipExtensionLeftProm || 'not_tested',
      ring_dip_flexion_right_arom: dto.handAromProm?.ringFingerAromProm?.dipFlexionRightArom || 'not_tested',
      ring_dip_flexion_right_prom: dto.handAromProm?.ringFingerAromProm?.dipFlexionRightProm || 'not_tested',
      ring_dip_flexion_left_arom: dto.handAromProm?.ringFingerAromProm?.dipFlexionLeftArom || 'not_tested',
      ring_dip_flexion_left_prom: dto.handAromProm?.ringFingerAromProm?.dipFlexionLeftProm || 'not_tested',
      ring_dip_total_motion_right_arom: dto.handAromProm?.ringFingerAromProm?.dipTotalMotionRightArom || '',
      ring_dip_total_motion_right_prom: dto.handAromProm?.ringFingerAromProm?.dipTotalMotionRightProm || '',
      ring_dip_total_motion_left_arom: dto.handAromProm?.ringFingerAromProm?.dipTotalMotionLeftArom || '',
      ring_dip_total_motion_left_prom: dto.handAromProm?.ringFingerAromProm?.dipTotalMotionLeftProm || '',
      ring_comments: dto.handAromProm?.ringFingerAromProm?.comments || '',

      small_finger_arrom_prom: dto.handAromProm?.smallFingerAromProm?.enabled || false,
      small_mp_adduction_right_arom: dto.handAromProm?.smallFingerAromProm?.mpAdductionRightArom || 'not_tested',
      small_mp_adduction_right_prom: dto.handAromProm?.smallFingerAromProm?.mpAdductionRightProm || 'not_tested',
      small_mp_adduction_left_arom: dto.handAromProm?.smallFingerAromProm?.mpAdductionLeftArom || 'not_tested',
      small_mp_adduction_left_prom: dto.handAromProm?.smallFingerAromProm?.mpAdductionLeftProm || 'not_tested',
      small_mp_extension_right_arom: dto.handAromProm?.smallFingerAromProm?.mpExtensionRightArom || 'not_tested',
      small_mp_extension_right_prom: dto.handAromProm?.smallFingerAromProm?.mpExtensionRightProm || 'not_tested',
      small_mp_extension_left_arom: dto.handAromProm?.smallFingerAromProm?.mpExtensionLeftArom || 'not_tested',
      small_mp_extension_left_prom: dto.handAromProm?.smallFingerAromProm?.mpExtensionLeftProm || 'not_tested',
      small_mp_flexion_right_arom: dto.handAromProm?.smallFingerAromProm?.mpFlexionRightArom || 'not_tested',
      small_mp_flexion_right_prom: dto.handAromProm?.smallFingerAromProm?.mpFlexionRightProm || 'not_tested',
      small_mp_flexion_left_arom: dto.handAromProm?.smallFingerAromProm?.mpFlexionLeftArom || 'not_tested',
      small_mp_flexion_left_prom: dto.handAromProm?.smallFingerAromProm?.mpFlexionLeftProm || 'not_tested',
      small_mp_total_motion_right_arom: dto.handAromProm?.smallFingerAromProm?.mpTotalMotionRightArom || '',
      small_mp_total_motion_right_prom: dto.handAromProm?.smallFingerAromProm?.mpTotalMotionRightProm || '',
      small_mp_total_motion_left_arom: dto.handAromProm?.smallFingerAromProm?.mpTotalMotionLeftArom || '',
      small_mp_total_motion_left_prom: dto.handAromProm?.smallFingerAromProm?.mpTotalMotionLeftProm || '',
      small_pip_extension_right_arom: dto.handAromProm?.smallFingerAromProm?.pipExtensionRightArom || 'not_tested',
      small_pip_extension_right_prom: dto.handAromProm?.smallFingerAromProm?.pipExtensionRightProm || 'not_tested',
      small_pip_extension_left_arom: dto.handAromProm?.smallFingerAromProm?.pipExtensionLeftArom || 'not_tested',
      small_pip_extension_left_prom: dto.handAromProm?.smallFingerAromProm?.pipExtensionLeftProm || 'not_tested',
      small_pip_flexion_right_arom: dto.handAromProm?.smallFingerAromProm?.pipFlexionRightArom || 'not_tested',
      small_pip_flexion_right_prom: dto.handAromProm?.smallFingerAromProm?.pipFlexionRightProm || 'not_tested',
      small_pip_flexion_left_arom: dto.handAromProm?.smallFingerAromProm?.pipFlexionLeftArom || 'not_tested',
      small_pip_flexion_left_prom: dto.handAromProm?.smallFingerAromProm?.pipFlexionLeftProm || 'not_tested',
      small_pip_total_motion_right_arom: dto.handAromProm?.smallFingerAromProm?.pipTotalMotionRightArom || '',
      small_pip_total_motion_right_prom: dto.handAromProm?.smallFingerAromProm?.pipTotalMotionRightProm || '',
      small_pip_total_motion_left_arom: dto.handAromProm?.smallFingerAromProm?.pipTotalMotionLeftArom || '',
      small_pip_total_motion_left_prom: dto.handAromProm?.smallFingerAromProm?.pipTotalMotionLeftProm || '',
      small_dip_extension_right_arom: dto.handAromProm?.smallFingerAromProm?.dipExtensionRightArom || 'not_tested',
      small_dip_extension_right_prom: dto.handAromProm?.smallFingerAromProm?.dipExtensionRightProm || 'not_tested',
      small_dip_extension_left_arom: dto.handAromProm?.smallFingerAromProm?.dipExtensionLeftArom || 'not_tested',
      small_dip_extension_left_prom: dto.handAromProm?.smallFingerAromProm?.dipExtensionLeftProm || 'not_tested',
      small_dip_flexion_right_arom: dto.handAromProm?.smallFingerAromProm?.dipFlexionRightArom || 'not_tested',
      small_dip_flexion_right_prom: dto.handAromProm?.smallFingerAromProm?.dipFlexionRightProm || 'not_tested',
      small_dip_flexion_left_arom: dto.handAromProm?.smallFingerAromProm?.dipFlexionLeftArom || 'not_tested',
      small_dip_flexion_left_prom: dto.handAromProm?.smallFingerAromProm?.dipFlexionLeftProm || 'not_tested',
      small_dip_total_motion_right_arom: dto.handAromProm?.smallFingerAromProm?.dipTotalMotionRightArom || '',
      small_dip_total_motion_right_prom: dto.handAromProm?.smallFingerAromProm?.dipTotalMotionRightProm || '',
      small_dip_total_motion_left_arom: dto.handAromProm?.smallFingerAromProm?.dipTotalMotionLeftArom || '',
      small_dip_total_motion_left_prom: dto.handAromProm?.smallFingerAromProm?.dipTotalMotionLeftProm || '',
      small_comments: dto.handAromProm?.smallFingerAromProm?.comments || ''
    };
  }

  private fromDtoThoracicAromSittingWithPassiveOverpressure(dto: RangeOfMotionModel): any {
    return {
      // Thoracic AROM Sitting with Passive Overpressure
      thoracic_arrom_sitting_with_passive_overpressure: dto.thoracicAromSittingWithPassiveOverpressure?.enabled ? 'yes' : 'no',
      thoracic_arrom_sitting_apply_to_all: '',
      thoracic_arrom_sitting_forward_bending: dto.thoracicAromSittingWithPassiveOverpressure?.forwardBending || 'not_tested',
      thoracic_arrom_sitting_backward_bending: dto.thoracicAromSittingWithPassiveOverpressure?.backwardBending || 'not_tested',
      thoracic_arrom_sitting_right_rotation: dto.thoracicAromSittingWithPassiveOverpressure?.rightRotation || 'not_tested',
      thoracic_arrom_sitting_left_rotation: dto.thoracicAromSittingWithPassiveOverpressure?.leftRotation || 'not_tested',
      thoracic_arrom_sitting_right_side_bending: dto.thoracicAromSittingWithPassiveOverpressure?.rightSideBending || 'not_tested',
      thoracic_arrom_sitting_left_side_bending: dto.thoracicAromSittingWithPassiveOverpressure?.leftSideBending || 'not_tested'
    };
  }

  private fromDtoThoracicAROMStanding(dto: RangeOfMotionModel): any {
    return {
      //Thoracic AROM Standing
      thoracic_arrom_standing: dto.thoracicAROMStandingModel?.enabled ? 'yes' : 'no',
      thoracic_arrom_standing_forward_bending: dto.thoracicAROMStandingModel?.forwardBending || 'not_tested',
      thoracic_arrom_standing_backward_bending: dto.thoracicAROMStandingModel?.backwardBending || 'not_tested',
      thoracic_arrom_standing_right_rotation: dto.thoracicAROMStandingModel?.rightRotation || 'not_tested',
      thoracic_arrom_standing_left_rotation: dto.thoracicAROMStandingModel?.leftRotation || 'not_tested',
      thoracic_arrom_standing_right_side_bending: dto.thoracicAROMStandingModel?.rightSideBending || 'not_tested',
      thoracic_arrom_standing_left_side_bending: dto.thoracicAROMStandingModel?.leftSideBending || 'not_tested'
    };
  }

  private fromDtoLumbarAROM(dto: RangeOfMotionModel): any {
    const result = fromDtoSingleColumnSection(
      dto.lumbarAROMModel,
      LumbarAROMConfig.lumbarArom,
      'lumbar_arrom'
    );
    // Lumbar AROM stores applyToAll in the model
    result.lumbar_arrom_apply_to_all = dto.lumbarAROMModel?.lumbarArromApplyToAll || '';
    return result;
  }

  private fromDtoHipArom(dto: RangeOfMotionModel): any {
    // Using generic mapper with config - no manual field mapping!
    return fromDtoMeasurementSection(
      dto.hipArom,
      HipAromConfig.hipArom,
      'hip_arrom'
    );
  }

  private fromDtoHipProm(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementEndfeelSection(
      dto.hipProm,
      HipPROM.hipProm,
      'hip_prom'
    );
  }

  private fromDtoKneeArom(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementSection(
      dto.kneeArom,
      KneeAROM.kneeArom,
      'knee_arrom'
    );
  }

  private fromDtoAnkleArom(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementSection(
      dto.ankleArom,
      AnkleAROM.ankleArom,
      'ankle_arrom'
    );
  }

  private fromDtoAnkleProm(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementEndfeelSection(
      dto.ankleProm,
      AnklePROM.ankleProm,
      'ankle_prom'
    );
  }

  private fromDtoFirstMtpArom(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementSection(
      dto.firstMtpArom,
      FstMTPArom.fstMTPArom,
      'fst_mtp_arrom'
    );
  }

  private fromDtoFirstIpArom(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementSection(
      dto.firstIpArom,
      FstIPAROM.fstipArom,
      'fst_ip_arrom'
    );
  }

  private fromDtoToeArom(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementSection(
      dto.toeArom,
      ToeAROM.toeArom,
      'toe_arrom'
    );
  }

  private fromDtoToeProm(dto: RangeOfMotionModel): any {
    return fromDtoMeasurementEndfeelSection(
      dto.toeProm,
      ToePROM.toeProm,
      'toe_prom'
    );
  }

  private mapNoLimitationsNoted(formValue: any): NoLimitationsNotedModel {
    const enabled = formValue.no_limitations_noted === 'no';
    const model: NoLimitationsNotedModel = { enabled };

    if (enabled) {
      model.arom = formValue.arom || false;

      if (formValue.prom) {
        model.prom = {
          enabled: formValue.prom,
          cervical: formValue.prom_cervical || false,
          thoracic: formValue.prom_thoracic || false,
          shoulder: formValue.prom_shoulder || false,
          elbow: formValue.prom_elbow || false,
          wrist: formValue.prom_wrist || false,
          hand: formValue.prom_hand || false,
          lumbar: formValue.prom_lumbar || false,
          hip: formValue.prom_hip || false,
          knee: formValue.prom_knee || false,
          ankle: formValue.prom_ankle || false,
          feet: formValue.prom_feet || false,
          comments: formValue.prom_comments || ''
        };
      }
    }

    return model;
  }

  private mapCervicalArom(formValue: any): CervicalAROMModel {
    // Using generic mapper with config - no manual field mapping!
    return mapSingleColumnSection(
      formValue,
      CervicalAROMConfig.cervicalArom,
      'cervical_arrom'
    ) as CervicalAROMModel;
  }

  private mapCostovertebralExpansion(formValue: any): CostovertebralExpansionModel {
    return mapSingleColumnSection(
      formValue,
      CostovertebralExpansionConfig.costovertebralExpansion,
      'costovertebral_expansion'
    ) as CostovertebralExpansionModel;
  }

  private mapShoulderArom(formValue: any): ShoulderAROMModel {
    return mapMeasurementSection(
      formValue,
      ShoulderAROM.shoulderArom,
      'shoulder_arrom'
    ) as ShoulderAROMModel;
  }

  private mapShoulderProm(formValue: any): ShoulderPROMModel {
    return mapMeasurementEndfeelSection(
      formValue,
      ShoulderPROM.shoulderProm,
      'shoulder_prom'
    ) as ShoulderPROMModel;
  }

  private mapElbowArom(formValue: any): ElbowAROMModel {
    return mapMeasurementSection(
      formValue,
      ElbowAROM.elbowArom,
      'elbow_arrom'
    ) as ElbowAROMModel;
  }

  private mapElbowProm(formValue: any): ElbowPROMModel {
    return mapMeasurementEndfeelSection(
      formValue,
      ElbowPROM.elbowProm,
      'elbow_prom'
    ) as ElbowPROMModel;
  }

  private mapWristArom(formValue: any): WristAROMModel {
    return mapMeasurementSection(
      formValue,
      WristAROM.wristArom,
      'wrist_arrom'
    ) as WristAROMModel;
  }

  private mapWristProm(formValue: any): WristPROMModel {
    return mapMeasurementEndfeelSection(
      formValue,
      WristPROM.wristProm,
      'wrist_prom'
    ) as WristPROMModel;
  }

  private mapHandAromProm(formValue: any): HandAromPromModel {
    const enabled = formValue.hand_arrom_prom === 'yes';
    const model: HandAromPromModel = { enabled };

    if (enabled) {
      model.calculateTotalRom = formValue.calculate_total_rom || false;
      model.thumbAromProm = this.mapThumbAromProm(formValue);
      model.indexFingerAromProm = this.mapIndexFingerAromProm(formValue);
      model.middleFingerAromProm = this.mapMiddleFingerAromProm(formValue);
      model.ringFingerAromProm = this.mapRingFingerAromProm(formValue);
      model.smallFingerAromProm = this.mapSmallFingerAromProm(formValue);
    }

    return model;
  }

  private mapThumbAromProm(formValue: any): ThumbAromPromModel {
    const enabled = formValue.thumb_arrom_prom === true;
    const model: ThumbAromPromModel = { enabled };

    if (enabled) {
      model.cmcPalmarAbductionRightArom = formValue.thumb_cmc_palmar_abduction_right_arom || 'not_tested';
      model.cmcPalmarAbductionRightProm = formValue.thumb_cmc_palmar_abduction_right_prom || 'not_tested';
      model.cmcPalmarAbductionLeftArom = formValue.thumb_cmc_palmar_abduction_left_arom || 'not_tested';
      model.cmcPalmarAbductionLeftProm = formValue.thumb_cmc_palmar_abduction_left_prom || 'not_tested';
      model.cmcRadialAbductionRightArom = formValue.thumb_cmc_radial_abduction_right_arom || 'not_tested';
      model.cmcRadialAbductionRightProm = formValue.thumb_cmc_radial_abduction_right_prom || 'not_tested';
      model.cmcRadialAbductionLeftArom = formValue.thumb_cmc_radial_abduction_left_arom || 'not_tested';
      model.cmcRadialAbductionLeftProm = formValue.thumb_cmc_radial_abduction_left_prom || 'not_tested';
      model.cmcAdductionRightArom = formValue.thumb_cmc_adduction_right_arom || 'not_tested';
      model.cmcAdductionRightProm = formValue.thumb_cmc_adduction_right_prom || 'not_tested';
      model.cmcAdductionLeftArom = formValue.thumb_cmc_adduction_left_arom || 'not_tested';
      model.cmcAdductionLeftProm = formValue.thumb_cmc_adduction_left_prom || 'not_tested';
      model.cmcExtensionRightArom = formValue.thumb_cmc_extension_right_arom || 'not_tested';
      model.cmcExtensionRightProm = formValue.thumb_cmc_extension_right_prom || 'not_tested';
      model.cmcExtensionLeftArom = formValue.thumb_cmc_extension_left_arom || 'not_tested';
      model.cmcExtensionLeftProm = formValue.thumb_cmc_extension_left_prom || 'not_tested';
      model.cmcFlexionRightArom = formValue.thumb_cmc_flexion_right_arom || 'not_tested';
      model.cmcFlexionRightProm = formValue.thumb_cmc_flexion_right_prom || 'not_tested';
      model.cmcFlexionLeftArom = formValue.thumb_cmc_flexion_left_arom || 'not_tested';
      model.cmcFlexionLeftProm = formValue.thumb_cmc_flexion_left_prom || 'not_tested';
      model.cmcTotalMotionRightArom = formValue.thumb_cmc_total_motion_right_arom || '';
      model.cmcTotalMotionRightProm = formValue.thumb_cmc_total_motion_right_prom || '';
      model.cmcTotalMotionLeftArom = formValue.thumb_cmc_total_motion_left_arom || '';
      model.cmcTotalMotionLeftProm = formValue.thumb_cmc_total_motion_left_prom || '';
      model.mpExtensionRightArom = formValue.thumb_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.thumb_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.thumb_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.thumb_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.thumb_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.thumb_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.thumb_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.thumb_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.thumb_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.thumb_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.thumb_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.thumb_mp_total_motion_left_prom || '';
      model.ipExtensionRightArom = formValue.thumb_ip_extension_right_arom || 'not_tested';
      model.ipExtensionRightProm = formValue.thumb_ip_extension_right_prom || 'not_tested';
      model.ipExtensionLeftArom = formValue.thumb_ip_extension_left_arom || 'not_tested';
      model.ipExtensionLeftProm = formValue.thumb_ip_extension_left_prom || 'not_tested';
      model.ipFlexionRightArom = formValue.thumb_ip_flexion_right_arom || 'not_tested';
      model.ipFlexionRightProm = formValue.thumb_ip_flexion_right_prom || 'not_tested';
      model.ipFlexionLeftArom = formValue.thumb_ip_flexion_left_arom || 'not_tested';
      model.ipFlexionLeftProm = formValue.thumb_ip_flexion_left_prom || 'not_tested';
      model.ipTotalMotionRightArom = formValue.thumb_ip_total_motion_right_arom || '';
      model.ipTotalMotionRightProm = formValue.thumb_ip_total_motion_right_prom || '';
      model.ipTotalMotionLeftArom = formValue.thumb_ip_total_motion_left_arom || '';
      model.ipTotalMotionLeftProm = formValue.thumb_ip_total_motion_left_prom || '';
      model.comments = formValue.thumb_comments || '';
    }

    return model;
  }

  private mapIndexFingerAromProm(formValue: any): IndexFingerAromPromModel {
    const enabled = formValue.index_finger_arrom_prom === true;
    const model: IndexFingerAromPromModel = { enabled };

    if (enabled) {
      model.mpAdductionRightArom = formValue.index_mp_adduction_right_arom || 'not_tested';
      model.mpAdductionRightProm = formValue.index_mp_adduction_right_prom || 'not_tested';
      model.mpAdductionLeftArom = formValue.index_mp_adduction_left_arom || 'not_tested';
      model.mpAdductionLeftProm = formValue.index_mp_adduction_left_prom || 'not_tested';
      model.mpExtensionRightArom = formValue.index_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.index_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.index_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.index_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.index_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.index_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.index_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.index_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.index_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.index_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.index_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.index_mp_total_motion_left_prom || '';
      model.pipExtensionRightArom = formValue.index_pip_extension_right_arom || 'not_tested';
      model.pipExtensionRightProm = formValue.index_pip_extension_right_prom || 'not_tested';
      model.pipExtensionLeftArom = formValue.index_pip_extension_left_arom || 'not_tested';
      model.pipExtensionLeftProm = formValue.index_pip_extension_left_prom || 'not_tested';
      model.pipFlexionRightArom = formValue.index_pip_flexion_right_arom || 'not_tested';
      model.pipFlexionRightProm = formValue.index_pip_flexion_right_prom || 'not_tested';
      model.pipFlexionLeftArom = formValue.index_pip_flexion_left_arom || 'not_tested';
      model.pipFlexionLeftProm = formValue.index_pip_flexion_left_prom || 'not_tested';
      model.pipTotalMotionRightArom = formValue.index_pip_total_motion_right_arom || '';
      model.pipTotalMotionRightProm = formValue.index_pip_total_motion_right_prom || '';
      model.pipTotalMotionLeftArom = formValue.index_pip_total_motion_left_arom || '';
      model.pipTotalMotionLeftProm = formValue.index_pip_total_motion_left_prom || '';
      model.dipExtensionRightArom = formValue.index_dip_extension_right_arom || 'not_tested';
      model.dipExtensionRightProm = formValue.index_dip_extension_right_prom || 'not_tested';
      model.dipExtensionLeftArom = formValue.index_dip_extension_left_arom || 'not_tested';
      model.dipExtensionLeftProm = formValue.index_dip_extension_left_prom || 'not_tested';
      model.dipFlexionRightArom = formValue.index_dip_flexion_right_arom || 'not_tested';
      model.dipFlexionRightProm = formValue.index_dip_flexion_right_prom || 'not_tested';
      model.dipFlexionLeftArom = formValue.index_dip_flexion_left_arom || 'not_tested';
      model.dipFlexionLeftProm = formValue.index_dip_flexion_left_prom || 'not_tested';
      model.dipTotalMotionRightArom = formValue.index_dip_total_motion_right_arom || '';
      model.dipTotalMotionRightProm = formValue.index_dip_total_motion_right_prom || '';
      model.dipTotalMotionLeftArom = formValue.index_dip_total_motion_left_arom || '';
      model.dipTotalMotionLeftProm = formValue.index_dip_total_motion_left_prom || '';
      model.comments = formValue.index_comments || '';
    }

    return model;
  }

  private mapMiddleFingerAromProm(formValue: any): MiddleFingerAromPromModel {
    const enabled = formValue.middle_finger_arrom_prom === true;
    const model: MiddleFingerAromPromModel = { enabled };

    if (enabled) {
      model.mpAdductionRightArom = formValue.middle_mp_adduction_right_arom || 'not_tested';
      model.mpAdductionRightProm = formValue.middle_mp_adduction_right_prom || 'not_tested';
      model.mpAdductionLeftArom = formValue.middle_mp_adduction_left_arom || 'not_tested';
      model.mpAdductionLeftProm = formValue.middle_mp_adduction_left_prom || 'not_tested';
      model.mpExtensionRightArom = formValue.middle_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.middle_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.middle_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.middle_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.middle_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.middle_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.middle_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.middle_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.middle_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.middle_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.middle_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.middle_mp_total_motion_left_prom || '';
      model.pipExtensionRightArom = formValue.middle_pip_extension_right_arom || 'not_tested';
      model.pipExtensionRightProm = formValue.middle_pip_extension_right_prom || 'not_tested';
      model.pipExtensionLeftArom = formValue.middle_pip_extension_left_arom || 'not_tested';
      model.pipExtensionLeftProm = formValue.middle_pip_extension_left_prom || 'not_tested';
      model.pipFlexionRightArom = formValue.middle_pip_flexion_right_arom || 'not_tested';
      model.pipFlexionRightProm = formValue.middle_pip_flexion_right_prom || 'not_tested';
      model.pipFlexionLeftArom = formValue.middle_pip_flexion_left_arom || 'not_tested';
      model.pipFlexionLeftProm = formValue.middle_pip_flexion_left_prom || 'not_tested';
      model.pipTotalMotionRightArom = formValue.middle_pip_total_motion_right_arom || '';
      model.pipTotalMotionRightProm = formValue.middle_pip_total_motion_right_prom || '';
      model.pipTotalMotionLeftArom = formValue.middle_pip_total_motion_left_arom || '';
      model.pipTotalMotionLeftProm = formValue.middle_pip_total_motion_left_prom || '';
      model.dipExtensionRightArom = formValue.middle_dip_extension_right_arom || 'not_tested';
      model.dipExtensionRightProm = formValue.middle_dip_extension_right_prom || 'not_tested';
      model.dipExtensionLeftArom = formValue.middle_dip_extension_left_arom || 'not_tested';
      model.dipExtensionLeftProm = formValue.middle_dip_extension_left_prom || 'not_tested';
      model.dipFlexionRightArom = formValue.middle_dip_flexion_right_arom || 'not_tested';
      model.dipFlexionRightProm = formValue.middle_dip_flexion_right_prom || 'not_tested';
      model.dipFlexionLeftArom = formValue.middle_dip_flexion_left_arom || 'not_tested';
      model.dipFlexionLeftProm = formValue.middle_dip_flexion_left_prom || 'not_tested';
      model.dipTotalMotionRightArom = formValue.middle_dip_total_motion_right_arom || '';
      model.dipTotalMotionRightProm = formValue.middle_dip_total_motion_right_prom || '';
      model.dipTotalMotionLeftArom = formValue.middle_dip_total_motion_left_arom || '';
      model.dipTotalMotionLeftProm = formValue.middle_dip_total_motion_left_prom || '';
      model.comments = formValue.middle_comments || '';
    }

    return model;
  }

  private mapRingFingerAromProm(formValue: any): RingFingerAromPromModel {
    const enabled = formValue.ring_finger_arrom_prom === true;
    const model: RingFingerAromPromModel = { enabled };

    if (enabled) {
      model.mpAdductionRightArom = formValue.ring_mp_adduction_right_arom || 'not_tested';
      model.mpAdductionRightProm = formValue.ring_mp_adduction_right_prom || 'not_tested';
      model.mpAdductionLeftArom = formValue.ring_mp_adduction_left_arom || 'not_tested';
      model.mpAdductionLeftProm = formValue.ring_mp_adduction_left_prom || 'not_tested';
      model.mpExtensionRightArom = formValue.ring_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.ring_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.ring_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.ring_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.ring_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.ring_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.ring_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.ring_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.ring_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.ring_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.ring_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.ring_mp_total_motion_left_prom || '';
      model.pipExtensionRightArom = formValue.ring_pip_extension_right_arom || 'not_tested';
      model.pipExtensionRightProm = formValue.ring_pip_extension_right_prom || 'not_tested';
      model.pipExtensionLeftArom = formValue.ring_pip_extension_left_arom || 'not_tested';
      model.pipExtensionLeftProm = formValue.ring_pip_extension_left_prom || 'not_tested';
      model.pipFlexionRightArom = formValue.ring_pip_flexion_right_arom || 'not_tested';
      model.pipFlexionRightProm = formValue.ring_pip_flexion_right_prom || 'not_tested';
      model.pipFlexionLeftArom = formValue.ring_pip_flexion_left_arom || 'not_tested';
      model.pipFlexionLeftProm = formValue.ring_pip_flexion_left_prom || 'not_tested';
      model.pipTotalMotionRightArom = formValue.ring_pip_total_motion_right_arom || '';
      model.pipTotalMotionRightProm = formValue.ring_pip_total_motion_right_prom || '';
      model.pipTotalMotionLeftArom = formValue.ring_pip_total_motion_left_arom || '';
      model.pipTotalMotionLeftProm = formValue.ring_pip_total_motion_left_prom || '';
      model.dipExtensionRightArom = formValue.ring_dip_extension_right_arom || 'not_tested';
      model.dipExtensionRightProm = formValue.ring_dip_extension_right_prom || 'not_tested';
      model.dipExtensionLeftArom = formValue.ring_dip_extension_left_arom || 'not_tested';
      model.dipExtensionLeftProm = formValue.ring_dip_extension_left_prom || 'not_tested';
      model.dipFlexionRightArom = formValue.ring_dip_flexion_right_arom || 'not_tested';
      model.dipFlexionRightProm = formValue.ring_dip_flexion_right_prom || 'not_tested';
      model.dipFlexionLeftArom = formValue.ring_dip_flexion_left_arom || 'not_tested';
      model.dipFlexionLeftProm = formValue.ring_dip_flexion_left_prom || 'not_tested';
      model.dipTotalMotionRightArom = formValue.ring_dip_total_motion_right_arom || '';
      model.dipTotalMotionRightProm = formValue.ring_dip_total_motion_right_prom || '';
      model.dipTotalMotionLeftArom = formValue.ring_dip_total_motion_left_arom || '';
      model.dipTotalMotionLeftProm = formValue.ring_dip_total_motion_left_prom || '';
      model.comments = formValue.ring_comments || '';
    }

    return model;
  }

  private mapSmallFingerAromProm(formValue: any): SmallFingerAromPromModel {
    const enabled = formValue.small_finger_arrom_prom === true;
    const model: SmallFingerAromPromModel = { enabled };

    if (enabled) {
      model.mpAdductionRightArom = formValue.small_mp_adduction_right_arom || 'not_tested';
      model.mpAdductionRightProm = formValue.small_mp_adduction_right_prom || 'not_tested';
      model.mpAdductionLeftArom = formValue.small_mp_adduction_left_arom || 'not_tested';
      model.mpAdductionLeftProm = formValue.small_mp_adduction_left_prom || 'not_tested';
      model.mpExtensionRightArom = formValue.small_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.small_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.small_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.small_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.small_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.small_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.small_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.small_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.small_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.small_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.small_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.small_mp_total_motion_left_prom || '';
      model.pipExtensionRightArom = formValue.small_pip_extension_right_arom || 'not_tested';
      model.pipExtensionRightProm = formValue.small_pip_extension_right_prom || 'not_tested';
      model.pipExtensionLeftArom = formValue.small_pip_extension_left_arom || 'not_tested';
      model.pipExtensionLeftProm = formValue.small_pip_extension_left_prom || 'not_tested';
      model.pipFlexionRightArom = formValue.small_pip_flexion_right_arom || 'not_tested';
      model.pipFlexionRightProm = formValue.small_pip_flexion_right_prom || 'not_tested';
      model.pipFlexionLeftArom = formValue.small_pip_flexion_left_arom || 'not_tested';
      model.pipFlexionLeftProm = formValue.small_pip_flexion_left_prom || 'not_tested';
      model.pipTotalMotionRightArom = formValue.small_pip_total_motion_right_arom || '';
      model.pipTotalMotionRightProm = formValue.small_pip_total_motion_right_prom || '';
      model.pipTotalMotionLeftArom = formValue.small_pip_total_motion_left_arom || '';
      model.pipTotalMotionLeftProm = formValue.small_pip_total_motion_left_prom || '';
      model.dipExtensionRightArom = formValue.small_dip_extension_right_arom || 'not_tested';
      model.dipExtensionRightProm = formValue.small_dip_extension_right_prom || 'not_tested';
      model.dipExtensionLeftArom = formValue.small_dip_extension_left_arom || 'not_tested';
      model.dipExtensionLeftProm = formValue.small_dip_extension_left_prom || 'not_tested';
      model.dipFlexionRightArom = formValue.small_dip_flexion_right_arom || 'not_tested';
      model.dipFlexionRightProm = formValue.small_dip_flexion_right_prom || 'not_tested';
      model.dipFlexionLeftArom = formValue.small_dip_flexion_left_arom || 'not_tested';
      model.dipFlexionLeftProm = formValue.small_dip_flexion_left_prom || 'not_tested';
      model.dipTotalMotionRightArom = formValue.small_dip_total_motion_right_arom || '';
      model.dipTotalMotionRightProm = formValue.small_dip_total_motion_right_prom || '';
      model.dipTotalMotionLeftArom = formValue.small_dip_total_motion_left_arom || '';
      model.dipTotalMotionLeftProm = formValue.small_dip_total_motion_left_prom || '';
      model.comments = formValue.small_comments || '';
    }

    return model;
  }

  private mapThoracicAromSittingWithPassiveOverpressure(formValue: any): ThoracicAromSittingWithPassiveOverpressureModel {
    const enabled = formValue.thoracic_arrom_sitting_with_passive_overpressure === 'yes';
    const model: ThoracicAromSittingWithPassiveOverpressureModel = { enabled };

    if (enabled) {
      model.forwardBending = formValue.thoracic_arrom_sitting_forward_bending || 'not_tested';
      model.backwardBending = formValue.thoracic_arrom_sitting_backward_bending || 'not_tested';
      model.rightRotation = formValue.thoracic_arrom_sitting_right_rotation || 'not_tested';
      model.leftRotation = formValue.thoracic_arrom_sitting_left_rotation || 'not_tested';
      model.rightSideBending = formValue.thoracic_arrom_sitting_right_side_bending || 'not_tested';
      model.leftSideBending = formValue.thoracic_arrom_sitting_left_side_bending || 'not_tested';
    }

    return model;
  }

  // map ThoracicAROMStanding
  private mapThoracicAROMStanding(formValue: any): ThoracicAROMStandingModel {
    const enabled = formValue.thoracic_arrom_standing === 'yes';

    const model: ThoracicAROMStandingModel = { enabled };

    if (enabled) {
      model.forwardBending =
        formValue.thoracic_arrom_standing_forward_bending || 'not_tested';

      model.backwardBending =
        formValue.thoracic_arrom_standing_backward_bending || 'not_tested';

      model.rightRotation =
        formValue.thoracic_arrom_standing_right_rotation || 'not_tested';

      model.leftRotation =
        formValue.thoracic_arrom_standing_left_rotation || 'not_tested';

      model.rightSideBending =
        formValue.thoracic_arrom_standing_right_side_bending || 'not_tested';

      model.leftSideBending =
        formValue.thoracic_arrom_standing_left_side_bending || 'not_tested';
    }
    return model;
  }

  //map Lumbar AROM
  private mapLumbarAROM(formValue: any): LumbarAROMModel {
    // Using generic mapper with config - no manual field mapping!
    const model = mapSingleColumnSection(
      formValue,
      LumbarAROMConfig.lumbarArom,
      'lumbar_arrom'
    ) as LumbarAROMModel;

    // Lumbar AROM stores applyToAll in the model (unlike other sections)
    model.lumbarArromApplyToAll = formValue.lumbar_arrom_apply_to_all || '';

    return model;
  }

  private mapHipArom(formValue: any): HipAROMModel {
    // Using generic mapper with config - no manual field mapping!
    return mapMeasurementSection(
      formValue,
      HipAromConfig.hipArom,
      'hip_arrom'
    ) as HipAROMModel;
  }

  private mapHipPROM(formValue: any): HipPROMModel {
    return mapMeasurementEndfeelSection(
      formValue,
      HipPROM.hipProm,
      'hip_prom'
    ) as HipPROMModel;
  }

  private mapKneeArom(formValue: any): KneeAROMModel {
    return mapMeasurementSection(
      formValue,
      KneeAROM.kneeArom,
      'knee_arrom'
    ) as KneeAROMModel;
  }

  private mapAnkleArom(formValue: any): AnkleAROMModel {
    return mapMeasurementSection(
      formValue,
      AnkleAROM.ankleArom,
      'ankle_arrom'
    ) as AnkleAROMModel;
  }

  private mapAnkleProm(formValue: any): AnklePROMModel {
    return mapMeasurementEndfeelSection(
      formValue,
      AnklePROM.ankleProm,
      'ankle_prom'
    ) as AnklePROMModel;
  }

  private mapFirstMtpArom(formValue: any): FirstMtpAROMModel {
    return mapMeasurementSection(
      formValue,
      FstMTPArom.fstMTPArom,
      'fst_mtp_arrom'
    ) as FirstMtpAROMModel;
  }

  private mapFirstIpArom(formValue: any): FirstIpAROMModel {
    return mapMeasurementSection(
      formValue,
      FstIPAROM.fstipArom,
      'fst_ip_arrom'
    ) as FirstIpAROMModel;
  }

  private mapToeArom(formValue: any): ToeAROMModel {
    return mapMeasurementSection(
      formValue,
      ToeAROM.toeArom,
      'toe_arrom'
    ) as ToeAROMModel;
  }

  private mapToeProm(formValue: any): ToePROMModel {
    return mapMeasurementEndfeelSection(
      formValue,
      ToePROM.toeProm,
      'toe_prom'
    ) as ToePROMModel;
  }

}
