import {
  CardReducer,
  LoginReducer,
  SettingsReducer,
  SignupReducer,
} from "../reducers/Reducers";
import { applyMiddleware, combineReducers } from "redux";

import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  auth: LoginReducer,
  signup: SignupReducer,
  card: CardReducer,
  settings: SettingsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
