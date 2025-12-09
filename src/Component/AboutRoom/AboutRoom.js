import { Badge, Rate, Tag } from "antd";
import "./AboutRoom.css"
import { useState } from "react";

function AboutRoom({data}){
    const duLieu = data;
    return (
        <>
            <div className="aboutroom">
                <div className="aboutroom__container">
                    <div className="aboutroom__top">
                        <div className="aboutroom__nameAndrate">
                            <h2>{duLieu.title}</h2>
                            <div className="aboutroom__rateAndtype">
                                <Tag style = {{fontWeight: 600,fontSize: 13}} key={duLieu.type}>{duLieu.type}</Tag>
                                <Rate defaultValue={duLieu.rate}></Rate>
                            </div>
                        </div>
                        <div className="aboutroom__pricebutton">
                            <div className="aboutroom__price">
                                <span>Gía/Phòng/Đêm từ</span>
                                <span>{duLieu.price}VND</span>
                            </div>
                            <button>Đặt Phòng</button>
                        </div>
                    </div>
                    <div className="aboutroom__body">
                        <div className="aboutroom__box">
                            <div className="aboutroom__diem">
                                <p>{duLieu?.rate}/10</p>
                                <p>Khách nói gì về kỳ nghỉ của họ</p>
                            </div>
                                <div className="aboutroom__dg">
                                    <p>{duLieu.danhGiaNoiBat?.name}</p>
                                    <p>{duLieu.danhGiaNoiBat?.danhGia}</p>
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
        </>
    )
}
export default AboutRoom;