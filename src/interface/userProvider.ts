import { IUserLoginAws } from "./userLoginAws";

export interface IUserProvider {
  user: IUserLoginAws | null;
  setUser: React.Dispatch<React.SetStateAction<IUserLoginAws | null>>;
}