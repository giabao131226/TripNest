
import Blog from "../Blog/blog";
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
            <Recommend />
            <Blog/>

        </>
    )
}
export default Body;