import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'organization-summary',
  templateUrl: './organization-summary.component.html',
  styleUrls: ['./organization-summary.component.css']
})
export class OrganizationSummaryComponent implements OnInit {
  @Input() form: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.form.get('Users').valueChanges.forEach(selected=>{
      console.log(JSON.stringify(selected))
    })
  }
  submit(){
    console.log(JSON.stringify(this.form.value))
  }
}
