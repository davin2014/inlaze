import { User } from "./user.interface";

export interface TokenUser {
  
    access_token: string;
    user: User
  }