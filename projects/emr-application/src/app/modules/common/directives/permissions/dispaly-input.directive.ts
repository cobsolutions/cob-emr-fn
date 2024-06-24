import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserRoleScope } from '../../../administration/model/user/user.role.scope';
import { RoleScopeFinderService } from '../../../security/service/role-scope-finder.service';
import { MatchRole } from './match.role';

@Directive({
  selector: '[dispaly-input]'
})
export class DispalyInputDirective implements OnInit {
  @Input() componentRole?: string[];
  constructor(private el: ElementRef, private renderer: Renderer2, private roleScopeFinderService: RoleScopeFinderService) { }
  ngOnInit(): void {
    this.roleScopeFinderService.find().subscribe((result: UserRoleScope[]) => {
      var roleScope: UserRoleScope = MatchRole.match(result, this.componentRole, undefined);
      if (roleScope !== undefined && roleScope.scope === 'view')
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none')
    });
  }

}
