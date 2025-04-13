import { ClientType } from '../../types/client';
import api from '../api';

// If filters is necessary, it can be added as a parameter to the function

export const getClients = async () => {
  try {
    const { data: response } = await api.get<{
      pagination: any;
      data: ClientType[];
    }>('/client');
    const { data: clients } = response;

    return clients;
  } catch (error) {
    console.error(error);
  }
};
