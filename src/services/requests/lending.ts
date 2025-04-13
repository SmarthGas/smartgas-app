import api from '../api';

interface GetLendingParams {
  params?: {
    page?: number;
    itens?: number;
    clientId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    active?: boolean;
    clientSignature?: string;
    employeeSignature?: string;
  };
}

export const getLending = async (params?: GetLendingParams) => {
  try {
    const { data: response } = await api.get<any>('/lending/', {
      params: {
        ...params?.params,
      },
    });

    const { data } = response;

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
