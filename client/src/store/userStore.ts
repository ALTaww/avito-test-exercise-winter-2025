import { makeAutoObservable } from "mobx";
import { IUserStoreData } from "../types/storeTypes";

class UserStore {
  isAuth = false;
  data: IUserStoreData | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  setIsAuth(boolean: boolean) {
    this.isAuth = boolean;
  }
  setData(data: IUserStoreData) {
    this.data = data;
  }
}

const userStore = new UserStore();
export default userStore;
