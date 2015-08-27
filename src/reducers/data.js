export default function data(state = {}, action) {
  switch (action.type) {
  case "DATA_SUCCESS":
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
}
