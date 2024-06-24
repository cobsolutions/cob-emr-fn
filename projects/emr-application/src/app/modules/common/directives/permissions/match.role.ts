import { UserRoleScope } from "../../../administration/model/user/user.role.scope";

export class MatchRole {
    public static match(userRoles: UserRoleScope[], parent: string[], child?: string): UserRoleScope {
        if (parent && child)
            throw new Error('can\'t set role component and child component');
        if (parent)
            return userRoles.filter(userRole => parent.includes(userRole.role))[0];
        return undefined;
    }
}