import { compose, applyMiddleware, createStore ,combineReducers} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers";
import loginRed from './reducers/loginReducers'
import HomeReducers from './reducers/homeReducers';
import OrderReducers from "./reducers/orderReducers";
import customerAddReducers from "./reducers/customerAddReducers";

const persistConfig = {
  key: "root",
  storage: storage
};

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const rootReducer = combineReducers({
  customerAdd: customerAddReducers,
  orders: OrderReducers,
  home : HomeReducers,
  system: reducer,
  login: loginRed,
})


export type AppState = ReturnType<typeof rootReducer>


export default function configureStore() {
  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}
