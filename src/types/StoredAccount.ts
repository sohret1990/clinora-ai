import { UserProfile } from "./UserProfile";


export interface StoredAccount extends UserProfile {
  password: string;
}
