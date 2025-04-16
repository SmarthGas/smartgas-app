export type LendingType = {
  id: string;
  clientId: string;
  userId: string;
  startDate: string;
  endDate: string;
  active: boolean;
  clientSignature: string;
  employeeSignature: string;
  createdAt: string;
  updatedAt: string;
  lendingCylinders: {
    id: string;
    lendingId: string;
    cylinderControlId: string;
    createdAt: string;
    updatedAt: string;
    cylinderControl: {
      id: string;
      cylinderTypeId: string;
      cylinderStatus: 'borrowed' | 'stock' | 'empty';
      gasStatus: 'full' | 'empty';
      createdAt: string;
      updatedAt: string;
    };
  }[];
  client: {
    id: string;
    name: string;
    email: string;
    zipcode: string;
    street: string;
    streetNumber: string;
    complement: string;
    cnpj: string;
    ddd: string;
    cellphone: string;
    segment: string | null;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    password: string;
    name: string;
    email: string;
    cep: string;
    street: string;
    streetNumber: string | null;
    complement: string | null;
    cpf: string;
    ddd: string | null;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
};
