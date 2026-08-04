import { Form, Input, Button, Modal, Tag, Image, message } from "antd"
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";
import "./quanlytaikhoan.css"
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiBeard } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";
import { FaUpLong } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";


function QuanLyTaiKhoan() {
    const acc = useSelector(state => state.auth).payload;
    const [isOpenModal, setModal] = useState(false)
    const [dataUpToServer, setDataUpToServer] = useState({ ...acc });
    const [previewAvatar, setPreviewAvatar] = useState(acc.avatar);
    const [previewBL, setPreviewBL] = useState(acc.business_lisence ?? null);
    const dispatch = useDispatch();

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setDataUpToServer({ ...dataUpToServer, "name": value });
    }, [dataUpToServer])

    const handleUpgrade = useCallback(() => {
        if (acc.cccd != "" && acc.giayPhepKD != "") {
            fetch("https://servertripnest-4.onrender.com/api/taiKhoan/" + acc.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "vaiTro": "chuCoSo" })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("user", JSON.stringify(data))
                    // setAcc(data)
                    Swal.fire({
                        icon: "success",
                        title: "Thành Công",
                        text: "Giờ Bạn Có Thể Upload Bất Động Sản Của Bạn!!"
                    })
                })
        } else {
            Swal.fire({
                icon: "error",
                title: "Thất Bại",
                text: "Bạn Phải Cập Nhật Đầy Đủ Thông Tin Trước Đã"
            })
        }
    }, [acc])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(dataUpToServer).map((item) => {
            formData.append(item,dataUpToServer[item]);
        })
        fetch(`http://localhost:5000/account/update-account/${acc._id}`, {
            method: "PATCH",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch({ type: "UPDATE", "payload": data.newInfo });
                    Swal.fire({
                        icon: "success",
                        title: "🎉 Updated Successfully!",
                        text: "Your account information has been updated successfully.",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        background: "#ffffff",
                        color: "#333",
                        iconColor: "#22c55e",
                        toast: true,
                        position: "top-end"
                    });
                }
            })
    }, [dataUpToServer])


    // Hiển thị Image ảo
    const handleChangeImage = useCallback((e) => {
        const {name,files} = e.target;
        console.log(name);
        const url = URL.createObjectURL(e.target.files[0]);
        if(name == "avatar") setPreviewAvatar(url);
        else{
            console.log(name,url);
            setPreviewBL(url);
        }
        setDataUpToServer({ ...dataUpToServer, [name]: files[0] });
    }, [dataUpToServer])
    //
    return (
        <>
            <div className="qltk">
                <div className="qltk__container">
                    <h1 className="qltk__title">
                        Tài Khoản Của Bạn
                    </h1>
                    <p>Thông tin tài khoản của bạn được hiển thị ở đây!!</p>
                    <form onSubmit={handleSubmit} className="d-flex flex-column col-12">
                        <p className="qltk__role m-0">Vai trò của bạn là: <Tag style={{ fontSize: 14, fontWeight: 700, padding: 5, borderRadius: 3 }} color={acc.vaiTro == "qtv" ? "green" : (acc.vaiTro == "chuCoSo" ? "blue" : "red")}>{acc.vaiTro == "qtv" ? <><MdOutlineAdminPanelSettings /> Quản Trị Viên</> : (acc.vaiTro == "chuCoSo" ? <><GiBeard /> Chủ cơ sở</> : <><IoMdPerson /> Khách hàng</>)}</Tag></p>

                        <h1 className="m-0 py-3">Thông tin cơ bản</h1>
                        <div className="px-4 d-flex flex-column gap-y-3">
                            <div className="d-flex justify-center items-center">
                                <div className="avatar">
                                    <img src={previewAvatar}></img>
                                    <label className="avatar-icon" htmlFor="avatar">
                                        <i className="text-black fa-regular fa-pen-to-square"></i>
                                    </label>
                                </div>
                                <input onChange={handleChangeImage} id="avatar" name="avatar" type="file" accept="image/*" className="d-none"></input>
                            </div>
                            <div className="d-flex flex-column">
                                <label><span className="font-bold text-red">* </span>UserName</label>
                                <input type="text" name="username" value={acc.username} onChange={handleChange}></input>
                            </div>
                            <div className="d-flex flex-column">
                                <label><span className="font-bold text-red">* </span>Email</label>
                                <input type="email" name="email" value={acc.email} onChange={handleChange}></input>
                            </div>
                            <div className="d-flex flex-column">
                                <label><span className="font-bold text-red">* </span>Số Điện Thoại</label>
                                <input type="phone" name="phone" value={acc.phone} onChange={handleChange}></input>
                            </div>
                        </div>

                        <h1 className="m-0 py-3">Thông tin chủ cơ sở</h1>
                        <div className="px-4 d-flex flex-column gap-y-3">
                            <div className="d-flex flex-column">
                                <div className="d-flex items-center justify-between">
                                    <label>Giấy phép kinh doanh: </label>
                                    <label htmlFor="imageBusinessLisence" className="px-2 py-2 cursor-pointer">
                                        Thêm mới
                                    </label>
                                </div>
                                <input onChange={handleChangeImage} className="d-none" id="imageBusinessLisence" type="file" name="business_lisence" accept="image/*"></input>
                                <Image src={previewBL}></Image>
                            </div>

                            <div className="d-flex flex-column">
                                <label>Mã số thuế</label>
                                <input name="tax_code" type="text" onChange={handleChange}></input>
                            </div>
                            <div className="d-flex flex-column">
                                <label>Tài khoản ngân hàng</label>
                                <input name="stk" type="text" onChange={handleChange}></input>
                            </div>

                            <div className="d-flex justify-end">
                                <div className="d-flex items-center gap-x-2">
                                    <button className="bg-blue border-none text-white font-bold px-2 py-2 rounded" type="submit">Lưu</button>
                                    <button className="bg-green border-none text-white font-bold px-2 py-2 rounded" type="button"><i className="fa-solid fa-circle-up"></i> Yêu cầu nâng cấp</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </>
    )
}
export default QuanLyTaiKhoan;