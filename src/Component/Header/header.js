import avatar from "../../assets/img/Logo-final.PNG"
import { CiDiscount1 } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import "./head.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react"
import { changeHeader } from "../actions/actions"
import { Button } from "antd"
import SignIn from "../Signin/signin";
import Register from "../Register/register";
import { Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

function Header() {
    const isActive = useSelector(state => state.changeAttHeader)
    const disPatch = useDispatch();
    const [isOMSignIn, setOMSignIn] = useState(false)
    const [isOMRegister, setOMRegister] = useState(false)
    const [cookie,setCookie] = useState('')
    //Cài đặt cho modal Signin
    const openModalSI = useCallback(() => {
        setOMSignIn(true);
    }, [])
    const handleCancel = useCallback(() => {
        setOMSignIn(false)
    }, [])
    //Cài đặt cho modal Register
    const openModalRegister = useCallback(() => {
        setOMRegister(true);
    }, [])
    const handleCancel2 = useCallback(() => {
        setOMRegister(false)
    }, [])
    //
    const handleLogout = useCallback(() => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        setCookie(document.cookie);
    },[])
    const items = [
        {
            key: '1',
            label: (<p>Khách Hàng</p>)
        },
        {
            key: '2',
            label: (<p>Chủ Cơ Sở</p>)
        },
        {
            key: '3',
            label: (<button onClick={handleLogout}>Đăng Xuất</button>)
        }
    ]
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
                        <Link to={"/"}>
                            <div className="header__logo">
                                <img src={avatar}></img>
                            </div>
                        </Link>
                        <ul className={isActive ? "header2__toolMain" : "header__toolMain"}>
                            <li><CiDiscount1 /> Khuyễn mãi</li>
                            <li>Hỗ Trợ</li>
                            <li>Hợp tác với chúng tôi</li>
                            <li>Đặt chỗ</li>
                            <li>
                                {cookie != "" ? <div className="user">
                                    <div className="user__container">
                                        <Dropdown menu={{items}}>
                                            <a onClick={e => e.preventDefault()}>
                                                <Space>
                                                    Account
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div> : <>
                                    <Button type="primary" onClick={openModalSI}><IoMdPerson /> Đăng Nhập</Button>
                                    <Button type="primary" onClick={openModalRegister}>Đăng Ký</Button>
                                </>}
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
            <SignIn open={isOMSignIn} setCookie = {setCookie} handleCancel={handleCancel} />
            <Register open={isOMRegister} handleCancel={handleCancel2} />
        </>
    )
}
export default Header;