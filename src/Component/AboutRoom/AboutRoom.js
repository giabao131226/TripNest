import { Badge, Rate, Tag, Button, Modal,Form, Input } from "antd";
import "./AboutRoom.css"
import { useState } from "react";
import { useParams } from "react-router-dom";

function AboutRoom({ data}) {
    const duLieu = data;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const showModal = () => {
        setIsModalOpen(true);
    };
    console.log(params)
    const handleOk = () => {
        setIsModalOpen(false);
        fetch("http://localhost:3000/bds/"+params.id,{
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
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="aboutroom">
                <div className="aboutroom__container">
                    <div className="aboutroom__top">
                        <div className="aboutroom__nameAndrate">
                            <h2>{duLieu.title}</h2>
                            <div className="aboutroom__rateAndtype">
                                <Tag style={{ fontWeight: 600, fontSize: 13 }} key={duLieu.type}>{duLieu.type}</Tag>
                                <Rate defaultValue={duLieu.rate}></Rate>
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
                                <p>{duLieu?.rate}/10</p>
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
                        </div>
                        <div className="aboutroom__box">
                            <p className="aboutroom__tienich">Tiện ích chính</p>
                            {duLieu.tienich?.map((item) => (
                                <p className="tienich">{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Yêu Cầu Đặt Phòng"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item>
                        <Input name="hovaten" placeholder="Họ Và Tên"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input name="phone" type={"text"} placeholder="Số Điện Thoại"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input name="email" type={"email"} placeholder="Email"></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default AboutRoom;