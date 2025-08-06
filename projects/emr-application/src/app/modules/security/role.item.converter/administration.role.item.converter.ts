import { MenuItem } from "../model/nav.item"
import { Role } from "../model/role"

export class AdministrationRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {

        var menuItem: MenuItem = {
            parent: "Administration",
            children: []
        }
        for (var i = 0; i < roles.length; i++) {
        }
        if (menuItem.children.length !== 0)
            menuItems.push(menuItem)
    }
}