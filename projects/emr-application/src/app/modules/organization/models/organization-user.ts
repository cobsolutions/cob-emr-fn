import { User } from "../../administration/model/user/user";

export interface OrganizationUser extends User {
    userName?: string;
    active?: boolean;
    status?: string;
    isPendingDoctor?: boolean;
    isPendingActivation?: boolean;
    signatureCaptured?: boolean;
    otpVerified?: boolean;
}
