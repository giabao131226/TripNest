import { Tag ,Carousel, Image,message} from "antd";
import { FaRegSmileBeam} from "react-icons/fa";
import { useCallback, useEffect,useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaHotel } from "react-icons/fa";
import "./kiemduyet.css"
import useMessage from "antd/es/message/useMessage";
import {useDispatch} from "react-redux"

function KiemDuyet(){
    const acc = JSON.parse(localStorage.getItem("user"))
    console.log(acc)
    const dispatch = useDispatch();
    const [messageApi,textHolder] = useMessage();
    const [data,setData] = useState([])
    const [reload,setReload] = useState(false)
    const pheDuyet = useCallback((e) => {
        const chapNhan = e.target.dataset.chapNhan;
        fetch("https://servertripnest-4.onrender.com/api/phong/"+e.target.id,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "idQTV" : acc.id,
                "duyet": chapNhan == "true" ? "true" : "false",
            })
        })
            .then(res => res.json())
            .then(data => {
                messageApi.open({
                    "type": "success",
                    "content": chapNhan == "true" ? "Bạn vừa phê duyệt phòng có ID là"+data.id : "Bạn vừa từ chối phòng có ID là "+data.id
                }) 
                setReload(!reload);
            })
    },[])
    useEffect(() => {
        fetch("https://servertripnest-4.onrender.com/api/phong?duyet="+"chuaDuyet")
            .then(res => res.json())
            .then(async (duLieu) => {
                const res = await Promise.all(duLieu.map(async (item) => {
                    const resHA = await fetch("https://servertripnest-4.onrender.com/api/hinhanh?idbds="+item.id);
                    const hinhAnh = await resHA.json();
                    
                    const newData =  {
                        ...item,hinhAnh
                    }
                    const resTI = await fetch("https://servertripnest-4.onrender.com/api/tienich?idbds="+newData.id);
                    const tienIch = await resTI.json()
                    return {
                        ...newData,tienIch
                    }
                }))
                setData(res);
            })
    },[reload])
    return (
        <>
            {textHolder}
            <div className="kiemduyet">
                <div className="kiemduyet__container">
                    <div className="kiemduyet__title">
                        <h1>Kiểm duyệt thông tin phòng</h1>
                    </div>
                    <div className="kiemduyet__main">
                        {data.length!=0 ? 
                        <div className="kiemduyet__list">
                            {data.map((item,index) => (
                                <div className="kdbox" key={index}>
                                    <div className="kdbox__container">
                                        <div className="kdbox__head">
                                            <Carousel autoplay arrows style={{"width" : "300px"}}>
                                                {item.hinhAnh.map((image,index) => (
                                                    <div key = {index} className="kdbox__vienimg">
                                                        <Image src = {image.hinhAnh}></Image>
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </div>
                                        <div className="kdbox__body">
                                            <div className="kdbox__title kdbox__flex kdbox__marginbottom">
                                                <div className="kdbox__nameAndlocate">
                                                <h3 className="text-black">{item.tenPhong}</h3>
                                                <p><CiLocationOn />{item.diaChi}</p>
                                            </div>
                                            <Tag color={"blue"}>
                                                <FaHotel /> {item.loaiPhong}
                                            </Tag>
                                            </div>
                                            <div className="kdbox__price kdbox__flex kdbox__marginbottom">
                                                <p>Gía phòng:</p>
                                                <p>{item.gia} VND</p>
                                            </div>
                                            <div className="kdbox__time kdbox__flex kdbox__marginbottom">
                                                <p>Thời gian cho thuê:</p>
                                                <p className="text-black">{item.thoiGianChoThue} ngày</p>
                                            </div>
                                            <div className="kdbox__giayToPhapLy">
                                                <p>Giấy tờ pháp lý:</p>
                                                <Image src="https://cdn.thuvienphapluat.vn/phap-luat/2022/KhanhHuyen/29-7-11.jpg"></Image>
                                            </div>
                                            <div className="kdbox__button">
                                                <button onClick={pheDuyet} id = {data[index].id} data-chap-nhan = "true" className="kdbox__buttonPheDuyet">Phê duyệt</button>
                                                <button onClick={pheDuyet} id = {data[index].id} data-chap-nhan = "false" className="kdbox__buttonTuChoi">Từ chối</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> : 
                            <div className="nonedatakd">
                                <div className="nonedatakd__container">
                                    <FaRegSmileBeam />
                                    <p>Hôm nay không có phòng mới được đẩy lên ...</p>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default KiemDuyet;