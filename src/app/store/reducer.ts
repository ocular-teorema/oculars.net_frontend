import { CommonActionsUnion, CommonTypes } from "./actions";

export function commonReducer(state: {}, action: CommonActionsUnion): {} {
  switch (action.type) {
    case CommonTypes.ADD_USER: {
      return {
        ...state,
        ...action.payload
      };
    }

    default: {
      return state;
    }
  }
}
