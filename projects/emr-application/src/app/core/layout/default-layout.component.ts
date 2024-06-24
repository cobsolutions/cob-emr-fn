import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { AnyKindOfDictionary } from 'lodash';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { UserRoleScope } from '../../modules/administration/model/user/user.role.scope';
import { LoggedInUser } from '../../modules/security/model/loggedin.user';
import { LoggedInService } from '../../modules/security/service/loggedIn/logged-in.service';
import { RenderNavItemsService } from '../../modules/security/service/render-nav-items.service';
import { NavItems } from './_nav';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  navItems: INavData[] | null | undefined;
  constructor(private renderNavItemsService: RenderNavItemsService, private loggedInService: LoggedInService) { }

  ngOnInit(): void {

    combineLatest([this.loggedInService.load(), this.renderNavItemsService.renderItems$])
      .pipe(
        map((result: any) => {
          var userRoleScope: UserRoleScope[] = result[0].userRoleScope;
          var renderItems: INavData[] = result[1];
          if (userRoleScope !== undefined)
            var hasViewUserPermissions = userRoleScope.some(item => item.scope === 'view' && item.role === 'user-role');
          if (hasViewUserPermissions) {
            return renderItems.map(renderItem => {
              if (renderItem.name === 'Users') {
                renderItem.children = renderItem.children.filter(
                  child => !(child.name === "Create User" && child.url === "users/create")
                );
                return renderItem;
              } else {
                return renderItem
              }

            })
          } else {
            return result[1];
          }
        })
      ).subscribe((result: any) => {
        this.navItems = result;
      })
  }

}
