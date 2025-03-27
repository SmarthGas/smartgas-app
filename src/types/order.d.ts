import { ClientType } from './client';
import { User } from './user';

export type OrderType = {
  id: string;
  client: ClientType;
  orderCylinderControl: any;
  orderDate: string;
  orderStatus: string;
  swithType: string;
  user: User;
};
