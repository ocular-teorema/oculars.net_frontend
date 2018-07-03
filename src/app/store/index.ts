import { ActionReducerMap } from '@ngrx/store';
import { commonReducer } from './reducer';

export interface State {
  common: {};
}

export const reducers: ActionReducerMap<State> = {
  common: commonReducer,
};
