import { User } from './user';

export interface Supplier extends Partial<User> {
  cnpj: string;
}
