import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserRoleScope } from '../../../administration/model/user/user.role.scope';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { MatchRole } from './match.role';

@Directive({
  selector: '[disable-input]'
})
export class DisableInputDirective implements OnInit {
  @Input() componentRole?: string[]
  constructor(private el: ElementRef, private renderer: Renderer2, private loggedInService: LoggedInService) { }
  ngOnInit(): void {
    var roleScope: UserRoleScope = MatchRole.match(this.loggedInService.getLoggedUser().userRoleScope, this.componentRole);
    if (roleScope !== undefined && roleScope.scope === 'view') {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      if (!(this.el.nativeElement.type === 'checkbox' || this.el.nativeElement.type === 'radio'))
        this.renderer.setStyle(this.el.nativeElement, 'background-color', 'white')
    }
  }

}
