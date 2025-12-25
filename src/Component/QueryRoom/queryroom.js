import { useEffect, useState } from "react";
import { Carousel, Tag, Rate } from 'antd';
import { FaHotel} from "react-icons/fa6";
import { Link} from 'react-router-dom'
import { useOutletContext } from "react-router-dom";
import "./queryroom.css"
import "../dsPhong/dsPhong.css"
import { TbMoodEmptyFilled } from "react-icons/tb";


function QueryRoom() {
    let { url } = useOutletContext();
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(url)
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
                const datafirst = await Promise.all(
                    phongCoTienIch.map(async (phong) => {
                        const res = await fetch(`http://localhost:3000/hinhanh?idbds=${phong.id}`)
                        const hinhAnh = await res.json()
                        return {
                            ...phong,
                            hinhAnh
                        }
                    })
                )
                const dataFinal = datafirst.filter(item => {return item.idQTV!=""})
                setData(dataFinal)
                
            })
    },[])
    return (
        <>
            <div className="bdsList">
                <div className="bdsList__container">
                    <div className="quangcao">
                        <img src="https://stc.shopiness.vn/deal/2018/10/16/d/f/3/c/1539673384912_540.png"></img>
                        <img src="https://img.pikbest.com/01/59/62/86jpIkbEsT2gA.jpg!f305cw"></img>
                    </div>
                    {data.length!=0 ? <div className="bdsList__main">
                        {data.map((item,index) => (
                            <div className="bdsbox" key = {index}>
                                <div className="bdsbox__container">
                                    <Carousel style={{ width: 200 }} autoplay arrows>
                                        {item.hinhAnh.map((image,index) => (
                                            <div className="bds__image" key={index}>
                                                <img src={image.hinhAnh}></img>
                                            </div>
                                        ))}
                                    </Carousel>
                                    <Link to={item.id}>
                                        <div className="bds__about">
                                            <div className="bds__nameAndRate">
                                                <span>{item.tenPhong}</span>
                                                <span>{item.rateper10}/10</span>
                                            </div>
                                            <div className="bds__typeAndRate">
                                                <Tag icon={<FaHotel />} color="#55acee">
                                                    {item.type}
                                                </Tag>
                                                <Rate defaultValue={item.rate} allowHalf />
                                            </div>
                                            <div className="bds__tienIch">
                                                {item.tienIch.map((dv,index) => (
                                                    <Tag color="cyan" key = {index}>{dv.tienich}</Tag>
                                                ))}
                                            </div>
                                            <div className="bds__danhGia">
                                                <p>{item.mota}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="bds__price">
                                        <p>{item.gia}VND</p>
                                        <Link to = {item.id}><button>Xem Phòng</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> : <div className="bdsList__main">
                        <div className="icon__empty"><TbMoodEmptyFilled /></div>
                        <p className="text__empty">Dữ liệu sẽ được cập nhật sau....</p>
                    </div>}
                </div>
            </div>
        </>
    )
}
export default QueryRoom;