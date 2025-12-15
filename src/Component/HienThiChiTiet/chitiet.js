import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import XemAnh from "../XemAnh/xemanh";
import AboutRoom from "../AboutRoom/AboutRoom";

function ChiTiet(){
    const params = useParams()
    const [data,setData] = useState([])
    const [disableButton,setDisable] = useState(false)
    useEffect(() => {
        fetch("https://servertripnest.onrender.com/api/bds/"+params.id)
            .then(res => res.json())
            .then(data => {
                setData(data)
                setDisable(data.trangThai);
            })
    },[])
    return (
        <>
            <div className="xemchitiet">
                <div className="xemchitiet__container">
                    <XemAnh image = {data.images}/>
                    <AboutRoom data = {data} disableButton = {disableButton} setDisable  = {setDisable} params = {params}/>
                </div>
            </div>
        </>
    )
}
export default ChiTiet;