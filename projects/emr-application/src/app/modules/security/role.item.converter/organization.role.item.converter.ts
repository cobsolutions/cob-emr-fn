import { MenuItem } from "../model/nav.item"
import { Role } from "../model/role"

export class OrganizationRoleItemConverter{
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var menuItem: MenuItem = undefined
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.ADMIN_ROLE)
                menuItem = {
                    parent: "Organization"
                }
        }
        if (menuItem !== undefined)
            menuItems.push(menuItem)
    }
}