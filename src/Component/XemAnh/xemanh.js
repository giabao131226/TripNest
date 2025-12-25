import './xemanh.css'
import { Image } from 'antd';
function XemAnh(images){
    const data = images.image ?? [];
    return (
        <>
            <div className="xemanh">
                <div className="xemanh__container">
                    <div className = "xemanh__images">
                        {data.map((item,index) => (
                            <Image className = "image" width = {200}  src = {item.hinhAnh} key = {index}></Image>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default XemAnh;