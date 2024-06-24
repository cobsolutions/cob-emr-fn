import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRoleScope } from '../../../administration/model/user/user.role.scope';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { MatchRole } from './match.role';

@Directive({
  selector: '[readonly-form]'
})
export class ReadonlyFormDirective  implements OnInit{
  @Input() componentRole?: string[]
  constructor(private el: ElementRef, private form: NgForm, private loggedInService: LoggedInService) { }
  ngOnInit(): void {
    this.loggedInService.load().subscribe((result: LoggedInUser) => {
      var roleScope: UserRoleScope = MatchRole.match(result.userRoleScope,this.componentRole)
      if (roleScope !== undefined && roleScope.scope === 'view')
      setTimeout(() => {
        Object.keys(this.form.controls).forEach(controlName => {
          // Setting readonly property to true
          const inputElement = this.el.nativeElement.querySelector(`[ng-reflect-name='${controlName}']`);
          if (inputElement && inputElement.type === 'text')
            inputElement.readOnly = true;
          if (inputElement && inputElement.type === 'select-one')
            inputElement.disabled = true;
          inputElement.style = 'background-color:white'
        });
      }, 1)
    })
  }

}
