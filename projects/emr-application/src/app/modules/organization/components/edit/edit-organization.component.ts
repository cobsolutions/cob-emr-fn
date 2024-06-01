import { Component, Input, OnInit } from '@angular/core';
import { Organization } from '../../models/organiztion';

@Component({
  selector: 'edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {
  submitted: boolean = false;
  @Input() organization: Organization
  constructor() { }

  ngOnInit(): void {
  }

}
