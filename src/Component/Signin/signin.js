import { useCallback, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom"
import { Modal } from "antd";
import "./signin.css"
import { FaUserCircle, FaUserSecret } from "react-icons/fa";


function SignIn({open,handleCancel,handleOK}){
    const [data,setData] = useState([])
    const [user,setUser] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    },[])
    const handleChange = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(user => ({...user,[name]:value}))
    },[])
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        let isSuccess = false;
        let acc;
        for(let i = 0;i<data.length;i++){
            if(data[i].name == user.userName && data[i].password==user.password){
                isSuccess = true;
                acc = data[i];
                break;
            }
        }
        if(isSuccess===true){
            Swal.fire({
                title: "Chúc mừng!",
                text: "Bạn đã submit form",
                icon: "success"
            });
            document.cookie = `token = ${acc.token}`
            navigate("/")
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Đăng Nhập Chưa Thành Công!!",
                footer: 'Vui lòng kiểm tra lại tên đăng nhập và mật khẩu!!'
            });
        }
    })
    return (
        <>
            <Modal open = {open} onCancel={handleCancel} onOk={handleOK} footer = {null} bodyStyle={{
    height: 500,
    top: 0
  }}>
            <div className="signin">
                <div className="signin__container">
                    <FaUserCircle />
                    <h1>Đăng Nhập</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Tên Người Dùng</label>
                        <input type="text" name="userName" placeholder="Nhập tên người dùng" onChange={handleChange}></input>
                        <label>Mật Khẩu</label>
                        <input type="text" name="password" placeholder="Nhập Mật Khẩu" onChange={handleChange}></input>
                        <button>Đăng Nhập</button>
                    </form>
                </div>
            </div>
            </Modal>
        </>
    )
}
export default SignIn;