import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'non-material-handling',
  templateUrl: './non-material-handling.component.html',
  styleUrls: ['./non-material-handling.component.css']
})
export class NonMaterialHandlingComponent implements OnInit {
  form: FormGroup;
  adequacyOptions = ['N/A', 'Yes', 'No'];
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string;
  tasks = [
    { key: 'sitting', label: 'Sitting', unit: 'minutes' },
    { key: 'standing', label: 'Standing', unit: 'minutes' },
    { key: 'walking', label: 'Walking', unit: 'minutes' },
    { key: 'stairClimbing', label: 'Stair Climbing', unit: 'flights' },
    { key: 'trunkBending', label: 'Trunk Bending' },
    { key: 'overheadReach', label: 'Overhead Reach' },
    { key: 'crawl', label: 'Crawl' },
    { key: 'squatting', label: 'Squatting' },
    { key: 'kneeling', label: 'Kneeling' },
    { key: 'stooping', label: 'Stooping' },
    { key: 'crouching', label: 'Crouching' },
    { key: 'ladderClimbing', label: 'Ladder Climbing' },
    { key: 'forwardReach', label: 'Forward Reach', unit: 'textarea' }
  ];

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    const group: any = {};
    this.tasks.forEach(task => {
      group[`${task.key}_value`] = [''];
      group[`${task.key}_occasional`] = [false];
      group[`${task.key}_frequent`] = [false];
      group[`${task.key}_constant`] = [false];
      group[`${task.key}_adequate`] = ['N/A'];
    });

    this.form = this.fb.group(group);
    this.form.valueChanges.subscribe(values => {
      this.parentForm.get(this.parentFieldName).setValue(values);
    });
  }


}
