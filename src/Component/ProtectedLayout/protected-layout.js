import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

export default function ProtectedLayout(){
    const openModalSI = useOutletContext();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth).payload;
    if(!user){
        openModalSI();
        return null;
    }else{
        return <Outlet />
    }
}