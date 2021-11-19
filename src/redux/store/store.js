import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import {combineReducers, applyMiddleware} from 'redux';
import {AuthReducer, CardReducer, SettingsReducer} from '../reducers/Reducers';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    auth: AuthReducer,
    card: CardReducer,
    settings: SettingsReducer,
});
  
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk)
    )
);

export default store;