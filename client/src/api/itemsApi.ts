import { $host } from ".";
import {
  IErrorResponse,
  IItemFromType,
  IItems,
  ItemTypeMap,
} from "../types/types";

class ItemsApi {
  async createItem<T extends keyof ItemTypeMap>(
    itemData: { type: T } & IItemFromType<T>, // itemData включает type + нужные поля
    signal: AbortSignal
  ): Promise<IItems | IErrorResponse> {
    const { data } = await $host.post("/items", itemData, { signal });
    return data;
  }

  async getAllItems(signal: AbortSignal): Promise<IItems[]> {
    const { data } = await $host.get("/items", { signal });
    return data;
  }

  async getItem(id: number, signal: AbortSignal): Promise<IItems | string> {
    const { data } = await $host.get(`/items/${id}`, { signal });
    return data;
  }

  async updateItem(
    id: number,
    signal: AbortSignal,
    itemData: Partial<IItems>
  ): Promise<IItems | string> {
    const { data } = await $host.put(`/items/${id}`, itemData, { signal });
    return data;
  }

  async deleteItem(
    id: number,
    signal: AbortSignal
  ): Promise<undefined | string> {
    const { data } = await $host.delete(`/items/${id}`, { signal });
    return data;
  }
}

export const itemsApi = new ItemsApi();
