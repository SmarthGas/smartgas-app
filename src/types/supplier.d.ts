export type SupplierType = {
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

export type SupplierPriceType = {
  id: string;
  cylinderTypeId: string;
  price: number;
  startDate: string;
  endDate: string;
  active: string;
};
