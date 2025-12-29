import avatar from "../../assets/img/Logo-final.PNG"
import { IoMdPerson } from "react-icons/io";
import "./head.css";
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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
        messageApi.open({
            "type" : "success",
            "content": "Tính năng sẽ được cập nhật sau"
        })
    }, [])
    const handleNavigateProperty = useCallback(() => {
        if(acc.id != ""){
            console.log(acc.vaiTro)
            if(acc.vaiTro=="qtv" || acc.vaiTro=="chuCoSo") navigate("/your-property");
            else{
                messageApi.open({
                    "type": "error",
                    "content": "Bạn Không Đủ Quyền Để Truy Cập Trang Này. Hãy Nâng Cấp Quyền Nhé!!"
                })
                navigate("/quan-ly-tai-khoan")
            }
        }else{
            messageApi.open({
                "type": "error",
                "content": "Bạn phải đăng nhập trước đã"
            })
            openModalSI();
        }
    },[acc])
    const items = [
        {
            key: '1',
            label: (<button onClick={handleClickHistory}>Thông Báo</button>)
        },
        {
            key: '2',
            label: (<Link to = {"/quan-ly-tai-khoan"}><button >Quản Lý Tài Khoản</button></Link>)
        },
        {
            key: '3',
            label: (<Link to = {"/history-book"}><button>Lịch Sử Đặt Phòng</button></Link>)
        },
        {
            key: '4',
            label: (<Link to = {"/kiem-duyet"}><button className={acc.vaiTro != "qtv" ? "display__none" : ""}>Kiểm duyệt thông tin phòng</button></Link>)
        },
        {
            key: '5',
            label: (<button onClick={handleLogout} className="button__logout">Đăng Xuất</button>)
        }
    ]
    useEffect(() => {
        const currentCookie = document.cookie;
        if (currentCookie) {
            setCookie(currentCookie);
            fetch("https://servertripnest-4.onrender.com/api/taiKhoan?" + currentCookie)
                .then(res => res.json())
                .then(data => {
                    setAcc(data[0]);
                });
        }
        const handleScroll = () => {
            if (window.scrollY > 200||window.location.pathname!="/") {
                disPatch(changeHeader(true))
            } else {
                disPatch(changeHeader(false))
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [acc]);
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
                                <li><button onClick={handleNavigateProperty} className={isActive ? "text-color-black bg-none" : "text-color-white bg-none"}>Danh Sách BĐS của bạn</button></li>
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
                </div>
            </div>
            <SignIn open={isOMSignIn} setCookie={setCookie} handleCancel={handleCancel} setAcc={setAcc} />
            <Register open={isOMRegister} handleCancel={handleCancel2} openModalSI  = {openModalSI} handleCancel2  ={handleCancel2}/>
        </>
    )
}
export default Header;