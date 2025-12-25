
import { useState } from "react";
import Swal from 'sweetalert2';
import "./sigin.css"
import { Form, Modal, Input, message } from "antd";
import { FaRegFaceSmileBeam } from "react-icons/fa6";


function Register({ open, handleCancel ,openModalSI,handleCancel2}) {
  const [account, setAccount] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    const chars = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += chars[Math.floor(Math.random() * chars.length)]
    }
    const acc = { ...e, "token": token }
    fetch("http://localhost:3000/taiKhoan", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(acc)
    })
      .then(res => res.json())
      .then(data => {
        openModalSI();
        handleCancel2();
      })
  }

  return (
    <Modal open={open} onCancel={handleCancel} footer={null}>
      <div className="signin">
        <div className="signin__container">
          <FaRegFaceSmileBeam />
          <h1>Đăng Ký</h1>
          <Form onFinish={handleSubmit} onSubmit = {(e) => e.preventDefault()}>
            <Form.Item label="Username"
              name={"username"}
              rules={[{ required: true, message: 'Không được bỏ trống tên đăng nhập!' }]}
            >
              <Input name={"username"} placeholder="Nhập tên đăng nhập"></Input>
            </Form.Item>
            <Form.Item label="Password"
              name={"password"}
              rules={[{ required: true, message: 'Không được bỏ trống mật khẩu!' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu"></Input.Password>
            </Form.Item>
            <Form.Item label="Email"
              name={"email"}
              rules={[{ required: true, message: 'Không được bỏ trống email!' }]}
            >
              <Input placeholder="Nhập email" type={"email"}></Input>
            </Form.Item>
            <Form.Item
              label="Phone"
              name={"phone"}
              rules = {[{required: true,message: 'Không được bỏ trống số điện thoại'}]}
            >
              <Input placeholder="Nhập số điện thoại"></Input>
            </Form.Item>
            <button htmlType="submit">Đăng Ký</button>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default Register;