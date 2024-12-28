import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-appointment-type',
  templateUrl: './list-appointment-type.component.html',
  styleUrls: ['./list-appointment-type.component.css']
})
export class ListAppointmentTypeComponent implements OnInit {
  addVisibility: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  openCreateModal() {
    this.addVisibility = true
  }
  toggleAdd() {
    this.addVisibility = false;
  }
}
