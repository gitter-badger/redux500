import keyMirror from "react/lib/keyMirror";

const ActionTypes = keyMirror({

  // convention: feature_action_status
  
  PHOTO_LOAD_REQUEST: null,
  PHOTO_LOAD_SUCCESS: null,
  PHOTO_LOAD_FAILURE: null,

  TEST_SUCCESS: null

});


export default ActionTypes;
