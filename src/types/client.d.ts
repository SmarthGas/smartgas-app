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
  cylinderTypeId: string;
  price: number;
  active: string;
  cylinderType: {
    gasType: {
      gasName: string;
    };
    size: number;
  };
};
