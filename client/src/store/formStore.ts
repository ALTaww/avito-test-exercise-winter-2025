import { makeAutoObservable } from "mobx";
import { IItemsCategories } from "../types/types";
import { cookie } from "../utils";

class FormStore {
  data: IItemsCategories | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setData(newData: IItemsCategories) {
    this.data = newData;
    cookie.setCookie("formData", JSON.stringify(newData));
  }
  changeData(name: string, value: string) {
    const newData: IItemsCategories = { ...this.data, [name]: value };
    this.setData(newData);
  }
  deleteData() {
    this.data = null;
    cookie.deleteCookie("formData");
  }
}

const formStore = new FormStore();
export default formStore;
