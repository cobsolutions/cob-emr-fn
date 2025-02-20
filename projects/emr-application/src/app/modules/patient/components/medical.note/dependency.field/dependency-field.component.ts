import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dependent } from './model/dependent';
import { Field } from './model/field';
import { Section } from './model/section';

@Component({
  selector: 'dependency-field',
  templateUrl: './dependency-field.component.html',
  styleUrls: ['./dependency-field.component.css']
})
export class DependencyFieldComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() fieldName: string
  // @Input() type: string
  dependent: Dependent[];
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    //this.checkParentValueField();
    var url: string = 'assets/soap/subjective/basic.section.json'
    this.httpClient.get(url)
      .subscribe((section: any) => {
        this.checkValue(section);
      });
  }
  private checkValue(section: Section) {
    var field: Field = section.fields
      .find((field) => field.name === this.fieldName);
    this.form?.get(field.name)?.valueChanges.subscribe(value => {
      if (value === field.value) {
        this.dependent = field.dependents
        this.addField()
      } else {
        this.removeFields();
      }
    })

  }
  private addField() {
    for (let i = 0; i < this.dependent.length; i++) {
      this.form.addControl(this.dependent[i].name, this.fb.control(null))
    }
  }
  private removeFields() {
    for (let i = 0; i < this.dependent.length; i++) {
      this.form.removeControl(this.dependent[i].name);
    }
    this.dependent = []
  }
}
