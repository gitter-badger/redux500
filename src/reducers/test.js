import { TEST_SUCCESS } from "../constants/actions";

export default function test(state = {}, action = {}) {
  switch (action.type) {
  case TEST_SUCCESS:
    return state;
  default:
    return state;
  }
}
