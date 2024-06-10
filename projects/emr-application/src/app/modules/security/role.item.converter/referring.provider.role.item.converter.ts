import { MenuItem } from "../model/nav.item"
import { Role } from "../model/role"

export class ReferringProviderRoleItemConverter{
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var menuItem: MenuItem = undefined
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.REFERRING_DOCTOR_ROLE)
                menuItem = {
                    parent: "Referring-Provider"
                }
        }
        if (menuItem !== undefined)
            menuItems.push(menuItem)
    }
    
}