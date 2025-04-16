import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserRoleScope } from '../../../../administration/model/user/user.role.scope';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { MatchRole } from '../match.role';

@Directive({
  selector: '[hide-div]'
})
export class HideDivDirective implements OnInit {
  @Input() componentRole?: string[];
  constructor(private el: ElementRef, private renderer: Renderer2, private loggedInService: LoggedInService) { }
  ngOnInit(): void {
    var roleScope: UserRoleScope = MatchRole.match(this.loggedInService.getLoggedUser().userRoleScope, this.componentRole, undefined);
    console.log(typeof roleScope.scope)
    if (roleScope !== undefined && (roleScope.scope === 'false'))
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none !important')
  }

}
