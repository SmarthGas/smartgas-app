import api from '../api';

interface GetCylinderControlParams {
  params?: any;
}

export const getCylinderControl = async (params?: GetCylinderControlParams) => {
  try {
    const { data: response } = await api.get<any>('/cylinder-control', {
      params: {
        ...params?.params,
      },
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.error(error);
  }
};
