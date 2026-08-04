
import {combineReducers} from "redux";
import changeAttHeader from "./reducer";
import getInfo from "./reducerGetID";
import auth from "./auth";


const allReducers = combineReducers({
    changeAttHeader,
    getInfo,
    auth
})
export default allReducers;