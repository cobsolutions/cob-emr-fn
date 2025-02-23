import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dependent } from '../dependency.field/model/dependent';
import { Field } from '../dependency.field/model/field';
import { Section } from '../dependency.field/model/section';
interface DepMap {
  value?: any
  name: string,
  render: boolean
  dependents: Dependent[];
}
@Component({
  selector: 'multiple-dependency-field',
  templateUrl: './multiple-dependency-field.component.html',
  styleUrls: ['./multiple-dependency-field.component.css']
})
export class MultipleDependencyFieldComponent implements OnInit {
  levelOnedependent: Dependent[];
  levelTwodependent: Dependent[];
  levelThreedependent: Dependent[];
  depMap: DepMap[] = []
  @Input() form: FormGroup;
  @Input() fieldName: string
  @Input() section: string
  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    var file: string = this.getSectionFile();
    var url: string = 'assets/soap/subjective/' + file
    this.httpClient.get(url)
      .subscribe((section: any) => {
        this.checkValue(section);
      });
  }
  private getSectionFile(): string {
    switch (this.section) {
      case 'prior.fucntion':
        return 'prior.fucntion.json'
      case 'current.fucntion':
        return 'current.function.json'
      case 'pain':
        return 'pain.json'
      case 'medical.history':
        return 'medical.history.json'
      default:
        return '';
    }
  }
  private checkValue(section: Section) {
    var field: Field = section.fields
      .find((field) => field.name === this.fieldName);
    this.form?.get(field.name)?.valueChanges.subscribe(value => {
      if (value === field.value) {
        this.levelOnedependent = field.dependents
        this.addField(this.levelOnedependent)
      } else {
        this.removeFields(this.levelOnedependent);
        this.levelOnedependent = []
      }
      for (let i = 0; i < this.levelOnedependent.length; i++) {
        if (this.levelOnedependent[i].dependents) {
          console.log('3333')
          var dependent: Dependent = this.levelOnedependent[i];
          var dd: DepMap = {
            value: dependent.value,
            name: dependent.name,
            render: false,
            dependents: dependent.dependents
          }
          this.depMap.push(dd);
        }
      }
      this.checkValueLevelTwo();
    })

  }
  private checkValueLevelTwo() {
    for (let i = 0; i < this.depMap.length; i++) {
      this.form?.get(this.depMap[i].name)?.valueChanges.subscribe(value => {
        console.log(value)
        if (this.depMap[i].value === value) {
          this.depMap[i].render = true;
          this.addField(this.depMap[i].dependents)
        }
        else {
          this.depMap[i].render = false;
          this.removeFields(this.depMap[i].dependents)
        }
      })
    }
  }
  private addField(dependents: Dependent[]) {
    for (let i = 0; i < dependents.length; i++) {
      this.form.addControl(dependents[i].name, this.fb.control(null))
    }
  }
  private removeFields(dependents: Dependent[]) {
    for (let i = 0; i < dependents.length; i++) {
      this.form.removeControl(dependents[i].name);
    }
  }


}
