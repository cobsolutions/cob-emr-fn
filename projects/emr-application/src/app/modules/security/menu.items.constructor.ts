import { INavData } from "@coreui/angular-pro";
import { NavItems } from "../../core/layout/_nav";
import { MenuItem } from "./model/nav.item";
import { AdministrationRoleItemConverter } from "./role.item.converter/administration.role.item.converter";
import { ClientRoleItemConverter } from "./role.item.converter/client.role.item.converter";
import { SchedulerRoleItemConverter } from "./role.item.converter/scheduler.role.item.converter";
export class MenuItemsConstructor{
    public static construct(roles: string[]) {
        var menuItems: MenuItem[] = []
        ClientRoleItemConverter.convert(roles, menuItems);
        AdministrationRoleItemConverter.convert(roles, menuItems);
        SchedulerRoleItemConverter.convert(roles, menuItems)
        return this.filterNavItems(menuItems)
    }

    private static filterNavItems(returnedNavItems: MenuItem[]): INavData[] {
        var navMenuItems: INavData[] = NavItems;
        var filteredNavItem: INavData[] = []
        for (var i = 0; i < returnedNavItems.length; i++) {
            var navItm: INavData = navMenuItems.find(item => item.name === returnedNavItems[i].parent)
            filteredNavItem.push(navItm);
            if (returnedNavItems[i].children !== undefined) {
                var parent: INavData = navMenuItems.find(item => item.name === returnedNavItems[i].parent)
                parent.children = parent.children.filter(item => returnedNavItems[i].children.includes(item.name))

            }
        }
        return filteredNavItem;
    }
}