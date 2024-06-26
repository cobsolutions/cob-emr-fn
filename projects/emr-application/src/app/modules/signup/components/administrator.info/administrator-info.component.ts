import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'administrator-info',
  templateUrl: './administrator-info.component.html',
  styleUrls: ['./administrator-info.component.css']
})
export class AdministratorInfoComponent implements OnInit {
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
}
