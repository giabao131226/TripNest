import { Button, message, Tag, Rate, Image, Badge } from "antd";
import "./registerboss.css"
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHotel } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import ChinhSuaPhong from "../ChinhSuaPhong/chinhsuaphong";
import AddRoom from "../AddRoom/addroom";
import ThemAnh from "../ModalThemAnh/modalthemanh";



function RegisterBoss() {
    const tienIch = [
        {
            label: "Wifi", value: "Wifi"
        },
        {
            label: "Cho Thuê Xe Đạp", value: "Cho Thuê Xe Đạp"
        },
        {
            label: "Lửa Trại", value: "Lửa Trại"
        }
    ]
    const [idPhong, setIDPhong] = useState()
    const location = useLocation();
    const acc = location.state.acc;
    const [data, setData] = useState([])
    const [modalAdd, setMDADD] = useState(false)
    //Thong tin về modal thêm ảnh
    const [modalThemAnh, setMDImage] = useState(false)
    const openModalThemAnh = useCallback(() => {
        setMDImage(true)
    }, [])
    const closeModalThemAnh = useCallback(() => {
        setMDImage(false)
    }, [])
    //Khi xoá thì set lại reload
    const [reload, setReload] = useState(false)
    //Data change
    const [modalChange, setMDC] = useState(false)
    const [dataChange, setDataC] = useState({})
    const [loaiPhong, setLoaiP] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    // Modal Add
    const openModalAdd = useCallback(() => {
        setMDADD(true);
    }, [])
    const cancelMDA = useCallback(() => {
        setMDADD(false)
    }, [])
    const closeModalAdd = useCallback(() => {
        setMDADD(false)
    }, [])
    const handleSubmit = useCallback((values) => {
        const newPhong = {
            tenPhong: values.tenPhong,
            gia: values.gia,
            loaiPhong: values.loaiPhong,
            rate: 0,
            rateper10: 0,
            diaChi: values.diaChi,
            idChuSoHuu: acc.id,
            trangThai: false,
            thoiGianChoThue: values.thoiGianChoThue,
            mota: values.mota,
            idQTV: ""
        };
        fetch("http://localhost:3000/phong", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPhong)
        })
            .then(res => res.json())
            .then(data => {
                closeModalAdd();
                messageApi.open({
                    "type": "success",
                    "content": "Chúc mừng bạn đã thêm bất động sản thành công!"
                })
                values.tienIch.map((item) => {
                    fetch("http://localhost:3000/tienich", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "idbds": data.id,
                            "tienich": item
                        })
                    })
                        .then(res => res.json())
                })
            })
    }, [])
    //Modal chỉnh sửa
    const openModalChange = useCallback(() => {
        setMDC(true);
    }, [])
    const closeModalChange = useCallback(() => {
        setMDC(false);
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/phong?idChuSoHuu=" + acc.id)
            .then(res => res.json())
            .then(async (dulieu) => {
                const phongCoTienIch = await Promise.all(
                    dulieu.map(async (phong) => {
                        const res = await fetch(
                            `http://localhost:3000/tienich?idbds=${phong.id}`
                        );
                        const tienIch = await res.json();

                        return {
                            ...phong,
                            tienIch
                        };
                    })
                );
                const datafinal = await Promise.all(
                    phongCoTienIch.map(async (phong) => {
                        const res = await fetch(`http://localhost:3000/hinhanh?idbds=${phong.id}`)
                        const hinhAnh = await res.json()
                        return {
                            ...phong,
                            hinhAnh
                        }
                    })
                )
                setData(datafinal)
            })
        fetch("http://localhost:3000/loaiPhong")
            .then(res => res.json())
            .then(data => {
                setLoaiP(data)
            })
    }, [modalAdd, modalChange, reload, modalThemAnh])

    const handleClick = useCallback((e) => {
        setDataC(data[e.target.id])
        openModalChange()
    }, [data])
    const handleDelete = useCallback((e) => {
        fetch("http://localhost:3000/phong/" + data[e.target.id].id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                messageApi.open({
                    "type": "success",
                    "content": "Bạn đã xoá bất động sản thành công!!"
                })
                setReload(!reload)
            })
    }, [data])
    const themAnh = useCallback((e) => {
        setIDPhong(e.target.id)
        openModalThemAnh()
    }, [])
    const XoaAnh = useCallback((e) => {
        fetch("http://localhost:3000/hinhanh/" + e.target.id, { method: "DELETE" })
        setReload(!reload)
    }, [reload])
    const xoaTienIch = useCallback((e) => {
        fetch("http://localhost:3000/tienich/" + e.target.parentNode.id, {
            method: "DELETE"
        })
        setReload(!reload)
    }, [reload])
    return (
        <>
            {contextHolder}
            <div className="dsbds">
                <div className="dsbds__container">
                    <div className="dsbds__title">
                        <h2>Danh sách bất động sản của bạn</h2>
                        <Button type="primary" onClick={openModalAdd}>+</Button>
                    </div>
                    <hr></hr>
                    <div className="dsbds__main">
                        {data.length != 0 ? <div className="dsbdsList__main">
                            {data.map((item, index) => (
                                <Badge.Ribbon text={item.idQTV!="" ? "Đã Được Kiểm DUyệt" : "Chưa Được Kiểm Duyệt"} color={item.idQTV!="" ? "blue" : "red"}>
                                    <div className="dsbds__box" key={index}>
                                        <div className="dsbdsbox__container">
                                            <div className="dsbdsbox__title">
                                                <div className="dsbdsbox__tit1">
                                                    <div className="dsbds__nameAndRate">
                                                        <h2>{item.tenPhong}</h2>
                                                        <Rate allowHalf defaultValue={item.rate}></Rate>
                                                    </div>
                                                    <div className="dsbds__locationAndtype">
                                                        <div className="dsbds__location">
                                                            <FaLocationDot /> {item.diaChi}
                                                        </div>
                                                        <Tag color={"blue"} icon={<FaHotel />}>  {item.loaiPhong}</Tag>
                                                    </div>
                                                </div>
                                                <div className="dsbds__priceAndcheck">
                                                    <p>{item.gia}VND</p>
                                                    <button style={{ "fontWeight": "600" }} onClick={handleClick} id={index} className="buttonChinhSua">Chỉnh sửa</button>
                                                    <button onClick={handleDelete} id={index} className="buttonXoa">Xoá</button>
                                                </div>
                                            </div>
                                            <div className="dsbds__image">
                                                {item.hinhAnh.map((item, index) => (
                                                    <div className="image" key={index}>
                                                        <Image src={item.hinhAnh} width={200}></Image>
                                                        <button className="dsbds__deleteImage" onClick={XoaAnh} id={item.id}>x</button>
                                                    </div>

                                                ))}
                                                <button className="dsbds__themAnh" onClick={themAnh} id={data[index].id}>
                                                    +
                                                </button>
                                            </div>
                                            <hr></hr>
                                            <div className="dsbds__about">
                                                <div className="dsbds__des dsbox">
                                                    <h3>Mô Tả</h3>
                                                    <div className="mota">{item.mota}</div>
                                                </div>
                                                <div className="dsbds__map dsbox">
                                                    <h3>Vị trí</h3>
                                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29818.11356688405!2d105.78095874033141!3d20.901687857716034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b2be9c0f60cf%3A0xabb8282347787454!2zTeG7uSBIxrBuZywgVGhhbmggT2FpLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1765525448653!5m2!1svi!2s" width="400" height="450" style={{ "border": 0 }} loading="lazy" allowFullScreen={true} referrerPolicy="no-referrer-when-downgrade"></iframe>
                                                </div>
                                                <div className="dsbds__tienich dsbox">
                                                    <h3>Tiện ích</h3>
                                                    <ul>
                                                        {item.tienIch?.map((dv, index) => (
                                                            <li key={index} id={dv.id} className="dsbds__ti">
                                                                <span>{dv.tienich}</span>
                                                                <button onClick={xoaTienIch} className="buttonXoaTienIch">x</button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Badge.Ribbon>
                            ))}
                        </div> : <div className="bdsList__main">
                            <div className="icon__empty"></div>
                            <p className="text__empty">Dữ liệu sẽ được cập nhật sau....</p>
                        </div>}
                    </div>
                </div>
            </div>
            <ThemAnh openModalThemAnh={openModalThemAnh} closeModalThemAnh={closeModalThemAnh} modalThemAnh={modalThemAnh} idPhong={idPhong} messageApi={messageApi} />
            <AddRoom modalAdd={modalAdd} cancelMDA={cancelMDA} handleSubmit={handleSubmit} loaiPhong={loaiPhong} tienIch={tienIch} />
            <ChinhSuaPhong openModalChange={openModalChange} closeModalChange={closeModalChange} modalChange={modalChange} dataChange={dataChange} loaiPhong={loaiPhong} messageApi={messageApi} tienIch={tienIch} />
        </>
    )
}
export default RegisterBoss;