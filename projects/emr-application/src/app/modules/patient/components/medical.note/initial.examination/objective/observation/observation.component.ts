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

  }

}
