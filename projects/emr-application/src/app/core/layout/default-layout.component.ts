import { Component, OnInit, OnDestroy } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { AnyKindOfDictionary } from 'lodash';
import { combineLatest, map, switchMap, tap, filter, Subscription, catchError, of, timeout, take } from 'rxjs';
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
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  navItems: INavData[] | null | undefined;
  isLoading: boolean = true;
  private subscription: Subscription;

  constructor(private renderNavItemsService: RenderNavItemsService, private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    // Get logged user observable with error handling and timeout
    const loggedUser$ = this.loggedInService.getObservableLoggedUser().pipe(
      timeout(8000),
      catchError(error => {
        console.error('Error loading logged user:', error);
        return of(null);
      })
    );

    // Filter out null values from renderItems$ to wait for actual menu items
    const renderItems$ = this.renderNavItemsService.renderItems$.pipe(
      filter((items): items is INavData[] => items !== null && items.length > 0),
      take(1) // Only take the first valid emission
    );

    this.subscription = combineLatest([loggedUser$, renderItems$])
      .pipe(
        timeout(10000), // Overall timeout of 10 seconds
        map((result: any) => {
          // If user loading failed, just return the render items
          if (!result[0]) {
            return result[1];
          }

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
        }),
        catchError(error => {
          console.error('Timeout or error in layout initialization:', error);
          // Return current renderItems value as fallback
          const currentItems = this.renderNavItemsService.renderItems$.getValue();
          return of(currentItems || []);
        })
      ).subscribe({
        next: (result: any) => {
          this.isLoading = false;
          this.navItems = result;
        },
        error: (error) => {
          console.error('Error in layout initialization:', error);
          this.isLoading = false;
          // Try to use current value as fallback
          this.navItems = this.renderNavItemsService.renderItems$.getValue() || [];
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
