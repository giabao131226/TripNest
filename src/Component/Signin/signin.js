import { useCallback,useState } from "react";
import Swal from 'sweetalert2';
import { Modal } from "antd";
import "./signin.css"
import { FaUserCircle} from "react-icons/fa";
import {Form, Input } from 'antd';
import Link from "antd/es/typography/Link";
import { useSelector,useDispatch } from "react-redux";
import { setInfo } from "../actions/actions";


function SignIn({ open, setCookie, handleCancel, handleOK,setAcc}) {
    const [data, setData] = useState([])
    const [user, setUser] = useState({})
    const acc = useSelector(state => state.getInfo)
    const dispatch = useDispatch()
    const handleSubmit = useCallback((e) => {
        const name = e.userName;
        const password = e.password;
        fetch(`https://servertripnest-4.onrender.com/api/taiKhoan?username=${name}&password=${password}`)
            .then(res => res.json())
            .then(data => {
                document.cookie = `token = ${data[0].token}`
                setCookie(document.cookie)
                setAcc(data[0])
                handleCancel();
                localStorage.setItem("user", JSON.stringify(data[0]));
                dispatch(setInfo(data[0]))
                Swal.fire({
                    icon: "success",
                    title: "Chúc mừng",
                    text: "Chúc mừng bạn đã đăng nhập thành công"
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Đăng Nhập Chưa Thành Công!!",
                    footer: 'Vui lòng kiểm tra lại tên đăng nhập và mật khẩu!!'
                });
            })
    })
    return (
        <>
            <Modal
                open={open} onCancel={handleCancel} onOk={handleOK} footer={null} style={{
                    height: 500,
                    top: 0
                }}>
                <div className="signin">
                    <div className="signin__container">
                        <div className="signin__logo"><FaUserCircle /></div>
                        <h1>Đăng Nhập</h1>
                        <Form labelCol={{ span: 8 }}
                            wrapperCol={{ span: 32 }}
                            style={{ maxWidth: 1000 }}
                            onFinish={handleSubmit}
                            >
                            <Form.Item
                                layout="vertical"
                                label = "Username"
                                name="userName"
                                rules={[{ required: true, message: 'Không được bỏ trống tên đăng nhập' }]}
                            >
                                <Input placeholder="Nhập tên đăng nhập" />
                            </Form.Item>
                            <Form.Item
                                layout="vertical"
                                label = "Password"
                                name="password"
                                rules={[{ required: true, message: 'Không được bỏ trống mật khẩu!' }]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu của bạn" />
                            </Form.Item>
                                <button>Đăng Nhập</button>
                        </Form>
                        <hr></hr>
                        <div className="signin__rule">
                            <p>By signing in or creating an account, you agree with out <Link to ={"/terms"}>Terms & Conditions</Link> and <Link to ={"/terms"}>Privacy Statement</Link></p>
                            <p>All rights reserved</p>
                            <p>Copy right (2025-2026) - Tripnest</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default SignIn;