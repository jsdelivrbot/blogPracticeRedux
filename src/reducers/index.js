import { combineReducers } from "redux";

// 1. we need to import our form reducer from redux-form and combine it with our reducers call
// 2. saves us from creating alot of manual action creators
// 3. We change the alias of formReducer to reducer because of the inert generalness of the keyword
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./reducer_posts";

const rootReducer = combineReducers({
  posts: PostsReducer,
  // very important to hook up to form --keyword form
  form: formReducer
});

export default rootReducer;
