import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlStyles } from '../../../../filed.control.style.selector/field.control.style';
import { SpecialtiesStyles } from './styles/specialties';

@Component({
  selector: 'specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  specialtiesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  styles: FieldControlStyles[] = SpecialtiesStyles;
  constructor() { }

  ngOnInit(): void {
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
