import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import XemAnh from "../XemAnh/xemanh";
import AboutRoom from "../AboutRoom/AboutRoom";

function ChiTiet(){
    const params = useParams()
    const [data,setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/bds/"+params.id)
            .then(res => res.json())
            .then(data => setData(data))
    },[])
    return (
        <>
            <div className="xemchitiet">
                <div className="xemchitiet__container">
                    <XemAnh image = {data.images}/>
                    <AboutRoom data = {data} params = {params}/>
                </div>
            </div>
        </>
    )
}
export default ChiTiet;