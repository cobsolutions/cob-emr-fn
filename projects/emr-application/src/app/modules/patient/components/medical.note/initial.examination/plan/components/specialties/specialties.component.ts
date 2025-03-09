import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  specialtiesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  constructor() { }

  ngOnInit(): void {
  }

}
