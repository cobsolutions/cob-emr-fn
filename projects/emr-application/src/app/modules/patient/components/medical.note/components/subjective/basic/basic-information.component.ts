import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, tap } from 'rxjs';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { MedialNoteService } from '../../../../../services/medical.note/medial-note.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { BasicFormStyles } from './fields.styles';
@Component({
  selector: 'basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit {
  basicForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  treatmentSide: string
  styles: FieldControlStyles[] = BasicFormStyles;
  @Input() basicFormData: any
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService
    , private medialNoteService: MedialNoteService) { }

  ngOnInit(): void {
    this.prepareFields();
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }

  private prepareFields() {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.basicForm = this.fb.group({});
    this.formReady.emit(this.basicForm);
  }
}
