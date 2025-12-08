import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

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
            
        </>
    )
}
export default ChiTiet;