import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';
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
  @Input() data:any
  styles: FieldControlStyles[] = SpecialtiesStyles;
  constructor(private fb: FormBuilder, private fieldDependentsService:FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.specialtiesForm = this.fb.group({})
    this.formReady.emit(this.specialtiesForm)
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
