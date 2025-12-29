import { useCallback, useEffect, useState } from "react"
import { Carousel, Tag, Rate, Button, Badge } from "antd"
import { FaHotel } from "react-icons/fa6";
import NoneData from "../NoneData/nonedata";
import "./history.css"

function LichSuDatPhong() {
    const acc = JSON.parse(localStorage.getItem("user"));
    const [filter, setFilter] = useState("all")
    const [dataAll, setDataAll] = useState([])
    const [dataDone, setDataDone] = useState([])
    const [dataWait, setDataWait] = useState([])
    const data = filter === "all" ? dataAll :
        filter === "done" ? dataDone :
            dataWait;
    const handleChangeData = useCallback((elementClass) => {
        if (elementClass == "history__button-all") setFilter("all")
        else if (elementClass == "history__button-done") setFilter("done")
        else if (elementClass == "history__button-wait") setFilter("wait")
    }, [data, dataWait, dataDone])
    const handleClick = useCallback((e) => {
        const element = document.querySelector(".history__button--active")
        element.classList.remove("history__button--active")
        handleChangeData(e.target.className)
        e.target.classList.add("history__button--active")
    }, [])
    useEffect(() => {
        fetch("https://servertripnest-4.onrender.com/api/datPhong?idNguoiDat=" + acc.id)
            .then(res => res.json())
            .then(async (duLieuDatPhong) => {
                const res = await Promise.all(duLieuDatPhong.map(async (item) => {
                    const resData = await fetch("https://servertripnest-4.onrender.com/api/phong?id=" + item.idPhong);
                    const duLieuPhong = await resData.json();
                    const dataFirst = duLieuPhong[0];
                    const resHA = await fetch("https://servertripnest-4.onrender.com/api/hinhanh?idbds=" + item.idPhong)
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
                setDataAll(res)
                const duLieuDone = res.filter((item) => {
                    return item.daHoanTat == true
                })
                setDataDone(duLieuDone)
                const duLieuWait = res.filter((item) => {
                    return item.daHoanTat != true
                })
                setDataWait(duLieuWait)
            })
    }, [])
    console.log(data, dataDone, dataWait)
    return (
        <>
            <div className="history">
                <div className="history__container">
                    <h1 className="history__title">Đặt chỗ của bạn</h1>
                    <div className="history__main">
                        <div className="history__button">
                            <button className="history__button--active history__button-all" onClick={handleClick}>
                                Tất cả
                            </button>
                            <button onClick={handleClick} className="history__button-wait">
                                Đang chờ Nhận Phòng
                            </button>
                            <button onClick={handleClick} className="history__button-done">
                                Đã Hoàn Tất
                            </button>
                        </div>
                        <div className="history__listBDS">
                            {data.length !== 0 ? (
                                data.map((item, index) => (
                                    <Badge.Ribbon text={item.daHoanTat == true ? "Đã Hoàn Tất" : "Đang chờ nhận phòng"} color={item.daHoanTat == true ? "green" : "blue"} key={index}>
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
                                                            <p>Số tiền đã thanh toán: {item.duLieu.gia} VND</p>
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