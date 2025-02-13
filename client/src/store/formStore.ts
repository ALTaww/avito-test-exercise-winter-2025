import { makeAutoObservable } from "mobx";
import { IItemsCategories } from "../types/types";

class FormStore {
  data: IItemsCategories | {} = {};

  constructor() {
    makeAutoObservable(this);
  }

  setData(newData: IItemsCategories) {
    this.data = newData;
  }
}

const formStore = new FormStore();
export default formStore;
