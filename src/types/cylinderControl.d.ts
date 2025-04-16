export type CylinderControlType = {
  id: string;
  cylinderTypeId: string;
  cylinderStatus: 'borrowed' | 'available' | string; // ajuste conforme os possíveis valores
  gasStatus: 'full' | 'empty' | string; // idem
  createdAt: string; // ou Date, se você estiver convertendo
  updatedAt: string;
  cylinderType: {
    id: string;
    gasTypeId: string;
    size: number;
    createdAt: string;
    updatedAt: string;
  };
};
