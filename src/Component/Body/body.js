
import Blog from "../Blog/blog";
import FollowUs from "../FollowUs/followus";
import Recommend from "../Recommend/recommend";
import Welcome from "../Welcome/welcome";
import "./body.css";
import { Carousel } from 'antd';
import { Link } from "react-router-dom";

function Body(){
    const onChange = currentSlide => {
        const element = document.querySelectorAll(".slick-active .slide__text .slide__t")
        setTimeout(() => {
            element[0].classList.add("open");
        },2000)
        setTimeout(() => {
            element[1].classList.add("open2")
        },2500)
        setTimeout(() => {
            element[0].classList.remove("open")
            element[1].classList.remove("open2")
        },6000)
    }
    return (
        <>
            <div className="body">
                <div className="body__container">
                    <Carousel afterChange={onChange} dots = {false} arrows autoplay autoplaySpeed={8000} effect="fade">
                        <div className="slide">
                            <div className="slide__text">
                                <h1 className="slide__t">Chào mừng đến với TripNest</h1>
                                <p className="slide__t">Đặt căn phòng đầu tiên của bạn nào</p>
                            </div>
                        </div >
                        <div className="slide1">
                            <div className="slide__text">
                                <h1 className="slide__t">Chào mừng đến với TripNest</h1>
                                <p className="slide__t">Đặt căn phòng đầu tiên của bạn nào</p>
                            </div>
                        </div>
                        <div className="slide2">
                            <div className="slide__text">
                                <h1 className="slide__t">Chào mừng đến với TripNest</h1>
                                <p className="slide__t">Đặt căn phòng đầu tiên của bạn nào</p>
                            </div>
                        </div>
                        <div className="slide3">
                            <div className="slide__text">
                                <h1 className="slide__t">Chào mừng đến với TripNest</h1>
                                <p className="slide__t">Đặt căn phòng đầu tiên của bạn nào</p>
                            </div>
                        </div>
                    </Carousel>
                    <div className="discovery">
                        <div className="discovery__container">
                            <Link to = {"/list-bds"}><button>Khám Phá</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Welcome />

            <div className="banner-animation d-flex items-center gap-x-3">
                <div className="limit banner-1 col-2">
                    <img src = "https://tostemvietnam.com/wp-content/uploads/2025/08/mau-homestay-san-vuon-phong-cach-nhat-ban.jpg"></img>
                </div>
                <div className="limit banner-2 col-2">
                    <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz3ZUTg5YKTXlDE92DOmDoHx3eo364o-whl8sHYMPACY66hSFOVQKk9Fs&s=10"></img>
                </div>
                <div className="limit banner-3 col-2">
                    <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6DqzfwGHMnhDnUzNEpxHcKm1gILawV7GareK25q1V8EIHMqWmIAPV2A&s=10"></img>
                </div>
                <div className="limit banner-4 col-2">
                    <img src = "https://cdn.justfly.vn/400x300/media/202110/01/1633072187-khuon-vien-vuon-lan-villa-son-tay-ha-noi1.jpg"></img>
                </div>
                <div className="limit banner-5 col-2">
                    <img src = "https://vivatrip.vn/public/images/uploads/hotels/hotel_795363942_891403103.webp"></img>
                </div>
                <div className="limit banner-6 col-2">
                    <img src = "https://thuevilla.com.vn/wp-content/uploads/2022/11/388570190.jpg"></img>
                </div>
            </div>

            <Recommend />
            <Blog/>
            <FollowUs />
        </>
    )
}
export default Body;