import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NeuroVascularConfig } from './config';
import { NeuroVascular } from './models/NeuroVascular';
import { NeuroVascularMapperService } from './services/neuro-vascular-mapper.service';

@Component({
  selector: 'neuro-vascular-n',
  templateUrl: './neuro-vascular-n.component.html',
  styleUrls: ['./neuro-vascular-n.component.css']
})
export class NeuroVascularNComponent implements OnInit {
  neuroVascularForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  readonly neuroVascularConfig = NeuroVascularConfig
  @Input() neuroVascularData?: NeuroVascular;
  formData: any = {}; 

  showComplaintsOfAnyRadicularSymptomsInEitherExtremityFields: boolean = false;
  showExtremityReflexesFields: boolean = false;
  showSensoryOrVascularDeficitsFields: boolean = false;
  showCranialNerveScreenFields: boolean = false;
  showMyotomesUpperFields: boolean = false;
  showMyotomesLowerFields: boolean = false;
  showDermatomesUpperFields: boolean = false;
  showDermatomesLowerFields: boolean = false;
  showUpperReflexesFields: boolean = false;
  showLowerReflexesFields: boolean = false;
  showNeuralTissueTensionUpperFields: boolean = false;
  showNeuralTissueTensionLowerFields: boolean = false;
  showVascularFields: boolean = false;
  showVertebralArteryFields: boolean = false;
  showAllenSTestCirculationFields: boolean = false;
  showCapillaryRefillFields: boolean = false;
  showHomanSSignFields: boolean = false;
  showThoracicOutletFields: boolean = false;
  showLasegueSSlrFields: boolean = false;
  showSlumpFields: boolean = false;
  showQuadrantTestingFields: boolean = false;
  showProneKneeBendNachlasFields: boolean = false;
  showKernigBrudzinskiTestFields: boolean = false;
  showCramTestFields: boolean = false;
  showSeatedDuralStretchFields: boolean = false;

  showSemmesWeinsteinLowerFields: boolean = false;
  showSemmesWeinsteinLowerFstToeFields: boolean = false;
  showSemmesWeinsteinLowerSndToeFields: boolean = false;
  showSemmesWeinsteinLowerThirdToeFields: boolean = false;
  showSemmesWeinsteinLowerFourthToeFields: boolean = false;
  showSemmesWeinsteinLowerFifthToeFields: boolean = false;
  showSemmesWeinsteinLowerPlantarSurfaceFields: boolean = false;
  showSemmesWeinsteinLowerDorsalSurfaceFields: boolean = false;

  showSemmesWeinsteinUpperFields: boolean = false;
  showSemmesWeinsteinUpperThumbFields: boolean = false;
  showSemmesWeinsteinUpperIndexFingerFields: boolean = false;
  showSemmesWeinsteinUpperMiddleFingerFields: boolean = false;
  showSemmesWeinsteinUpperRingFingerFields: boolean = false;
  showSemmesWeinsteinUpperSmallFingerFields: boolean = false;

  showTinelSLowerFields: boolean = false;
  showTinelSUpperFields: boolean = false;
  showTransverseLigamentStabilityFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;


  constructor(private fb: FormBuilder,
    private neuroVascularMapperService : NeuroVascularMapperService) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    if (this.neuroVascularData) {
      this.formData = this.neuroVascularMapperService.fromDto(this.neuroVascularData);
      this.neuroVascularForm.patchValue(this.formData); // Single patch - child components will use formData
    }
    this.formReady.emit(this.neuroVascularForm);
  }
  initForm() {
    this.neuroVascularForm = this.fb.group({
      complaints_of_any_radicular_symptoms_in_either_extremity: ['no'],
      complaints_radicular_input: [''],
      extremity_reflexes_equal_normal_bilateral: ['no'],
      extremity_reflexes_equal_normal_bilateral_text: [''],
      sensory_or_vascular_deficits_noted: ['no'],
      sensory_or_vascular_deficits_noted_text: [''],
      cranial_nerve_screen: ['no'],
      myotomes_upper: ['no'],
      myotomes_lower: ['no'],
      dermatomes_upper: ['no'],
      dermatomes_lower: ['no'],
      upper_reflexes: ['no'],
      lower_reflexes: ['no'],
      neural_tissue_tension_upper: ['no'],
      neural_tissue_tension_lower: ['no'],
      vascular: ['no'],
      vertebral_artery: ['no'],
      allen_s_test_circulation: ['no'],
      capillary_refill: ['no'],
      homan_s_sign: ['no'],
      thoracic_outlet: ['no'],
      lasegue_s_slr: ['no'],
      slump: ['no'],
      quadrant_testing: ['no'],
      prone_knee_bend_nachlas: ['no'],
      kernig_brudzinski_test: ['no'],
      cram_test: ['no'],
      seated_dural_stretch: ['no'],

      semmes_weinstein_lower: ['no'],
      fst_toe_semmes_weinstein_lower: ['no'],
      snd_toe_semmes_weinstein_lower: ['no'],
      thrd_toe_semmes_weinstein_lower: ['no'],
      frth_toe_semmes_weinstein_lower: ['no'],
      fifth_toe_semmes_weinstein_lower: ['no'],
      plantar_surface_semmes_weinstein_lower: ['no'],
      dorsal_surface_semmes_weinstein_lower: ['no'],


      semmes_weinstein_upper: ['no'],
      thumb_semmes_weinstein_upper: ['no'],
      index_finger_semmes_weinstein_upper: ['no'],
      middle_finger_semmes_weinstein_upper: ['no'],
      ring_finger_semmes_weinstein_upper: ['no'],
      small_finger_semmes_weinstein_upper: ['no'],

      tinel_s_lower: ['no'],
      tinel_s_upper: ['no'],
      transverse_ligament_stability: ['no'],
      additional_comments: ['no'],
      additional_comments_text: ['']
    })
  }
  setupValueChangeListeners() {
    this.neuroVascularForm.get('complaints_of_any_radicular_symptoms_in_either_extremity')?.valueChanges.subscribe(value => {
      this.showComplaintsOfAnyRadicularSymptomsInEitherExtremityFields = value !== 'na';
      if (value === 'na') {
        this.neuroVascularForm.get('complaints_radicular_input')?.setValue('');
        this.neuroVascularForm.get('extremity_reflexes_equal_normal_bilateral')?.setValue('no');
        this.neuroVascularForm.get('extremity_reflexes_equal_normal_bilateral_text')?.setValue('');
        this.neuroVascularForm.get('sensory_or_vascular_deficits_noted')?.setValue('no');
        this.neuroVascularForm.get('sensory_or_vascular_deficits_noted_text')?.setValue('');
      }
    });

    this.neuroVascularForm.get('extremity_reflexes_equal_normal_bilateral')?.valueChanges.subscribe(value => {
      this.showExtremityReflexesFields = value !== 'na';
      if (value === 'na') {
        this.neuroVascularForm.get('extremity_reflexes_equal_normal_bilateral_text')?.setValue('');
      }
    });

    this.neuroVascularForm.get('sensory_or_vascular_deficits_noted')?.valueChanges.subscribe(value => {
      this.showSensoryOrVascularDeficitsFields = value !== 'na';
      if (value === 'na') {
        this.neuroVascularForm.get('sensory_or_vascular_deficits_noted_text')?.setValue('');
      }
    });

    this.neuroVascularForm.get('cranial_nerve_screen')?.valueChanges.subscribe(value => {
      this.showCranialNerveScreenFields = value === 'yes';
    });

    this.neuroVascularForm.get('myotomes_upper')?.valueChanges.subscribe(value => {
      this.showMyotomesUpperFields = value === 'yes';
    });

    this.neuroVascularForm.get('myotomes_lower')?.valueChanges.subscribe(value => {
      this.showMyotomesLowerFields = value === 'yes';
    });

    this.neuroVascularForm.get('dermatomes_upper')?.valueChanges.subscribe(value => {
      this.showDermatomesUpperFields = value === 'yes';
    });

    this.neuroVascularForm.get('dermatomes_lower')?.valueChanges.subscribe(value => {
      this.showDermatomesLowerFields = value === 'yes';
    });

    this.neuroVascularForm.get('upper_reflexes')?.valueChanges.subscribe(value => {
      this.showUpperReflexesFields = value === 'yes';
    });

    this.neuroVascularForm.get('lower_reflexes')?.valueChanges.subscribe(value => {
      this.showLowerReflexesFields = value === 'yes';
    });

    this.neuroVascularForm.get('neural_tissue_tension_upper')?.valueChanges.subscribe(value => {
      this.showNeuralTissueTensionUpperFields = value === 'yes';
    });

    this.neuroVascularForm.get('neural_tissue_tension_lower')?.valueChanges.subscribe(value => {
      this.showNeuralTissueTensionLowerFields = value === 'yes';
    });

    this.neuroVascularForm.get('vascular')?.valueChanges.subscribe(value => {
      this.showVascularFields = value === 'yes';
    });

    this.neuroVascularForm.get('vertebral_artery')?.valueChanges.subscribe(value => {
      this.showVertebralArteryFields = value === 'yes';
    });

    this.neuroVascularForm.get('allen_s_test_circulation')?.valueChanges.subscribe(value => {
      this.showAllenSTestCirculationFields = value === 'yes';
    });

    this.neuroVascularForm.get('capillary_refill')?.valueChanges.subscribe(value => {
      this.showCapillaryRefillFields = value === 'yes';
    });

    this.neuroVascularForm.get('homan_s_sign')?.valueChanges.subscribe(value => {
      this.showHomanSSignFields = value === 'yes';
    });

    this.neuroVascularForm.get('thoracic_outlet')?.valueChanges.subscribe(value => {
      this.showThoracicOutletFields = value === 'yes';
    });

    this.neuroVascularForm.get('lasegue_s_slr')?.valueChanges.subscribe(value => {
      this.showLasegueSSlrFields = value === 'yes';
    });

    this.neuroVascularForm.get('slump')?.valueChanges.subscribe(value => {
      this.showSlumpFields = value === 'yes';
    });

    this.neuroVascularForm.get('quadrant_testing')?.valueChanges.subscribe(value => {
      this.showQuadrantTestingFields = value === 'yes';
    });

    this.neuroVascularForm.get('prone_knee_bend_nachlas')?.valueChanges.subscribe(value => {
      this.showProneKneeBendNachlasFields = value === 'yes';
    });

    this.neuroVascularForm.get('kernig_brudzinski_test')?.valueChanges.subscribe(value => {
      this.showKernigBrudzinskiTestFields = value === 'yes';
    });

    this.neuroVascularForm.get('cram_test')?.valueChanges.subscribe(value => {
      this.showCramTestFields = value === 'yes';
    });

    this.neuroVascularForm.get('seated_dural_stretch')?.valueChanges.subscribe(value => {
      this.showSeatedDuralStretchFields = value === 'yes';
    });

    this.neuroVascularForm.get('semmes_weinstein_lower')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinLowerFields = value === 'yes';
    });
    this.neuroVascularForm.get('fst_toe_semmes_weinstein_lower')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinLowerFstToeFields = value === 'yes';
    });
    this.neuroVascularForm.get('snd_toe_semmes_weinstein_lower')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinLowerSndToeFields = value === 'yes';
    });
    this.neuroVascularForm.get('thrd_toe_semmes_weinstein_lower')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinLowerThirdToeFields = value === 'yes';
    });
    this.neuroVascularForm.get('frth_toe_semmes_weinstein_lower')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinLowerFourthToeFields = value === 'yes';
    });
    this.neuroVascularForm.get('fifth_toe_semmes_weinstein_lower')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinLowerFifthToeFields = value === 'yes';
    });
    this.neuroVascularForm.get('plantar_surface_semmes_weinstein_lower')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinLowerPlantarSurfaceFields = value === 'yes';
    });
    this.neuroVascularForm.get('dorsal_surface_semmes_weinstein_lower')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinLowerDorsalSurfaceFields = value === 'yes';
    });



    this.neuroVascularForm.get('semmes_weinstein_upper')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinUpperFields = value === 'yes';
    });
    this.neuroVascularForm.get('thumb_semmes_weinstein_upper')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinUpperThumbFields = value === 'yes';
    });
    this.neuroVascularForm.get('index_finger_semmes_weinstein_upper')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinUpperIndexFingerFields = value === 'yes';
    });
    this.neuroVascularForm.get('middle_finger_semmes_weinstein_upper')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinUpperMiddleFingerFields = value === 'yes';
    });
    this.neuroVascularForm.get('ring_finger_semmes_weinstein_upper')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinUpperRingFingerFields = value === 'yes';
    });
    this.neuroVascularForm.get('small_finger_semmes_weinstein_upper')?.valueChanges.subscribe(value => {
      this.showSemmesWeinsteinUpperSmallFingerFields = value === 'yes';
    });


    this.neuroVascularForm.get('tinel_s_lower')?.valueChanges.subscribe(value => {
      this.showTinelSLowerFields = value === 'yes';
    });

    this.neuroVascularForm.get('tinel_s_upper')?.valueChanges.subscribe(value => {
      this.showTinelSUpperFields = value === 'yes';
    });

    this.neuroVascularForm.get('transverse_ligament_stability')?.valueChanges.subscribe(value => {
      this.showTransverseLigamentStabilityFields = value === 'yes';
    });

    this.neuroVascularForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
    });

  }

}
