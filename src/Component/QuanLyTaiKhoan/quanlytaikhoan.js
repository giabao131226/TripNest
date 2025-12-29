import { Form, Input, Button, Modal, Tag, Image, message } from "antd"
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";
import "./quanlytaikhoan.css"
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiBeard } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";
import { FaUpLong } from "react-icons/fa6";
import Swal from 'sweetalert2';


function QuanLyTaiKhoan() {
    const [form] = useForm();
    const [acc,setAcc] = useState(JSON.parse(localStorage.getItem("user")))
    const [isOpenModal, setModal] = useState(false)
    const [giayPhepKD,setGiayPhepKD] = useState(acc.giayPhepKD)
    const [image,setImage] = useState(acc.giayPhepKD)
    const openModal = useCallback(() => {
        setModal(true)
    }, [])
    const closeModal = useCallback(() => {
        setModal(false)
    }, [])

    const handleUpgrade = useCallback(() => {
        if(acc.cccd!="" && acc.giayPhepKD!=""){
            fetch("https://servertripnest-4.onrender.com/api/taiKhoan/" + acc.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"vaiTro": "chuCoSo"})
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("user",JSON.stringify(data))
                setAcc(data)
                Swal.fire({
                    icon: "success",
                    title: "Thành Công",
                    text: "Giờ Bạn Có Thể Upload Bất Động Sản Của Bạn!!"
                })
            })
        }else{
            Swal.fire({
                icon: "error",
                title: "Thất Bại",
                text: "Bạn Phải Cập Nhật Đầy Đủ Thông Tin Trước Đã"
            })
        }
    },[acc])

    const handleSubmit = useCallback((e) => {
        const newData = {
            ...e,
            "giayPhepKD": giayPhepKD
        }
        console.log(newData)
        fetch("https://servertripnest-4.onrender.com/api/taiKhoan/" + acc.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("user",JSON.stringify(data))
                setAcc(data)
                Swal.fire({
                    icon: "success",
                    title: "Chúc mừng",
                    text: "Cập nhật thông tin tài khoản thành công"
                })
            })
    }, [giayPhepKD])
    const handleChange = useCallback((e) => {
        setImage(e.target.value)
    },[])
    const handleChangeImage = useCallback( () => {
        setGiayPhepKD(image)
        closeModal();
    },[image])
    useEffect(() => {
        if (acc) {
            form.setFieldValue(acc);
        }
    }, [acc])
    return (
        <>
            <div className="qltk">
                <div className="qltk__container">
                    <h1 className="qltk__title">
                        Tài Khoản Của Bạn
                    </h1>
                    <p>Thông tin tài khoản của bạn được hiển thị ở đây!!</p>
                    <Form form={form} onFinish={handleSubmit}>
                        <p className="qltk__role">Vai trò của bạn là: <Tag style={{ fontSize: 14, fontWeight: 700, padding: 5, borderRadius: 3 }} color={acc.vaiTro == "qtv" ? "green" : (acc.vaiTro == "chuCoSo" ? "blue" : "red")}>{acc.vaiTro == "qtv" ? <><MdOutlineAdminPanelSettings /> Quản Trị Viên</> : (acc.vaiTro == "chuCoSo" ? <><GiBeard /> Chủ cơ sở</> : <><IoMdPerson /> Khách hàng</>)}</Tag></p>
                        <Form.Item label="Username" name={"username"} initialValue={acc.username} rules={[{ required: true, message: 'Không được bỏ trống tên đăng nhập' }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label="Mật Khẩu" name={"password"} initialValue={acc.password} rules={[{ required: true, message: "Không được bỏ trống mật khẩu" }]}>
                            <Input.Password></Input.Password>
                        </Form.Item>
                        <Form.Item label="Email" name={"email"} initialValue={acc.email} rules={[{ required: true, message: "Không được bỏ trống Email" }]}>
                            <Input type={"email"}></Input>
                        </Form.Item>
                        <Form.Item label="Số Điện Thoại" name={"phone"} initialValue={acc.phone} rules={[{ required: true, message: "Không được bỏ trống Số Điện Thoại" }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label="Số CCCD của bạn" name={"cccd"} initialValue={acc.cccd}>
                            <Input minLength={12} maxLength={12}></Input>
                        </Form.Item>
                        <h3>Giấy phép Kinh Doanh</h3>
                        <div className="qltk__giayPhepKD">
                            <Button onClick={openModal} style={{ marginBottom: 10 }}>Thêm giấy phép kinh doanh</Button>
                            <Image src={giayPhepKD} width={500}></Image>
                        </div>
                        <Modal open={isOpenModal} onCancel={closeModal} footer={false} title="Ảnh mặt chính của Giấy Phép Kinh Doanh">
                            <Input onChange={handleChange}></Input>
                            <Button type="primary" onClick={handleChangeImage}>Xác nhận</Button>
                        </Modal>
                        <div className="qltk__button">
                            <Button type="primary" className="qltk__formButton" htmlType="submit">Cập Nhật Thông Tin</Button>
                            {acc.vaiTro == "khachHang" ? (<Button type="primary" className="qltk__formButton" onClick={handleUpgrade}><FaUpLong /> Tôi muốn nâng cấp vai trò lên Chủ Cơ Sở</Button>) : <></>}
                        </div>
                    </Form>
                </div>
            </div >
        </>
    )
}
export default QuanLyTaiKhoan;