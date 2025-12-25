
import {combineReducers} from "redux";
import changeAttHeader from "./reducer";
import getInfo from "./reducerGetID";


const allReducers = combineReducers({
    changeAttHeader,
    getInfo
})
export default allReducers;