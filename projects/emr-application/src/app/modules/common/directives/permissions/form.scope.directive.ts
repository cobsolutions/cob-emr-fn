import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRoleScope } from '../../../administration/model/user/user.role.scope';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Directive({
  selector: '[form-role-scope]'
})
export class FormScopeDirective implements OnInit {
  @Input() componentScopes: string[];
  constructor(private el: ElementRef, private renderer: NgForm, private loggedInService: LoggedInService) { }
  ngOnInit(): void {

    var roleScope: UserRoleScope = this.match(this.loggedInService.getLoggedUser().userRoleScope, this.componentScopes)
    if (roleScope !== undefined && roleScope.scope === 'view')
      setTimeout(() => {
        Object.keys(this.renderer.controls).forEach(controlName => {
          // Setting readonly property to true
          const inputElement = this.el.nativeElement.querySelector(`[ng-reflect-name='${controlName}']`);
          if (inputElement && inputElement.type === 'text')
            inputElement.readOnly = true;
          if (inputElement && inputElement.type === 'select-one')
            inputElement.disabled = true;
        });
      }, 1)

  }
  private match(userRoles: UserRoleScope[], componentScope: string[]): UserRoleScope {
    return userRoles.filter(item => componentScope.includes(item.role))[0];
  }
}
