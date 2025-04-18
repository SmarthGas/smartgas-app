import { ClientType } from './client';
import { User } from './user';

export type OrderType = {
  id: string;
  client: ClientType;
  totalPrice: number;
  orderDate: string;
  orderStatus: string;
  swithType: string;
  user: User;
  switchType: string;
  orderCylinderControl: any[];
};
