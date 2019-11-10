import { compose, applyMiddleware, createStore ,combineReducers} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers";
import loginRed from './reducers/loginReducers'
import HomeReducers from './reducers/homeReducers';
import OrderReducers from "./reducers/orderReducers";
import customerAddReducers from "./reducers/customerAddReducers";
import customerDeleteReducers from "./reducers/customerDeleteReducers";
import customerEditReducers from "./reducers/customerEditReducers";
import productAddReducers from "./reducers/productAddReducers";
import addCashReducers from "./reducers/addCashReducers";
import getProductReducers from "./reducers/getProductReducers";
import productEditReducers from "./reducers/productEditReducers";
import addOrderReducers from "./reducers/addOrderReducers";
import customerPriceGetProductReducers from "./reducers/customerPriceGetProductReducers";
import addCustomerPriceReducers from "./reducers/addCustomerPriceReducers";
import customerDefinedPriceReducers from "./reducers/customerDefinedPriceReducers";
import customerPriceEditReducers from  "./reducers/customerPriceEditReducers";
import productForCustomerReducers from "./reducers/productForCustomerReducers";

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
  productForCustomer: productForCustomerReducers,
  customerPriceEdit: customerPriceEditReducers,
  customerDefinedPrice: customerDefinedPriceReducers,
  addCustomerPrice: addCustomerPriceReducers,
  customerPriceGetProduct: customerPriceGetProductReducers,
  addOrder: addOrderReducers,
  productEdit: productEditReducers,
  products: getProductReducers,
  addCash:addCashReducers,
  productAdd: productAddReducers,
  customerEdit: customerEditReducers, 
  customerDelete: customerDeleteReducers,
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
