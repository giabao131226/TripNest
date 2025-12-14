import { Rate, Tag, Button, Modal, Form, Input, DatePicker} from "antd";
import "./AboutRoom.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { RangePicker } = DatePicker;

function AboutRoom({ data }) {
    const duLieu = data;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [acc, setAcc] = useState({})
    const [form] = Form.useForm();
    const params = useParams();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmit = (values) => {
        setIsModalOpen(false);
        fetch("http://localhost:3000/bds/" + params.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "trangThai": true
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        fetch("http://localhost:3000/users?" + document.cookie)
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
    return (
        <>
            <div className="aboutroom">
                <div className="aboutroom__container">
                    <div className="aboutroom__top">
                        <div className="aboutroom__nameAndrate">
                            <h2>{duLieu.title}</h2>
                            <div className="aboutroom__rateAndtype">
                                <Tag style={{ fontWeight: 600, fontSize: 13 }} key={duLieu.type}>{duLieu.type}</Tag>
                                <Rate value={duLieu.rate} allowHalf></Rate>
                            </div>
                        </div>
                        <div className="aboutroom__pricebutton">
                            <div className="aboutroom__price">
                                <span>Gía/Phòng/Đêm từ</span>
                                <span>{duLieu.price}VND</span>
                            </div>
                            <Button onClick={showModal} disabled={duLieu.trangThai}>{duLieu.trangThai ? "Đã có người đặt" : "Đặt Phòng"}</Button>
                        </div>
                    </div>
                    <div className="aboutroom__body">
                        <div className="aboutroom__box">
                            <div className="aboutroom__diem">
                                <p>{duLieu?.rateper10}/10</p>
                                <p>Khách nói gì về kỳ nghỉ của họ</p>
                            </div>
                            <div className="aboutroom__danhGia">
                                {duLieu.danhGiaNoiBat?.map((item, index) => (
                                    <div key={index} className="aboutroom__dg">
                                        <p>{item.name}</p>
                                        <p>{item.danhGia}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="aboutroom__box">
                            <p className="aboutroom__vitri">Trong khu vực</p>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29818.11356688405!2d105.78095874033141!3d20.901687857716034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b2be9c0f60cf%3A0xabb8282347787454!2zTeG7uSBIxrBuZywgVGhhbmggT2FpLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1765525448653!5m2!1svi!2s" width="400" height="450" style={{ "border": 0 }} loading="lazy" allowFullScreen={true} referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className="aboutroom__box">
                            <p className="aboutroom__tienich">Tiện ích chính</p>
                            {duLieu.tienich?.map((item, index) => (
                                <p key={index} className="tienich">{item}</p>
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
                    <Form.Item name="hovaten" label="Họ Và Tên" initialValue={acc.userName}>
                        <Input placeholder="Họ Và Tên"></Input>
                    </Form.Item>
                    <Form.Item name="phone" label="Nhập Số Điện Thoại" initialValue={acc.phone}>
                        <Input type={"text"} placeholder="Số Điện Thoại"></Input>
                    </Form.Item>
                    <Form.Item name="email" label="Nhập Email" initialValue={acc.email}>
                        <Input type={"email"} placeholder="Email"></Input>
                    </Form.Item>
                    <Form.Item name="ngaynhantra" label="Ngày Nhận/Ngày Trả">
                        <RangePicker />
                    </Form.Item>
                    <Button htmlType="submit" className="request__button">
                        Xác Nhận
                    </Button>
                </Form>
            </Modal>
        </>
    )
}
export default AboutRoom;