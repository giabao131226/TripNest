import { useCallback, useEffect, useState } from "react"
import { Image, Carousel, Tag, Rate, Button, Badge } from "antd"
import { FaHotel } from "react-icons/fa6";
import NoneData from "../NoneData/nonedata";
import {useSelector,useDispatch} from "react-redux"
import "./history.css"

function LichSuDatPhong() {
    const acc = JSON.parse(localStorage.getItem("user"));
    console.log(acc)
    const [data, setData] = useState([])
    const handleClick = useCallback((e) => {
        const element = document.querySelector(".history__button--active")
        element.classList.remove("history__button--active")
        e.target.classList.add("history__button--active")
    }, [])
    useEffect(() => {
        fetch("http://localhost:3000/datPhong?idNguoiDat=" + acc.id)
            .then(res => res.json())
            .then(async (duLieuDatPhong) => {
                const res = await Promise.all(duLieuDatPhong.map(async (item) => {
                    const resData = await fetch("http://localhost:3000/phong?id=" + item.idPhong);
                    const duLieuPhong = await resData.json();
                    const dataFirst = duLieuPhong[0];
                    const resHA = await fetch("http://localhost:3000/hinhanh?idbds=" + item.idPhong)
                    const hinhAnh = await resHA.json()
                    const duLieu = {
                        ...dataFirst,
                        hinhAnh
                    }
                    return {
                        ...item,
                        duLieu
                    }
                }))
                setData(res)
            })
    }, [])
    return (
        <>
            <div className="history">
                <div className="history__container">
                    <h1 className="history__title">Đặt chỗ của bạn</h1>
                    <div className="history__main">
                        <div className="history__button">
                            <button className="history__button--active" onClick={handleClick}>
                                Tất cả
                            </button>
                            <button onClick={handleClick}>
                                Đang chờ thanh toán
                            </button>
                            <button onClick={handleClick}>
                                Đã thanh toán
                            </button>
                            <button onClick={handleClick}>
                                Đang chờ xem xét
                            </button>
                        </div>
                        <div className="history__listBDS">
                            {data.length !== 0 ? (
                                data.map((item, index) => (
                                    <Badge.Ribbon text="Đã được đánh giá tốt trong 5 ngày qua" key={index}>
                                        <div className="historybox">
                                            <div className="historybox__container">
                                                <div className="historybox__image">
                                                    <Carousel>
                                                        {item.duLieu.hinhAnh.map((image, index) => (
                                                            <div className="historybox__vienimg" key={index}>
                                                                <img src={image.hinhAnh}></img>
                                                            </div>
                                                        ))}
                                                    </Carousel>
                                                </div>
                                                <div className="historybox__main">
                                                    <div className="historybox__head">
                                                        <div className="historybox__thongTinDatPhong">
                                                            <h3>{item.duLieu.tenPhong}</h3>
                                                            <div className="historybox__locateType">
                                                                <span>{item.duLieu.diaChi}</span>
                                                                <Tag color={"blue"}><FaHotel /> {item.duLieu.loaiPhong}</Tag>
                                                            </div>
                                                            <p>Thời gian cho thuê: {item.duLieu.thoiGianChoThue} days</p>
                                                            <p>Phương thức thanh toán: {item.pttt == "qr" ? "QR Chuyển Khoản" : (item.pttt == "trucTiep" ? "Thanh Toán Trực Tiếp" : "Ví trả sau")}</p>
                                                            <p>Số tiền đã thanh toán: {item.duLieu.gia}</p>
                                                        </div>
                                                        <div className="historybox__rateButton">
                                                            <Rate defaultValue={item.duLieu.rate} allowHalf style={{ marginTop: 22 }}></Rate>
                                                            <div><Button type="primary"> Đặt Lại</Button></div>
                                                        </div>
                                                    </div>
                                                    <div className="historybox__body">
                                                        <p>Ngày đặt: {item.ngayDat}</p>
                                                        <p>Ngày trả: {item.ngayTra}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Badge.Ribbon>
                                ))
                            ) : (
                                <NoneData />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LichSuDatPhong;