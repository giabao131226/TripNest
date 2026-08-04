import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useState,useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

function PageDefault() {
    const [isOMSignIn, setOMSignIn] = useState(false)
    const [isOMRegister, setOMRegister] = useState(false)
    const dispatch = useDispatch();

    //Cài đặt cho modal Signin
    const openModalSI = useCallback(() => {
        setOMSignIn(true);
    },[])
    const handleCancel = useCallback(() => {
        setOMSignIn(false)
    },[])
    //Cài đặt cho modal Register
    const openModalRegister = useCallback(() => {
        setOMRegister(true);
    },[])
    const handleCancel2 = useCallback(() => {
        setOMRegister(false)
    },[])

    const actionAuth = (payload) => {
        return {
            type: "UPDATE",
            payload
        }
    }

    useEffect(() => {
        fetch("http://localhost:5000/account/auth",{
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    dispatch(actionAuth(data.user));
                }
            })
    },[])

    return (
        <>
            <div className="pd">
                <div className="pd__container">
                    <Header 
                        isOMSignIn = {isOMSignIn}
                        isOMRegister = {isOMRegister}
                        openModalSI = {openModalSI} 
                        handleCancel = {handleCancel}
                        openModalRegister = {openModalRegister}
                        handleCancel2 = {handleCancel2}
                    />
                    <div className="pd__main">
                        <Outlet context={openModalSI} />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default PageDefault;