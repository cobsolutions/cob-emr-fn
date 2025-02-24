import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ObjectiveField } from '../models/objective.field';
@Component({
  selector: 'observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {
  ObservationForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  fields: ObjectiveField[];
  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildObservationfields();
  }

  private buildObservationfields() {
    this.ObservationForm = this.fb.group({});
    var url: string = 'assets/soap/objective/observation/fields.json'
    this.httpClient.get(url)
      .subscribe((fields: any) => {
        this.fields = fields
        let formControls = this.fields.reduce((acc, field) => {
          acc[field.value] = new FormControl(field.value);
          return acc;
        }, {} as { [key: string]: FormControl });
        this.ObservationForm = this.fb.group(formControls);
      });
  }

}
