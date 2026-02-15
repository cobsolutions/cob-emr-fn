import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HierarchyCheckboxComponent } from '../common/hierarchy-checkbox/hierarchy-checkbox.component';
import { CheckboxHierarchy } from '../common/hierarchy-checkbox/interface/checkbox-hierarchy';
import { CurrentFunctionMapperService } from '../services/current.function.mapper.service';

@Component({
  selector: 'subjective-current-functional-limitations-n',
  templateUrl: './current-functional-limitations-n.component.html',
  styleUrls: ['./current-functional-limitations-n.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentFunctionalLimitationsNComponent implements OnInit, OnChanges {

  currentFunctionalLimitationsForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() currentFunctionFormData: any;
  showHoOther: boolean = false
  showHoOtherlymphedema: boolean = false
  showHoOtherWoundhealing: boolean = false
  showHoOtherPelvicHealth: boolean = false
  @ViewChild('hierarchyCheckbox') hierarchyCheckbox!: HierarchyCheckboxComponent;
  constructor(
    private fb: FormBuilder,
    private currentFunctionMapperService: CurrentFunctionMapperService,
    private cdr: ChangeDetectorRef
  ) { }
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
          collapsed: true,
          hasInput: true
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
          hasInput: true,
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
          collapsed: true,
          hasInput: true
        },
        {
          id: 'work-vocation',
          label: 'Work/Vocation/Occupation',
          checked: false,
          indeterminate: false,
          collapsed: true,
          hasInput: true
        },
        {
          id: 'recreation',
          label: 'Recreation',
          checked: false,
          indeterminate: false,
          collapsed: true,
          hasInput: true,
          children: [
            { id: 'sports', label: 'Sports', checked: false, indeterminate: false, collapsed: true }
          ]
        }
      ]
    }
  ];
  ngOnInit(): void {
    this.initForm();
    this.patchFormData();
    this.setupValueChangeListeners();
    this.formReady.emit(this.currentFunctionalLimitationsForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // React to changes in currentFunctionFormData
    if (changes['currentFunctionFormData'] && !changes['currentFunctionFormData'].firstChange && this.currentFunctionalLimitationsForm) {
      this.patchFormData();
      this.cdr.markForCheck();
    }
  }
  patchFormData() {
    if (this.currentFunctionFormData) {
      // Use mapper to convert DTO to form control values
      const formValues = this.currentFunctionMapperService.fromDto(this.currentFunctionFormData);

      // Update checkboxData based on the mapped form control values
      this.updateCheckboxDataFromMappedValues(formValues);

      // Use setTimeout to ensure hierarchy-checkbox components have created form controls
      setTimeout(() => {
        this.currentFunctionalLimitationsForm.patchValue(formValues, { emitEvent: false });

        // Expand checked items after data is loaded
        if (this.hierarchyCheckbox) {
          this.hierarchyCheckbox.expandCheckedItems();
        }
        this.cdr.markForCheck();
      }, 0);
    }
  }
  initForm() {
    this.currentFunctionalLimitationsForm = this.fb.group({
      current_functional_limitations_other: [],
      current_functional_limitations_function_other_text: [],
      current_functional_limitations_function_other_lymphedema: ['no'],
      current_functional_limitations_function_other_lymphedema_text: [''],
      current_functional_limitations_function_other_wound_healing: ['no'],
      current_functional_limitations_function_other_wound_healing_text: [''],
      current_functional_limitations_function_other_pelvic_health: ['no'],
      current_functional_limitations_function_other_pelvic_health_text: ['']

    })
  }
  setupValueChangeListeners() {
    // Subscribe to all form value changes (including hierarchy checkboxes)
    this.currentFunctionalLimitationsForm.valueChanges.subscribe(values => {
      // All form values including hierarchy checkboxes and comments
      // Example values:
      // {
      //   'current-level-function_self-care': true, // Category checkbox
      //   'current-level-function_self-care_hygiene': true,
      //   'current-level-function_self-care_comment': 'some comment',
      //   'current-level-function_mobility-walking-moving-around': false, // Category checkbox
      //   'current_functional_limitations_other': true,
      //   'current_functional_limitations_function_other_text': 'other text'
      // }
    });

    // Listen to category formControl changes
    // Self Care category
    this.currentFunctionalLimitationsForm.get('current-level-function_self-care')?.valueChanges.subscribe(value => {
      console.log('Self Care category checked:', value);
    });

    // Mobility category
    this.currentFunctionalLimitationsForm.get('current-level-function_mobility-walking-moving-around')?.valueChanges.subscribe(value => {
      console.log('Mobility category checked:', value);
    });

    // Changing & Maintaining Body Position category
    this.currentFunctionalLimitationsForm.get('current-level-function_changing-maintaining-body-position')?.valueChanges.subscribe(value => {
      console.log('Changing & Maintaining Body Position category checked:', value);
    });

    // Carrying, Moving & Handling Objects category
    this.currentFunctionalLimitationsForm.get('current-level-function_carrying-moving-handling-objects')?.valueChanges.subscribe(value => {
      console.log('Carrying, Moving & Handling Objects category checked:', value);
    });

    this.currentFunctionalLimitationsForm.get('current_functional_limitations_other')?.valueChanges.subscribe(value => {
      this.showHoOther = value;
      this.cdr.markForCheck();
    });
    this.currentFunctionalLimitationsForm.get('current_functional_limitations_function_other_lymphedema')?.valueChanges.subscribe(value => {
      this.showHoOtherlymphedema = value === 'yes';
      this.cdr.markForCheck();
    });
    this.currentFunctionalLimitationsForm.get('current_functional_limitations_function_other_wound_healing')?.valueChanges.subscribe(value => {
      this.showHoOtherWoundhealing = value === 'yes';
      this.cdr.markForCheck();
    });
    this.currentFunctionalLimitationsForm.get('current_functional_limitations_function_other_pelvic_health')?.valueChanges.subscribe(value => {
      this.showHoOtherPelvicHealth = value === 'yes';
      this.cdr.markForCheck();
    });
  }

  // Helper method to get category formControl value
  getCategoryValue(categoryKey: string): boolean {
    const formControlName = `current-level-function_${categoryKey}`;
    return this.currentFunctionalLimitationsForm.get(formControlName)?.value || false;
  }

  // Helper method to check if any category is selected
  isAnyCategorySelected(): boolean {
    return this.getCategoryValue('self-care') ||
           this.getCategoryValue('mobility-walking-moving-around') ||
           this.getCategoryValue('changing-maintaining-body-position') ||
           this.getCategoryValue('carrying-moving-handling-objects');
  }

  private updateCheckboxDataFromMappedValues(formValues: any) {
    if (!formValues) return;

    // Recursively update items based on form control values
    const updateItemRecursive = (item: any, categoryKey: string, itemPath: string) => {
      // Build form control name matching hierarchy-checkbox naming convention
      const normalizedItemPath = itemPath.replace(/[\.\-]/g, '_');
      const formControlName = `current-level-function_${categoryKey}_${normalizedItemPath}`;

      if (formValues[formControlName] !== undefined) {
        item.checked = formValues[formControlName];
      }

      // Update inputValue for items with hasInput
      if (item.hasInput) {
        const inputFormControlName = `${formControlName}_input`;
        if (formValues[inputFormControlName] !== undefined) {
          item.inputValue = formValues[inputFormControlName];
        }
      }

      // Recursively update children
      if (item.children) {
        item.children.forEach((child: any) => {
          const childPath = itemPath ? `${itemPath}.${child.id}` : child.id;
          updateItemRecursive(child, categoryKey, childPath);
        });
      }
    };

    // Update each category
    this.checkboxData.forEach(category => {
      const categoryKey = this.sanitizeKey(category.title);
      const categoryFormControlName = `current-level-function_${categoryKey}`;

      // Update category checked state
      if (formValues[categoryFormControlName] !== undefined) {
        category.checked = formValues[categoryFormControlName];
      }

      // Update category comment
      const commentFormControlName = `current-level-function_${categoryKey}_comment`;
      if (formValues[commentFormControlName] !== undefined) {
        category.comment = formValues[commentFormControlName];
      }

      // Update items within this category
      category.items.forEach(item => {
        updateItemRecursive(item, categoryKey, item.id);
      });
    });
  }

  private sanitizeKey(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

}
