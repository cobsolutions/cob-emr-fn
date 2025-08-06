import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { ROMFormStyles } from './rom.fields.styles';

@Component({
  selector: 'range-of-motion',
  templateUrl: './range-of-motion.component.html',
  styleUrls: ['./range-of-motion.component.css']
})
export class RangeOfMotionComponent implements OnInit {
  ROMForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  styles: FieldControlStyles[] = ROMFormStyles;
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }


  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.ROMForm = this.fb.group({});
    this.formReady.emit(this.ROMForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
