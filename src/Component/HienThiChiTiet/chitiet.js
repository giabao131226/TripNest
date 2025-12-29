import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import XemAnh from "../XemAnh/xemanh";
import AboutRoom from "../AboutRoom/AboutRoom";

function ChiTiet(){
    const params = useParams()
    const [data,setData] = useState([])
    const [disableButton,setDisable] = useState(false)
    useEffect(() => {
        fetch("https://servertripnest-4.onrender.com/api/phong/"+params.id)
            .then(res => res.json())
            .then( async (duLieu) => {
                const resTI = await fetch(`https://servertripnest-4.onrender.com/api/tienich?idbds=${duLieu.id}`);
                const tienIch = await resTI.json()
                duLieu = {
                    ...duLieu,tienIch
                }
                const resHA = await fetch(`https://servertripnest-4.onrender.com/api/hinhanh?idbds=${duLieu.id}`)
                const hinhAnh = await resHA.json()
                duLieu = {
                    ...duLieu,hinhAnh
                }
                setData(duLieu)
                setDisable(duLieu.trangThai)
            }
            )
    },[])
    return (
        <>
            <div className="xemchitiet">
                <div className="xemchitiet__container">
                    <XemAnh image = {data.hinhAnh}/>
                    <AboutRoom data = {data} disableButton = {disableButton} setDisable  = {setDisable} params = {params}/>
                </div>
            </div>
        </>
    )
}
export default ChiTiet;