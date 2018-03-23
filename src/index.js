import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

//Basics of React Router
// Browser Router interacts with History library and decides what to do depending on URL change
// Route (workhorse) -> react component
// 1) that can render inside of any other react components
// 2) provides configuration that if URL is this, render this, customization or configuration of react Router
// 3) There are 2 properties it must have
//    a) 'path' : The path which says what the URL is
//    b) 'component' : The component that will render at that router
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Necessary for network requests / API calls, when using axios
import promise from "redux-promise";

import reducers from "./reducers";
import PostsIndex from "./components/posts_index";
import PostsNew from "./components/posts_new";
import PostsShow from "./components/posts_show";


// This is applying the middleware redux promise.
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      {/*div necessary, single div to wrap the routes  */}
      {/*possible to hardcode components that will always show regardless of route  */}
      <div>
        Header
        {/*The switch component takes in a collection of routes  */}
        {/*Decide to only render only the first route that matches the URL (goes top down in the Switch), most specific should be at the top  */}
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          {/*using the :id, is a wildcard that will change the URL but show the component PostsShow  */}
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
