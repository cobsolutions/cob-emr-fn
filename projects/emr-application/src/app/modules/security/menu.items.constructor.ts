import { INavData } from "@coreui/angular-pro";
import { NavItems } from "../../core/layout/_nav";
import { MenuItem } from "./model/nav.item";
import { Role } from "./model/role";
import { AdministrationRoleItemConverter } from "./role.item.converter/administration.role.item.converter";
import { ClientRoleItemConverter } from "./role.item.converter/client.role.item.converter";
import { ClinicsRoleItemConverter } from "./role.item.converter/clinics.role.item.converter";
import { InsuranceCompanyRoleItemConverter } from "./role.item.converter/insurance.compnay.role.item.converter";
import { OrganizationRoleItemConverter } from "./role.item.converter/organization.role.item.converter";
import { ReferringProviderRoleItemConverter } from "./role.item.converter/referring.provider.role.item.converter";
import { SchedulerRoleItemConverter } from "./role.item.converter/scheduler.role.item.converter";
import { UsersRoleItemConverter } from "./role.item.converter/users.role.item.converter";
export class MenuItemsConstructor{
    public static construct(roles: string[]) {
        var menuItems: MenuItem[] = []
        // Dashboard is available for all authenticated users except admin
        if (!roles.includes(Role.ADMIN_ROLE)) {
            menuItems.push({ parent: 'Dashboard' });
        }
        ClientRoleItemConverter.convert(roles, menuItems);
        UsersRoleItemConverter.convert(roles, menuItems)
        ClinicsRoleItemConverter.convert(roles, menuItems);
        InsuranceCompanyRoleItemConverter.convert(roles, menuItems);
        SchedulerRoleItemConverter.convert(roles, menuItems)
        OrganizationRoleItemConverter.convert(roles, menuItems);
        ReferringProviderRoleItemConverter.convert(roles, menuItems)
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