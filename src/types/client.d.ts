import { CylinderType } from './cylinder';

export type ClientType = {
  id: string;
  name: string;
  email: string;
  zipcode: string;
  cnpj: string;
  street: string;
  streetNumber: string;
  complement: string;
  ddd: string;
  cellphone: string;
};

export type ClientPriceType = {
  id: string;
  CylinderType: CylinderType;
  price: number;
  startDate: string;
  endDate: string;
  active: string;
};
