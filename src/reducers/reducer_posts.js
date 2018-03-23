import _ from "lodash";

// this imports the types of the actions
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
    // get into our state object and get rid of the key that we are deleting
    // this is to remove the deleted post from the state
    // omit:
    // 1st arg = state object
    // 2nd arg = look at the key of action.payload.id and omit it
      return _.omit(state, action.payload);
    case FETCH_POST:
    // take all the existing state we have and put into the state
    // data we get is from action.payload.data
      return { ...state, [action.payload.data.id]: action.payload.data };
      // gives a case of the action type
    case FETCH_POSTS:
    // what we expect is an array of posts, [post1, post2]
    // lodash allows us to skip the for loop and transform the array into an object with keys
    // .mapkeys: first arguement (action.payload.data) is the array
    // second argument is the key that we want to pull of from each object in the array
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
}
