export const IItemTypes = {
  realEstate: "Недвижимость",
  cars: "Авто",
  services: "Услуги",
};

export type ItemTypeMap = {
  Недвижимость: IRealEstates;
  Авто: ICars;
  Услуги: IServices;
};

export type IItemFromType<T extends keyof ItemTypeMap> = ItemTypeMap[T];

export interface IItemsCommon {
  name: string;
  description: string;
  location: string;
}

export interface IRealEstates extends IItemsCommon {
  type: "Недвижимость";
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface ICars extends IItemsCommon {
  type: "Авто";
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface IServices {
  type: "Услуги";
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export type IItems = (IRealEstates | ICars | IServices) & { id: number };

export interface IErrorResponse {
  error: string;
}
