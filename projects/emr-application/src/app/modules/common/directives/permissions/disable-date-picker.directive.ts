import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { DatePickerComponent } from '@coreui/angular-pro';
import { UserRoleScope } from '../../../administration/model/user/user.role.scope';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { MatchRole } from './match.role';

@Directive({
  selector: '[disable-date-picker]'
})
export class DisableDatePickerDirective implements OnInit {
  @Input() componentRole?: string[]
  constructor(private el: ElementRef, private datePickerComponent: DatePickerComponent, private loggedInService: LoggedInService) { }
  ngOnInit(): void {

    var roleScope: UserRoleScope = MatchRole.match(this.loggedInService.getLoggedUser().userRoleScope, this.componentRole);
    if (roleScope !== undefined && roleScope.scope === 'view')
      this.datePickerComponent.setDisabledState(true)

  }

}
