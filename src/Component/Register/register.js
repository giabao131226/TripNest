
import { useState } from "react";
import Swal from 'sweetalert2';
import "./sigin.css"
import { Modal } from "antd";
import { FaRegFaceSmileBeam } from "react-icons/fa6";


function Register({open,handleCancel}) {
  const [account, setAccount] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const chars = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z',
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  '0','1','2','3','4','5','6','7','8','9'
];
    let token = "";
    for(let i = 0;i<25;i++){
      token+=chars[Math.floor(Math.random()*chars.length)]
    }
    const acc = {...account,"token":token}
    fetch("http://localhost:3000/users",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(acc)
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: "Chúc mừng!",
          text: "Bạn đã submit form",
          icon: "success"
          });
      })
}

  return (
    <Modal open = {open} onCancel = {handleCancel} footer = {null}>
      <div className="signin">
      <div className="signin__container">
        <FaRegFaceSmileBeam />
        <h1>Đăng Ký</h1>
        <form onSubmit={handleSubmit}>
          <label>Họ Và Tên</label>
          <input type="text" name="name" placeholder = "Nhập tên người dùng"onChange={handleChange} />
          <label>Mật Khẩu</label>
          <input type="password" name="password" placeholder = "Nhập Mật Khẩu"onChange={handleChange} />
          <label>Email</label>
          <input type="email" name="email" placeholder = "Nhập email" onChange={handleChange} />
          <button type="submit">Đăng Ký</button>
        </form>
      </div>
    </div>
    </Modal>
  );
}

export default Register;