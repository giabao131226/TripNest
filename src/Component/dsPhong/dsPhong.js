import { useCallback, useEffect, useState } from "react"
import { DatePicker,Select} from 'antd';
import { IoLocation } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdDateRange} from "react-icons/md";
import "./dsPhong.css"
import SlideUuDai from "../slideUuDai/SlideUuDai";
import {Outlet} from 'react-router-dom'
const { RangePicker } = DatePicker;

function BDSList() {
    const [url, setUrl] = useState("http://localhost:3000/bds")
    const [diadiem, setDiaDiem] = useState([])
    const [loaiPhong, setLoaiP] = useState([])
    const [queryDiaDiem, setQDD] = useState("HaNoi")
    const [queryTypeRoom, setTR] = useState("VIP")
    const handleChange = useCallback((value) => {
        setQDD(value)
    }, [])
    const TDLoaiPhong = useCallback((value) => {
        setTR(value)
    }, [])
    const handleClick = useCallback(() => {
        let urlNew = "http://localhost:3000/bds";
        urlNew += "?diadiem=" + queryDiaDiem;
        urlNew += "&typeRoom=" + queryTypeRoom;
        setUrl(urlNew)
    })
    useEffect(() => {
        fetch("http://localhost:3000/diadiem")
            .then(res => res.json())
            .then(data => {
                setDiaDiem(data)
            })
        fetch("http://localhost:3000/loaiPhong")
            .then(res => res.json())
            .then(data => {
                setLoaiP(data)
            })
    }, [])
    return (
        <>
            <div className="bdslist">
                <div className="bdslist__container">
                    <div className="banner">
                        <div className="banner__container">
                            <div className="banner__opacity"></div>
                            <div className="banner__title">
                                <h1>Danh Sách BĐS Du Lịch</h1>
                                <p>Hãy khám phá những HomeStay/Villa tốt nhất ở mọi địa điểm, điểm bắt đầu chuyến hành trình kỳ diệu của bạn</p>
                            </div>
                        </div>
                    </div>
                    <SlideUuDai />
                    <div className="search">
                        <div className="search__container">
                            <div className="search__box">
                                <Select
                                    prefix={<IoLocation style={{ color: '#0294F3' }} />}
                                    defaultValue="Hà Nội"
                                    style={{ width: 298, height: 70, fontSize: 18, fontWeight: 700, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                    onChange={handleChange}
                                    options={diadiem}
                                />
                            </div>
                            <div className="search__box">
                                <RangePicker
                                    prefix={<MdDateRange style={{ color: '#0294F3' }} />}
                                    style={{ width: 298, height: 70, fontSize: 26, fontWeight: 600, borderRadius: 0 }}
                                    className="box" />
                            </div>
                            <div className="search__box">
                                <Select
                                    className="box"
                                    defaultValue="VIP"
                                    style={{ width: 298, height: 70, fontSize: 18, fontWeight: 700, borderRadius: 0 }}
                                    onChange={TDLoaiPhong}
                                    options={loaiPhong}
                                />
                            </div>
                            <button onClick={handleClick}><IoSearch /></button>
                        </div>
                    </div>
                    <Outlet context={{url}} />
            </div>
        </div >
        </>
    )
}
export default BDSList