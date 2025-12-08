import { useCallback, useEffect, useState } from "react"
import { DatePicker, Space, Select, Carousel, Tag, Rate } from 'antd';
import { IoLocation } from "react-icons/io5";
import { FaHotel } from "react-icons/fa6";
import LocaleProvider from "antd/es/locale";
import { IoSearch } from "react-icons/io5";
import "./dsPhong.css"
const { RangePicker } = DatePicker;



function BDSList() {
    const [data, setData] = useState([])
    const [diadiem, setDiaDiem] = useState([])
    const [loaiPhong, setLoaiP] = useState([])
    const [queryDiaDiem,setQDD] = useState("")
    const handleChange = useCallback((value) => {
        setQDD(value)
    },[])
    const handleClick = useCallback(() => {
        let url = "http://localhost:3000/bds"
        if(queryDiaDiem!="") url+="?diadiem="+queryDiaDiem;
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
    })
    useEffect(() => {
        fetch("http://localhost:3000/bds")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
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
                    <div className="search">
                        <div className="search__container">
                            <div className="city">
                                <Select
                                    prefix={<IoLocation />}
                                    defaultValue="Hà Nội"
                                    style={{ width: 120 }}
                                    onChange={handleChange}
                                    options={diadiem}
                                />
                            </div>
                            <div className="day">
                                <RangePicker />
                            </div>
                            <div className="loaiPhong">
                                <Select
                                    suffixIcon={<LocaleProvider />}
                                    defaultValue="VIP"
                                    style={{ width: 120 }}
                                    onChange={handleChange}
                                    options={loaiPhong}
                                />
                            </div>
                            <button onClick={handleClick}><IoSearch /></button>
                        </div>
                    </div>
                    <div className="bdsList">
                        {data.map((item) => (
                            <div className="bdsbox">
                                <div className="bdsbox__container">
                                    <Carousel autoplay arrows>
                                        {item.images.map((image) => (
                                            <div className="bds__image">
                                                <img src={image}></img>
                                            </div>
                                        ))}
                                    </Carousel>
                                    <div className="bds__about">
                                        <div className="bds__nameAndRate">
                                            <span>{item.title}</span>
                                            <span>{item.rate}</span>
                                        </div>
                                        <div className="bds__typeAndRate">
                                            <Tag icon={<FaHotel />} color="#55acee">
                                                {item.type}
                                            </Tag>
                                            <Rate defaultValue={item.rate} allowHalf />
                                        </div>
                                        <div className="bds__tienIch">
                                            {item.tienich.map((dv) => (
                                                <Tag color="cyan">{dv}</Tag>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bds__price">
                                        <p>{item.price}VND</p>
                                        <button>Chọn Phòng</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default BDSList