import { TEST_SUCCESS } from "../constants/ActionTypes";

export default function test(state = {}, action = {}) {
  switch (action.type) {
  case TEST_SUCCESS:
    return state;
  default:
    return state;
  }
}
