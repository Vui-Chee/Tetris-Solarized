import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { soundMiddlewares } from "./middleware/sounds";

const initialState = {};

const middleware = [thunk, ...soundMiddlewares];

const composedFunc =
  process.env.NODE_ENV === "development"
    ? compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : compose(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composedFunc);

export default store;
