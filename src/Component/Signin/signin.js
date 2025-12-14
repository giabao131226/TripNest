import { useCallback, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Modal } from "antd";
import "./signin.css"
import { FaUserCircle, FaUserSecret } from "react-icons/fa";
import { Button, Checkbox, Form, Input } from 'antd';


function SignIn({ open, setCookie, handleCancel, handleOK }) {
    const [data, setData] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])
    const handleSubmit = useCallback((e) => {
        const name = e.userName;
        const password = e.password;
        console.log(`http://localhost:3000/users?name=${name}&password=${password}`)
        fetch(`http://localhost:3000/users?username=${name}&password=${password}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Swal.fire({
                    title: "Chúc mừng!",
                    text: "Bạn đã submit form",
                    icon: "success"
                });
                document.cookie = `token = ${data[0].token}`
                setCookie(document.cookie)
                handleCancel();
            })
            .catch(data => {
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
                        {/* <form onSubmit={handleSubmit}>
                            <label>Tên Người Dùng</label>
                            <input type="text" name="userName" placeholder="Nhập tên người dùng" onChange={handleChange}></input>
                            <label>Mật Khẩu</label>
                            <input type="password" name="password" placeholder="Nhập Mật Khẩu" onChange={handleChange}></input>
                            <button>Đăng Nhập</button>
                        </form> */}
                        <Form labelCol={{ span: 7 }}
                            wrapperCol={{ span: 32 }}
                            style={{ maxWidth: 1000 }}
                            onFinish={handleSubmit}
                            >
                            <Form.Item
                                label = "Username"
                                name="userName"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder="Input your username" />
                            </Form.Item>
                            <Form.Item
                                label = "Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="Input your password!" />
                            </Form.Item>
                                <button>Đăng Nhập</button>
                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default SignIn;