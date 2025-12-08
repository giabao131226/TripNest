import './slideuudai.css'
import { Carousel } from 'antd';
function SlideUuDai() {
    return (
        <>
            <div className="slideuudai">
                <div className="slideuudai__container">
                    <Carousel arrows autoplay>
                        <div className='slideGiamGia'>
                            <p>Mã giảm đến 100K cho căn phòng đầu tiên bạn đặt.Đặt Phòng Ngay!!</p>
                        </div>
                        <div className='slideDNDK'>
                            <p>Đăng Nhập/đăng ký để bắt đầu đặt phòng đầu tiên cho bạn và quản lý bđs của bạn dễ dàng hơn.</p>
                        </div>
                    </Carousel>
                </div>
            </div>
        </>
    )
}
export default SlideUuDai;