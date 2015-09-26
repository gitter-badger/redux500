import { TRANSITION_REQUEST, TRANSITION_SUCCESS } from "../constants/ActionTypes";

export function startTransition() {
  return {
    type: TRANSITION_REQUEST
  };
}

export function endTransition() {
  return {
    type: TRANSITION_SUCCESS
  };
}
