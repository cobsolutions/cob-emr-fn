import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { RenderNavItemsService } from '../../modules/security/service/render-nav-items.service';
import { NavItems } from './_nav';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  navItems: INavData[] | null | undefined;
  constructor(private renderNavItemsService: RenderNavItemsService) { }

  ngOnInit(): void {
    this.renderNavItemsService.renderItems$.subscribe((renderItems: INavData[]) => {
      this.navItems = renderItems;
    })
  }

}
