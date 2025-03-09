import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  styles: FieldControlStyles[] = ModalitiesStyles;
  constructor() { }

  ngOnInit(): void {
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
