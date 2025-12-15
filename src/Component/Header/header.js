import avatar from "../../assets/img/Logo-final.PNG"
import { CiDiscount1 } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import "./head.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react"
import { changeHeader } from "../actions/actions"
import { Button } from "antd"
import SignIn from "../Signin/signin";
import Register from "../Register/register";
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { message } from "antd";
import { IoPersonCircle } from "react-icons/io5";


function Header() {
    const isActive = useSelector(state => state.changeAttHeader)
    const disPatch = useDispatch();
    const [isOMSignIn, setOMSignIn] = useState(false)
    const [isOMRegister, setOMRegister] = useState(false)
    const [cookie, setCookie] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const [acc, setAcc] = useState({})
    const [reload, setReload] = useState(false)
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
    const handleReload = useCallback(() => {
        setReload(!reload)
    }, [])
    //
    const handleLogout = useCallback(() => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        setCookie("");
        handleReload();
    }, [])
    const handleClickHistory = useCallback(() => {
        messageApi.info("Tính năng sẽ được cập nhật sau!!")
    }, [])
    const items = [
        {
            key: '1',
            label: (<button onClick={handleClickHistory}>Thông Báo</button>)
        },
        {
            key: '2',
            label: (<button onClick={handleClickHistory}>Quản Lý Tài Khoản</button>)
        },
        {
            key: '3',
            label: (<button onClick={handleClickHistory}>Lịch Sử Đặt Phòng</button>)
        },
        {
            key: '4',
            label: (<button onClick={handleLogout} className="button__logout">Đăng Xuất</button>)
        }
    ]
    useEffect(() => {
        const currentCookie = document.cookie;
        if (currentCookie) {
            setCookie(currentCookie);

            fetch("https://servertripnest.onrender.com/api/users?" + currentCookie)
                .then(res => res.json())
                .then(data => {
                    setAcc(data[0]);
                });
        }
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
            {contextHolder}
            <div className={isActive ? "header2" : "header"}>
                <div className={isActive ? "header2__container" : "header__container"}>
                    <div className={isActive ? "header2__tool" : "header__tool"}>
                        <Link to={"/"}>
                            <div className="header__logo">
                                <img src={avatar}></img>
                            </div>
                        </Link>
                        <div className={isActive ? "header2__toolMain" : "header__toolMain"}>
                            <ul>
                                <Link to={"/"}><li>Trang Chủ</li></Link>
                                <li>Phòng</li>
                                <Link to={"/registerboss"}><li>Danh Sách BĐS của bạn</li></Link>
                            </ul>
                            {cookie != "" ? <div className="user">
                                <div className="user__container">
                                    <Dropdown menu={{ items }}>
                                        <a href="#" onClick={e => e.preventDefault()}>
                                            <Space style={{ color: "black" }}>
                                                <IoPersonCircle />
                                                {acc.username}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            </div> : <div className="header__button">
                                <Button type="primary" onClick={openModalSI}><IoMdPerson /> Đăng Nhập</Button>
                                <Button type="primary" onClick={openModalRegister}>Đăng Ký</Button>
                            </div>}

                        </div>
                    </div>
                    {/* <div className={isActive ? "header2__main" : "header__main"}>
                        <ul>
                            <li>HomeStay</li>
                            <li>Villa</li>
                            <li>Resort</li>
                            <li>Voucher</li>
                            <li>Hoạt dộng & Vui chơi</li>
                            <li>Cẩm nang du lịch</li>
                        </ul>
                    </div> */}
                </div>
            </div>
            <SignIn open={isOMSignIn} setCookie={setCookie} handleCancel={handleCancel} setAcc={setAcc} />
            <Register open={isOMRegister} handleCancel={handleCancel2} />
        </>
    )
}
export default Header;