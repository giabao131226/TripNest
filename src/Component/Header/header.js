import avatar from "../../assets/img/Logo.png" 
import { CiDiscount1 } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import "./head.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useCallback, useEffect, useState} from "react"
import {changeHeader} from "../actions/actions"
import {Button} from "antd"
import SignIn from "../Signin/signin";
import Register from "../Register/register";

function Header(){
    const isActive = useSelector(state => state.changeAttHeader)
    const disPatch = useDispatch();
    const [isOMSignIn,setOMSignIn] = useState(false)
    const [isOMRegister,setOMRegister] = useState(false)
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
    //
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                disPatch(changeHeader(true))
            } else {
                disPatch(changeHeader(false))
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={isActive ? "header2" : "header"}>
                <div className={isActive ? "header2__container" : "header__container"}>
                    <div className={isActive ? "header2__tool" : "header__tool"}>
                        <Link to = {"/"}>
                            <div className="header__logo">
                                <img src={avatar}></img>
                            </div>
                        </Link>
                        <ul className={isActive ? "header2__toolMain" : "header__toolMain"}>
                            <li><CiDiscount1/> Khuyễn mãi</li>
                            <li>Hỗ Trợ</li>
                            <li>Hợp tác với chúng tôi</li>
                            <li>Đặt chỗ</li>
                            <li>
                                <Button type="primary" onClick={openModalSI}><IoMdPerson /> Đăng Nhập</Button>
                                <Button type="primary" onClick={openModalRegister}>Đăng Ký</Button>
                            </li>
                        </ul>
                    </div>
                    <div className={isActive ? "header2__main" : "header__main"}>
                        <ul>
                            <li>HomeStay</li>
                            <li>Villa</li>
                            <li>Resort</li>
                            <li>Voucher</li>
                            <li>Hoạt dộng & Vui chơi</li>
                            <li>Cẩm nang du lịch</li>
                        </ul>
                    </div>
                </div>
            </div>
            <SignIn open = {isOMSignIn} handleCancel = {handleCancel}/>
            <Register open = {isOMRegister} handleCancel = {handleCancel2}/>
        </>
    )
}
export default Header;