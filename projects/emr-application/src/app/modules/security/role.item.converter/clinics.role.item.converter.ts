import { MenuItem } from "../model/nav.item"
import { Role } from "../model/role"

export class ClinicsRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {

        var menuItem: MenuItem = {
            parent: "Clinics",
            children: []
        }
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.CLINIC_ROLE)
                menuItem.children.push('View Clinics')
        }
        if (menuItem.children.length !== 0)
            menuItems.push(menuItem)
    }

}