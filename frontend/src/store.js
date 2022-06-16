import { createStore, combineReducers, applyMiddleware, } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
  changeNavbar
} from './redux/reducers/userReducer'
import {
  gigReducer,
  createGigReducer,
  updateGigReducer
} from './redux/reducers/gigReducer'


const reducer = combineReducers({
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    profile: profileReducer,
    navbar:changeNavbar,
    userGigs:gigReducer,
    createGig:createGigReducer,
    updateGig:updateGigReducer
})

const middleware = [thunk];

const store = createStore(
    reducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;