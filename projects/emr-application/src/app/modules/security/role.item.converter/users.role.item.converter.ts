import { MenuItem } from "../model/nav.item"
import { Role } from "../model/role"

export class UsersRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {

        var menuItem: MenuItem = {
            parent: "Users",
            children: []
        }
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.USER_ROLE){
                menuItem.children.push('Create User')
                menuItem.children.push('Clinical Users')
                menuItem.children.push('Clerical Users')
            }
        }
        if (menuItem.children.length !== 0)
            menuItems.push(menuItem)
    }

}