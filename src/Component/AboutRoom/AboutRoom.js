import { Rate, Tag, Button, Modal, Form, Input, DatePicker, message, Select, QRCode } from "antd";
import "./AboutRoom.css"
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { RangePicker } = DatePicker;

function AboutRoom({ data,disableButton, setDisable }) {
    const duLieu = data;
    const [messageApi, contextHolder] = message.useMessage()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [acc, setAcc] = useState(JSON.parse(localStorage.getItem("user")))
    const [form] = Form.useForm();
    const params = useParams();
    const [pttt, setPTTT] = useState("trucTiep")
    const checkModal = () => {
        if (document.cookie != "") setIsModalOpen(true);
        else {
            messageApi.open({
                "type": "error",
                "content": "Xin vui lòng đăng nhập tài khoản để đặt được phòng!"
            })
        }
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmit = (values) => {
        setIsModalOpen(false);
        const ngayNhan = values.ngaynhantra[0].format("YYYY-MM-DD");
        const ngayTra = values.ngaynhantra[1].format("YYYY-MM-DD");
        const newDatPhong = {
            "idNguoiDat": acc.id,
            "idPhong": params.id,
            "ngayDat": ngayNhan,
            "ngayTra": ngayTra,
            "daHoanTat": false,
            "pttt": values.pttt
        }
        fetch("https://servertripnest-4.onrender.com/api/phong/" + params.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "trangThai": true
            })
        })
            .then(res => res.json())
            .then(data => {setDisable(true)});
        fetch("https://servertripnest-4.onrender.com/api/datPhong",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newDatPhong)
        })
            .then(res => res.json())
            .then(data => {
                messageApi.open({
                    "type": "success",
                    "content": "Chúc mừng bạn đã đặt phòng thành công"
                })
            })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        setDisable(duLieu.trangThai)
        fetch("https://servertripnest-4.onrender.com/api/taiKhoan?" + document.cookie)
            .then(res => res.json())
            .then(data => {
                setAcc(data[0])
            });
    }, [])
    useEffect(() => {
        if (acc) {
            form.setFieldsValue({
                phone: acc.phone,
                email: acc.email
            });
        }
    }, [acc, form]);
    const handleChange = useCallback((e) => {
        setPTTT(e)
    }, [])
    return (
        <>
            {contextHolder}
            <div className="aboutroom">
                <div className="aboutroom__container">
                    <div className="aboutroom__top">
                        <div className="aboutroom__nameAndrate">
                            <h2>{duLieu.title}</h2>
                            <div className="aboutroom__rateAndtype">
                                <Tag style={{ fontWeight: 600, fontSize: 13 }} key={duLieu.loai}>{duLieu.loai}</Tag>
                                <Rate value={duLieu.rate} allowHalf></Rate>
                            </div>
                        </div>
                        <div className="aboutroom__pricebutton">
                            <div className="aboutroom__price">
                                <span>Gía/Phòng/Đêm từ</span>
                                <span>{duLieu.gia}VND</span>
                            </div>
                            <Button onClick={checkModal} disabled={disableButton}>{disableButton ? "Đã có người đặt" : "Đặt Phòng"}</Button>
                        </div>
                    </div>
                    <div className="aboutroom__body">
                        <div className="aboutroom__box">
                            <div className="aboutroom__diem">
                                <p>{duLieu?.rateper10}/10</p>
                                <p>Khách nói gì về kỳ nghỉ của họ</p>
                            </div>
                            <div className="aboutroom__moTa">
                                {duLieu.mota}
                            </div>
                        </div>
                        <div className="aboutroom__box">
                            <p className="aboutroom__vitri">Trong khu vực</p>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29818.11356688405!2d105.78095874033141!3d20.901687857716034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b2be9c0f60cf%3A0xabb8282347787454!2zTeG7uSBIxrBuZywgVGhhbmggT2FpLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1765525448653!5m2!1svi!2s" width="400" height="450" style={{ "border": 0 }} loading="lazy" allowFullScreen={true} referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className="aboutroom__box">
                            <p className="aboutroom__tienich">Tiện ích chính</p>
                            {duLieu.tienIch?.map((item, index) => (
                                <p key={index} className="tienich">{item.tienich}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Yêu Cầu Đặt Phòng"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
                forceRender
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name="hovaten" label="Họ Và Tên" initialValue={acc.userName} rules={[{ required: true, message: "Please enter your Full Name!!" }]}>
                        <Input placeholder="Họ Và Tên"></Input>
                    </Form.Item>
                    <Form.Item name="phone" label="Nhập Số Điện Thoại" initialValue={acc.phone} rules={[{ required: true, message: "Please enter your Phone!!" }]}>
                        <Input type={"text"} placeholder="Số Điện Thoại"></Input>
                    </Form.Item>
                    <Form.Item name="email" label="Nhập Email" initialValue={acc.email} rules={[{ required: true, message: "Please enter your Email!!" }]}>
                        <Input type={"email"} placeholder="Email"></Input>
                    </Form.Item>
                    <Form.Item name="ngaynhantra" label="Ngày Nhận/Ngày Trả" rules={[{ required: true, message: "Please enter your Date!!" }]}>
                        <RangePicker />
                    </Form.Item>
                    <Form.Item name="pttt" label="Phương Thức Thanh Toán" rules={[{ required: true, message: "Please enter your Date!!" }]}>
                        <Select
                            onChange={handleChange}
                            defaultValue={"Thanh toán khi đến nhận phòng"}
                            options={[
                                { value: "trucTiep", label: "Thanh toán khi đến nhận phòng" },
                                { value: "qr", label: "Quét mã QR" },
                                { value: "viTraSau", label: "Ví trả sau" },
                            ]}>
                        </Select>
                    </Form.Item>
                    <div className="pttt">
                        {pttt == "qr" ? (<><span>*Quý khách vui lòng quét mã để thực hiện thanh toán</span><QRCode value="https://ant.design/"></QRCode></>) : (pttt=="trucTiep" ? <p>Quý khách vui lòng thanh toán toàn bộ chi phí đặt phòng khi đến nhận phòng tại khách sạn</p> : <p>Ví trả sau</p>)}
                    </div>

                    <Button htmlType="submit" className="request__button">
                        Xác Nhận
                    </Button>
                </Form>
            </Modal>
        </>
    )
}
export default AboutRoom;