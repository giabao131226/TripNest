
import {combineReducers} from "redux";
import changeAttHeader from "./reducer";
import getInfo from "./reducerGetID";
import auth from "./auth";
import authAdmin from "./authAdmin";


const allReducers = combineReducers({
    changeAttHeader,
    getInfo,
    auth,
    authAdmin
})
export default allReducers;