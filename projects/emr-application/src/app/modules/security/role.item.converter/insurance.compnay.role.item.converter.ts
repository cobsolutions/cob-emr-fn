import { MenuItem } from "../model/nav.item"
import { Role } from "../model/role"

export class InsuranceCompanyRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {

        var menuItem: MenuItem = {
            parent: "Insurance Company",
            children: []
        }
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.INSURANCE_COMPANY_ROLE)
                menuItem.children.push('View Companies')
        }
        if (menuItem.children.length !== 0)
            menuItems.push(menuItem)
    }

}