import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'projects/emr-application/src/app/modules/administration/model/user/user';
import { DotorUserService } from 'projects/emr-application/src/app/modules/administration/services/user/doctor.user/dotor-user.service';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { filter, switchMap } from 'rxjs';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';

@Component({
  selector: 'forward-modal',
  templateUrl: './forward-modal.component.html',
  styleUrls: ['./forward-modal.component.css']
})
export class ForwardModalComponent implements OnInit {

  clinicalUsers: User[]
  selectedUserUuid: string;
  errorMessage: string = undefined
  @Output() changeVisibility = new EventEmitter<string>()
  @Input() noteId: number
  clinicId: number;
  constructor(private loggedInService: LoggedInService
    , private dotorUserService: DotorUserService
    , private medialNoteService: MedialNoteService) { }

  ngOnInit(): void {
    this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap(clinicId => {
        this.clinicId = clinicId;
        const logged: string = this.loggedInService.getLoggedUser().uuid;
        return this.dotorUserService.findAuthProviderToFinalize(clinicId, logged)
      })
    ).subscribe((users: any) => {
      this.clinicalUsers = users
      if (this.clinicalUsers.length > 0) {
        this.selectedUserUuid = this.clinicalUsers[0].uuid
        this.errorMessage = undefined
      } else {
        this.errorMessage = "Sorry There is no available provider to forward."
      }
    })
  }
  onUserSelect() {
    const logged: string = this.loggedInService.getLoggedUser().uuid;
    this.medialNoteService.forward(this.noteId, this.selectedUserUuid).subscribe(() => {
      this.changeVisibility.emit('close')
    })
  }
}
