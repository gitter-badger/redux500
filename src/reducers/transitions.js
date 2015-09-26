import { TRANSITION_REQUEST, TRANSITION_SUCCESS } from "../constants/ActionTypes";

export default function transitions(state = {}, action = {}) {
  switch (action.type) {
  case TRANSITION_REQUEST:
    return {
      ...state,
      isTransitioning: true
    };
  case TRANSITION_SUCCESS:
    return {
      ...state,
      isTransitioning: false
    };
  default:
    return state;
  }
}
