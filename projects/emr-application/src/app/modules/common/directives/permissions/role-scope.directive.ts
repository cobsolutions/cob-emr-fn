import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../../../security/service/permission.service';

@Directive({
  selector: '[appRoleScope]'
})
export class RoleScopeDirective implements OnInit {
  @Input() appRoleScope: string;
  @Input() appRoleScopeRequireModify: boolean = false;

  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    const allowed = this.appRoleScopeRequireModify
      ? this.permissionService.canModify(this.appRoleScope)
      : this.permissionService.canView(this.appRoleScope);

    if (allowed && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!allowed && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
