import { useEffect, useState } from "react";
import { DatePicker, Space, Select, Carousel, Tag, Rate } from 'antd';
import { FaHotel, FaLocationArrow } from "react-icons/fa6";
import {Link, Outlet} from 'react-router-dom'
import { useOutletContext } from "react-router-dom";
import "../dsPhong/dsPhong.css"


function QueryRoom(){
    const {url} = useOutletContext();
    console.log(url)
    const [data,setData] = useState([])
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
    })
    return (
        <>
            <div className="bdsList">
                        {data.map((item) => (
                            <div className="bdsbox">
                                <div className="bdsbox__container">
                                    <Carousel style={{ width: 200 }} autoplay arrows>
                                        {item.images.map((image) => (
                                            <div className="bds__image">
                                                <img src={image}></img>
                                            </div>
                                        ))}
                                    </Carousel>
                                    <Link to={item.id}>
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
                                        <div className="bds__danhGia">
                                            <p>{item.danhGiaNoiBat.name}</p>
                                            <i>{item.danhGiaNoiBat.danhGia}</i>
                                        </div>
                                    </div>
                                </Link>
                                <div className="bds__price">
                                    <p>{item.price}VND</p>
                                    <button>Chọn Phòng</button>
                                </div>
                            </div>
                            </div>
                        ))}
                </div>
        </>
    )
}
export default QueryRoom;