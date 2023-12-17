// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  provider?: string;
  plan?: string;
  businessId?: string;
  subscribeStatus?: string;
  /**
   * Field to check whether a user has a subscription
   */
  verifiedEmail?: boolean;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
