import { GasType } from '../../types/gasType';
import api from '../api';

export const getGasTypes = async () => {
  try {
    const { data } = await api.get<GasType[]>('/gas-type');

    return data;
  } catch (error) {
    console.error(error);
  }
};
