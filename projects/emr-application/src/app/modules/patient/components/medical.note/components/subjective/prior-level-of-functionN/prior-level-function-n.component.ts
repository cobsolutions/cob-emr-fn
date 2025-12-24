import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckboxHierarchy } from '../common/hierarchy-checkbox/interface/checkbox-hierarchy';

@Component({
  selector: 'subjective-prior-level-function-n',
  templateUrl: './prior-level-function-n.component.html',
  styleUrls: ['./prior-level-function-n.component.css']
})
export class PriorLevelFunctionNComponent implements OnInit {
  checkboxData: CheckboxHierarchy[] = [
    {
      title: 'Self Care',
      collapsed: true,
      comment: '',
      items: [
        {
          id: 'hygiene',
          label: 'Hygiene',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            {
              id: 'grooming',
              label: 'Grooming',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'washing-body-parts', label: 'Washing Body Parts', checked: false, indeterminate: false, collapsed: true },
                { id: 'washing-whole-body', label: 'Washing Whole Body', checked: false, indeterminate: false, collapsed: true },
                { id: 'drying-oneself', label: 'Drying Oneself', checked: false, indeterminate: false, collapsed: true },
                { id: 'caring-for-skin', label: 'Caring for Skin', checked: false, indeterminate: false, collapsed: true },
                { id: 'caring-for-teeth', label: 'Caring for Teeth', checked: false, indeterminate: false, collapsed: true },
                { id: 'caring-for-hair', label: 'Caring for Hair', checked: false, indeterminate: false, collapsed: true },
                { id: 'caring-for-nails', label: 'Caring for Nails (Toe & Finger)', checked: false, indeterminate: false, collapsed: true }
              ]
            },
            {
              id: 'looking-after-health',
              label: "Looking After One's Health",
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'balanced-diet', label: 'Maintaining Balanced Diet', checked: false, indeterminate: false, collapsed: true },
                { id: 'keeping-warm', label: 'Keeping Warm', checked: false, indeterminate: false, collapsed: true },
                { id: 'keeping-cool', label: 'Keeping Cool', checked: false, indeterminate: false, collapsed: true },
                { id: 'immunizations', label: 'Getting Immunizations', checked: false, indeterminate: false, collapsed: true },
                { id: 'physical-exams', label: 'Getting Regular Physical Examinations', checked: false, indeterminate: false, collapsed: true }
              ]
            },
            {
              id: 'dressing',
              label: 'Dressing',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'putting-on-clothes', label: 'Putting on Clothes', checked: false, indeterminate: false, collapsed: true },
                { id: 'putting-on-footwear', label: 'Putting on Footwear', checked: false, indeterminate: false, collapsed: true },
                { id: 'appropriate-clothing', label: 'Putting on Appropriate Clothing', checked: false, indeterminate: false, collapsed: true },
                { id: 'removing-clothes', label: 'Removing Clothes', checked: false, indeterminate: false, collapsed: true },
                { id: 'removing-footwear', label: 'Removing Footwear', checked: false, indeterminate: false, collapsed: true }
              ]
            },
            {
              id: 'bathing',
              label: 'Bathing',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'showering', label: 'Showering', checked: false, indeterminate: false, collapsed: true },
                { id: 'bathing-tub', label: 'Bathing', checked: false, indeterminate: false, collapsed: true },
                { id: 'bathing-wash-parts', label: 'Washing Body Parts', checked: false, indeterminate: false, collapsed: true },
                { id: 'bathing-drying', label: 'Drying Oneself', checked: false, indeterminate: false, collapsed: true }
              ]
            },
            {
              id: 'toileting',
              label: 'Toileting',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'urination', label: 'Regulating Urination', checked: false, indeterminate: false, collapsed: true },
                { id: 'defecation', label: 'Regulating Defecation', checked: false, indeterminate: false, collapsed: true },
                { id: 'menstrual-care', label: 'Regulating Menstrual Care', checked: false, indeterminate: false, collapsed: true }
              ]
            }
          ]
        },
        {
          id: 'sleep',
          label: 'Sleep',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'disturbed-sleep', label: 'Disturbed Sleep', checked: false, indeterminate: false, collapsed: true },
            {
              id: 'sleeping-postures',
              label: 'Sleeping Postures',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'prone', label: 'Prone', checked: false, indeterminate: false, collapsed: true },
                { id: 'supine', label: 'Supine', checked: false, indeterminate: false, collapsed: true },
                { id: 'side-right', label: 'Side R', checked: false, indeterminate: false, collapsed: true },
                { id: 'side-left', label: 'Side L', checked: false, indeterminate: false, collapsed: true }
              ]
            },
            { id: 'pillows', label: 'Pillows', checked: false, indeterminate: false, collapsed: true },
            {
              id: 'surface',
              label: 'Surface',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'firm', label: 'Firm', checked: false, indeterminate: false, collapsed: true },
                { id: 'soft', label: 'Soft', checked: false, indeterminate: false, collapsed: true },
                { id: 'sag', label: 'Sag', checked: false, indeterminate: false, collapsed: true },
                { id: 'custom', label: 'Custom', checked: false, indeterminate: false, collapsed: true }
              ]
            }
          ]
        },
        {
          id: 'iadls',
          label: 'IADLs',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'use-telephone', label: 'Ability to Use Telephone', checked: false, indeterminate: false, collapsed: true },
            { id: 'shopping', label: 'Shopping', checked: false, indeterminate: false, collapsed: true },
            { id: 'food-prep', label: 'Food Preparation', checked: false, indeterminate: false, collapsed: true },
            { id: 'housekeeping', label: 'Housekeeping', checked: false, indeterminate: false, collapsed: true },
            { id: 'laundry-iadl', label: 'Laundry', checked: false, indeterminate: false, collapsed: true },
            { id: 'transportation', label: 'Mode of Transportation', checked: false, indeterminate: false, collapsed: true },
            { id: 'medications', label: 'Responsibility for Own Medications', checked: false, indeterminate: false, collapsed: true },
            { id: 'finances', label: 'Ability to Handle Finances', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'household-chores',
          label: 'Household Chores',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'cook-meal', label: 'Cook a Meal', checked: false, indeterminate: false, collapsed: true },
            { id: 'laundry-chore', label: 'Laundry', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        { id: 'drive-community', label: 'Drive Community Distance', checked: false, indeterminate: false, collapsed: true },
        { id: 'volunteering', label: 'Volunteering', checked: false, indeterminate: false, collapsed: true },
        { id: 'caregiving', label: 'Caregiving', checked: false, indeterminate: false, collapsed: true }
      ]
    },
    {
      title: 'Mobility: Walking & Moving Around',
      collapsed: true,
      comment: '',
      items: [
        {
          id: 'mobility-iadls',
          label: 'IADLs',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'mobility-use-telephone', label: 'Ability to Use Telephone', checked: false, indeterminate: false, collapsed: true },
            { id: 'mobility-shopping', label: 'Shopping', checked: false, indeterminate: false, collapsed: true },
            { id: 'mobility-food-prep', label: 'Food Preparation', checked: false, indeterminate: false, collapsed: true },
            { id: 'mobility-housekeeping', label: 'Housekeeping', checked: false, indeterminate: false, collapsed: true },
            { id: 'mobility-laundry', label: 'Laundry', checked: false, indeterminate: false, collapsed: true },
            { id: 'mobility-transportation', label: 'Mode of Transportation', checked: false, indeterminate: false, collapsed: true },
            { id: 'mobility-medications', label: 'Responsibility for Own Medications', checked: false, indeterminate: false, collapsed: true },
            { id: 'mobility-finances', label: 'Ability to Handle Finances', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'assistive-device',
          label: 'Use of an Assistive Device',
          checked: false,
          indeterminate: false,
          collapsed: true
        },
        {
          id: 'walking',
          label: 'Walking',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'walking-forward', label: 'Forward', checked: false, indeterminate: false, collapsed: true },
            { id: 'walking-backward', label: 'Backward', checked: false, indeterminate: false, collapsed: true },
            { id: 'walking-sideways', label: 'Sideways', checked: false, indeterminate: false, collapsed: true },
            { id: 'walking-strolling', label: 'Strolling', checked: false, indeterminate: false, collapsed: true },
            { id: 'walking-surfaces', label: 'Walking on Different Surfaces', checked: false, indeterminate: false, collapsed: true },
            { id: 'walking-obstacles', label: 'Walking Around Obstacles', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'moving-around',
          label: 'Moving Around',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'climbing', label: 'Climbing', checked: false, indeterminate: false, collapsed: true },
            { id: 'running', label: 'Running', checked: false, indeterminate: false, collapsed: true },
            { id: 'jogging', label: 'Jogging', checked: false, indeterminate: false, collapsed: true },
            { id: 'skipping', label: 'Skipping', checked: false, indeterminate: false, collapsed: true },
            { id: 'jumping', label: 'Jumping', checked: false, indeterminate: false, collapsed: true },
            { id: 'swimming', label: 'Swimming', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'different-locations',
          label: 'Moving Around in Different Locations',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            {
              id: 'between-rooms',
              label: 'Walking Between Rooms',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'stairs', label: 'Stairs', checked: false, indeterminate: false, collapsed: true },
                { id: 'in-home', label: 'In Home', checked: false, indeterminate: false, collapsed: true }
              ]
            },
            {
              id: 'down-street',
              label: 'Walking Down the Street',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'community-distances', label: 'Community Distances', checked: false, indeterminate: false, collapsed: true }
              ]
            },
            { id: 'within-building', label: 'Walking Within a Building', checked: false, indeterminate: false, collapsed: true },
            {
              id: 'using-equipment',
              label: 'Moving Around Using Equipment',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'walker', label: 'Walker', checked: false, indeterminate: false, collapsed: true },
                { id: 'wheelchair', label: 'Wheelchair', checked: false, indeterminate: false, collapsed: true },
                { id: 'skates', label: 'Skates', checked: false, indeterminate: false, collapsed: true },
                { id: 'skis', label: 'Skis', checked: false, indeterminate: false, collapsed: true }
              ]
            },
            {
              id: 'using-transportation',
              label: 'Moving Around Using Transportation',
              checked: false,
              indeterminate: false,
              collapsed: true,
              children: [
                { id: 'on-off-bus', label: 'On/Off Bus', checked: false, indeterminate: false, collapsed: true },
                { id: 'subway', label: 'Subway', checked: false, indeterminate: false, collapsed: true },
                { id: 'public-transport', label: 'Public Transportation', checked: false, indeterminate: false, collapsed: true }
              ]
            }
          ]
        },
        {
          id: 'negotiate-obstacles',
          label: 'Negotiate Obstacles',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'crowded-streets', label: 'Bumped in Crowded Streets', checked: false, indeterminate: false, collapsed: true },
            { id: 'terrain', label: 'Terrain', checked: false, indeterminate: false, collapsed: true }
          ]
        }
      ]
    },
    {
      title: 'Changing & Maintaining Body Position',
      collapsed: true,
      comment: '',
      items: [
        {
          id: 'maintaining-body-position',
          label: 'Maintaining a Body Position',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'remaining-seated', label: 'Remaining Seated', checked: false, indeterminate: false, collapsed: true },
            { id: 'remaining-standing', label: 'Remaining Standing', checked: false, indeterminate: false, collapsed: true },
            { id: 'squatting', label: 'Squatting', checked: false, indeterminate: false, collapsed: true },
            { id: 'kneeling', label: 'Kneeling', checked: false, indeterminate: false, collapsed: true },
            { id: 'sitting', label: 'Sitting', checked: false, indeterminate: false, collapsed: true },
            { id: 'standing', label: 'Standing', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'transfers',
          label: 'Transfers',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'bed-to-chair', label: 'Moving From Bed to Chair', checked: false, indeterminate: false, collapsed: true },
            { id: 'sliding-bench', label: 'Sliding Along a Bench', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'body-position-iadls',
          label: 'IADLs',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'body-position-use-telephone', label: 'Ability to Use Telephone', checked: false, indeterminate: false, collapsed: true },
            { id: 'body-position-shopping', label: 'Shopping', checked: false, indeterminate: false, collapsed: true },
            { id: 'body-position-food-prep', label: 'Food Preparation', checked: false, indeterminate: false, collapsed: true },
            { id: 'body-position-housekeeping', label: 'Housekeeping', checked: false, indeterminate: false, collapsed: true },
            { id: 'body-position-laundry', label: 'Laundry', checked: false, indeterminate: false, collapsed: true },
            { id: 'body-position-transportation', label: 'Mode of Transportation', checked: false, indeterminate: false, collapsed: true },
            { id: 'body-position-medications', label: 'Responsibility for Own Medications', checked: false, indeterminate: false, collapsed: true },
            { id: 'body-position-finances', label: 'Ability to Handle Finances', checked: false, indeterminate: false, collapsed: true }
          ]
        }
      ]
    },
    {
      title: 'Carrying, Moving & Handling Objects',
      collapsed: true,
      comment: '',
      items: [
        {
          id: 'carrying-iadls',
          label: 'IADLs',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'carrying-use-telephone', label: 'Ability to Use Telephone', checked: false, indeterminate: false, collapsed: true },
            { id: 'carrying-shopping', label: 'Shopping', checked: false, indeterminate: false, collapsed: true },
            { id: 'carrying-food-prep', label: 'Food Preparation', checked: false, indeterminate: false, collapsed: true },
            { id: 'carrying-housekeeping', label: 'Housekeeping', checked: false, indeterminate: false, collapsed: true },
            { id: 'carrying-laundry', label: 'Laundry', checked: false, indeterminate: false, collapsed: true },
            { id: 'carrying-transportation', label: 'Mode of Transportation', checked: false, indeterminate: false, collapsed: true },
            { id: 'carrying-medications', label: 'Responsibility for Own Medications', checked: false, indeterminate: false, collapsed: true },
            { id: 'carrying-finances', label: 'Ability to Handle Finances', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'hand-arm-use',
          label: 'Hand & Arm Use',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'pulling-objects', label: 'Pulling Objects', checked: false, indeterminate: false, collapsed: true },
            { id: 'pushing-objects', label: 'Pushing Objects', checked: false, indeterminate: false, collapsed: true },
            { id: 'reaching', label: 'Reaching', checked: false, indeterminate: false, collapsed: true },
            { id: 'turning-hands-arms', label: 'Turning Hands or Arms', checked: false, indeterminate: false, collapsed: true },
            { id: 'twisting-hands-arms', label: 'Twisting Hands or Arms', checked: false, indeterminate: false, collapsed: true },
            { id: 'throwing', label: 'Throwing', checked: false, indeterminate: false, collapsed: true },
            { id: 'catching', label: 'Catching', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'fine-hand-use',
          label: 'Fine Hand Use',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'picking-up', label: 'Picking Up', checked: false, indeterminate: false, collapsed: true },
            { id: 'grasping', label: 'Grasping', checked: false, indeterminate: false, collapsed: true },
            { id: 'manipulating', label: 'Manipulating', checked: false, indeterminate: false, collapsed: true },
            { id: 'releasing', label: 'Releasing', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'lower-extremities',
          label: 'Moving Objects with Lower Extremities',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'kicking', label: 'Kicking', checked: false, indeterminate: false, collapsed: true },
            { id: 'pushing-lower-extremities', label: 'Pushing with Lower Extremities', checked: false, indeterminate: false, collapsed: true }
          ]
        },
        {
          id: 'community-integration',
          label: 'Community Integration/Access',
          checked: false,
          indeterminate: false,
          collapsed: true
        },
        {
          id: 'work-vocation',
          label: 'Work/Vocation/Occupation',
          checked: false,
          indeterminate: false,
          collapsed: true
        },
        {
          id: 'recreation',
          label: 'Recreation',
          checked: false,
          indeterminate: false,
          collapsed: true,
          children: [
            { id: 'sports', label: 'Sports', checked: false, indeterminate: false, collapsed: true }
          ]
        }
      ]
    }
  ];

  priorLevelFunctionForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  showHoOther:boolean = false
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.priorLevelFunctionForm);
  }
  initForm() {
    this.priorLevelFunctionForm = this.fb.group({
      prior_level_function_other: [],
      prior_level_function_other_text: [],

    })
  }

  setupValueChangeListeners() {
    // Subscribe to all form value changes (including hierarchy checkboxes)
    this.priorLevelFunctionForm.valueChanges.subscribe(values => {
      // All form values including hierarchy checkboxes and comments
      // Example values:
      // {
      //   'prior-level-function_self-care_hygiene': true,
      //   'prior-level-function_self-care_comment': 'some comment',
      //   'prior_level_function_other': true,
      //   'prior_level_function_other_text': 'other text'
      // }
      console.log('Form values changed:', values);
    });

    this.priorLevelFunctionForm.get('prior_level_function_other')?.valueChanges.subscribe(value => {
      this.showHoOther = value;
    });
  }

}
