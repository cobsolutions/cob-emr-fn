import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../../filed.control.style.selector/field.control.style';
import { ModalitiesStyles } from './styles/modalities';

@Component({
  selector: 'modalities',
  templateUrl: './modalities.component.html',
  styleUrls: ['./modalities.component.css']
})
export class ModalitiesComponent implements OnInit {
  modalitiesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  @Input() data:any
  styles: FieldControlStyles[] = ModalitiesStyles;
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.modalitiesForm = this.fb.group({})
    this.formReady.emit(this.modalitiesForm)
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
