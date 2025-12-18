import { RomSectionConfig, RomSectionEndfeelConfig } from './rom-types';
import { ROM_TEST_OPTIONS, ENDFEEL_OPTIONS } from './rom-options';

export class LowerExtremityConfig {
  static readonly kneeArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'knee_',
    applyToAllFieldName: 'knee_apply_to_all',
    commentsFieldName: 'knee_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly ankleArom: RomSectionConfig = {
    labels: ['Dorsiflexion', 'Plantarflexion', 'Inversion', 'Eversion'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'ankle_',
    applyToAllFieldName: 'ankle_apply_to_all',
    commentsFieldName: 'ankle_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly ankleProm: RomSectionConfig = {
    labels: ['Dorsiflexion', 'Plantarflexion', 'Inversion', 'Eversion'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'ankle_prom_',
    applyToAllFieldName: 'ankle_prom_apply_to_all',
    commentsFieldName: 'ankle_prom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly firstMtpArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'fst_mtp_',
    applyToAllFieldName: 'fst_mtp_apply_to_all',
    commentsFieldName: 'fst_mtp_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly firstIpArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'fst_ip_',
    applyToAllFieldName: 'fst_ip_apply_to_all',
    commentsFieldName: 'fst_ip_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly toeArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'toe_',
    applyToAllFieldName: 'toe_apply_to_all',
    commentsFieldName: 'toe_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly toeProm: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ROM_TEST_OPTIONS,
    fieldPrefix: 'toe_prom_',
    applyToAllFieldName: 'toe_prom_apply_to_all',
    commentsFieldName: 'toe_prom_comments',
    showApplyToAll: true,
    showComments: true
  };

  static readonly hipProm: RomSectionEndfeelConfig = {
    labels: ['Flexion', 'Extension', 'Abduction', 'Adduction', 'Internal Rotation', 'External Rotation'],
    measurementOptions: ROM_TEST_OPTIONS,
    endfeelOptions: ENDFEEL_OPTIONS,
    fieldPrefix: 'hip_prom_',
    applyToAllFieldName: 'hip_prom_apply_to_all',
    commentsFieldName: 'hip_prom_comments',
    showApplyToAll: true,
    showComments: true
  };
}
