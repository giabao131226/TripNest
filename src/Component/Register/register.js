
import { useState } from "react";
import Swal from 'sweetalert2';
import "./sigin.css"
import { Modal } from "antd";
import smileGirl from "../../assets/img/ImgSignIn.png"
import Input from "../InputComponent/input";
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "antd/es/typography/Link";


function Register({ open, handleCancel, openModalSI, handleCancel2 }) {
  const [account, setAccount] = useState({});
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name+" "+value);
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://servertripnest-4.onrender.com/api/taiKhoan"
    fetch("http://localhost:5000/account/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(account)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "🎉 Welcome back!",
            text: "Login successful! You are ready to explore TripNest 🏡✨",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: "#ffffff",
            color: "#333",
            iconColor: "#22c55e",
            toast: true,
            position: "top-end"
          });
          handleCancel2();
        } else {
          console.log("có lỗi")
          setErrors(data.errorsValidate)
        }
      })
  }

  return (
    <Modal open={open} onCancel={handleCancel} footer={null}>
      <div className="signInFormVienIMG">
        <img src={smileGirl}></img>
      </div>
      <h1 className="m-0 text-align-center text-purple">Sign Up</h1>
      <form className="d-flex flex-column gap-y-2" methods="POST" id="sign-in-form" onSubmit={handleSubmit}>

        <Input title={"UserName"} nameInput={"username"} type={"text"} placeholder={"Please enter your name..."} icon={<IoPerson className="iconSignIn" />} onChangeFunction={handleChange} errorContent={errors.userName} />
        <Input title={"PassWord"} nameInput={"password"} type={"password"} placeholder={"Please enter your password..."} icon={<FaLock className="iconSignIn" />} onChangeFunction={handleChange} errorContent={errors.password} />
        <Input title={"Confirm PassWord"} nameInput={"confirmPassword"} type={"password"} placeholder={"Please enter your password..."} icon={<FaLock className="iconSignIn" />} onChangeFunction={handleChange} errorContent={errors.password} />
        <Input title={"Email"} nameInput={"email"} type={"email"} placeholder={"Please enter your email address..."} icon={<MdEmail className="iconSignIn" />} onChangeFunction={handleChange} errorContent={errors.email} />
        <Input title={"Phone"} nameInput={"phone"} type={"text"} placeholder={"Please enter your phone..."} icon={<FaPhoneAlt className="iconSignIn" />} onChangeFunction={handleChange} errorContent={errors.phone} />

        <Link to={"/forgot-password"}><p className="m-0 font-14 font-bold">Forgot Password?</p></Link>
        <button type="submit" className="signInButton bg-orange text-white border-none font-bold py-2 rounded cursor-pointer">Sign Up</button>

        <div className="d-flex justify-between items-center">
          <p className="m-0 font-bold">No Account? Create Here</p>
          <p className="m-0 font-bold"> Terms and Conditions</p>
        </div>
      </form>
    </Modal>
  );
}

export default Register;