import { Link } from "react-router-dom";
import "./nonedata.css"
function NoneData(){
    return (
        <div className="nonedata">
            <div className="nonedata__container">
                <div className="nonedata__vienimg">
                    <img src="https://static.vecteezy.com/system/resources/previews/007/781/980/non_2x/sunbathing-on-the-beach-while-drinking-coconut-water-free-vector.jpg"></img>
                </div>
                <div className="nonedata__main">
                    <p>Bạn chưa có đặt phòng này hoặc chúng tôi không thể truy cập vào thông tin đặt phòng của bạn vào lúc này. Bạn có thể tìm kiếm các đặt phòng mà bạn đã thực hiện với tư cách khách trong năm qua bằng địa chỉ email của mình.</p>
                    <div>
                        <Link to = {"/list-bds"}><button>Tìm kiếm đặt chỗ</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NoneData;