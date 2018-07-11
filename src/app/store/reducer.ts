import { CommonActionsUnion, CommonTypes } from "./actions";

export function commonReducer(state: {}, action: CommonActionsUnion): {} {
  switch (action.type) {
    case CommonTypes.ADD_USER: {
      return {
        ...state,
        userModel: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
