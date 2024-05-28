import { MenuItem } from "../model/nav.item"
import { Role } from "../model/role"

export class SchedulerRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var menuItem: MenuItem = undefined
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.CALENDAR_ROLE)
                menuItem = {
                    parent: "Scheduler"
                }
        }
        if (menuItem !== undefined)
            menuItems.push(menuItem)
    }
}