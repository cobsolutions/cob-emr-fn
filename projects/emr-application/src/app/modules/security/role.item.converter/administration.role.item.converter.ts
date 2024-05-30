import { MenuItem } from "../model/nav.item"
import { Role } from "../model/role"

export class AdministrationRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        
        var menuItem: MenuItem = {
            parent: "Administration",
            children: []
        }
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.CLINIC_ROLE)
                menuItem.children.push('Clinics')
            if (roles[i] === Role.USER_ROLE)
                menuItem.children.push('Users')
            if (roles[i] === Role.INSURANCE_COMPANY_ROLE)
                menuItem.children.push('Insurance Company')

        }
        if (menuItem.children.length !== 0)
            menuItems.push(menuItem)
    }
}