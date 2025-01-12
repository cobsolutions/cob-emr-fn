import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppointmentType } from '../../../../models/appointment.type';
import { AppointmentTypeService } from '../../../../service/appointment.type/appointment-type.service';

@Component({
  selector: 'list-appointment-type',
  templateUrl: './list-appointment-type.component.html',
  styleUrls: ['./list-appointment-type.component.css']
})
export class ListAppointmentTypeComponent implements OnInit {
  addVisibility: boolean = false;
  editVisibility: boolean = false;
  appointmentTypes: Observable<AppointmentType[]>
  constructor(private appointmentTypeService: AppointmentTypeService) { }

  ngOnInit(): void {
    this.find();
  }
  openCreateModal() {
    this.addVisibility = true
  }
  openEditModal() {
    this.editVisibility = true
  }
  toggleAdd() {
    this.addVisibility = false;
  }
  toggleEdit() {
    this.editVisibility = false;
  }
  private find() {
    this.appointmentTypes = this.appointmentTypeService.retrieveAppointmentTypes().pipe(
      map(result => {
        return result.records;
      })
    )
  }
  changeFacilityVisibility(event) {
    if (event === 'close') {
      this.addVisibility = false;
      this.find();
    }
  }

}
