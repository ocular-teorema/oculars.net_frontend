import { Action } from "@ngrx/store";
import { UserModule } from '../services/user/user.type';

export enum CommonTypes {
  ADD_USER = 'ADD_USER'
}

export class AddUser implements Action {
  readonly type = CommonTypes.ADD_USER;
  constructor(public payload: UserModule.IUser) {};
}

export type CommonActionsUnion = AddUser;