import { GiOwl } from "react-icons/gi";
import { Carousel } from "antd";
import avatar from "../../assets/img/566594403_1533475680974143_3287421136031794731_n.png"
import "./customers.css"

function Customer() {
    return (
        <>
            <div className="customer">
                <div className="customer__container">
                    <div className="customer__title">
                        <GiOwl />
                        <h1>Happy Customers</h1>
                    </div>
                    <div className="customer__main">
                        <Carousel autoplay arrows>
                            <div>
                                <div className="customer__slide">
                                    <div className="customer__box">
                                        <div className="customer__inner">
                                            <p>“Booking is super fast, and prices are consistently the best. The trip suggestion feature is incredibly useful. Everything runs smoothly. Definitely deserves 5 stars!”</p>
                                            <div className="customer__about">
                                                <div className="customer__vienimg">
                                                    <img src={avatar}></img>
                                                </div>
                                                <div className="customer__info">
                                                    <p>Ms.Hoang Anh</p>
                                                    <p>Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="customer__box">
                                        <div className="customer__inner">
                                            <p>“Booking is super fast, and prices are consistently the best. The trip suggestion feature is incredibly useful. Everything runs smoothly. Definitely deserves 5 stars!”</p>
                                            <div className="customer__about">
                                                <div className="customer__vienimg">
                                                    <img src={avatar}></img>
                                                </div>
                                                <div className="customer__info">
                                                    <p>Ms.Hoang Anh</p>
                                                    <p>Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="customer__box">
                                        <div className="customer__inner">
                                            <p>“Booking is super fast, and prices are consistently the best. The trip suggestion feature is incredibly useful. Everything runs smoothly. Definitely deserves 5 stars!”</p>
                                            <div className="customer__about">
                                                <div className="customer__vienimg">
                                                    <img src={avatar}></img>
                                                </div>
                                                <div className="customer__info">
                                                    <p>Ms.Hoang Anh</p>
                                                    <p>Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="customer__slide">
                                    <div className="customer__box">
                                        <div className="customer__inner">
                                            <p>“Booking is super fast, and prices are consistently the best. The trip suggestion feature is incredibly useful. Everything runs smoothly. Definitely deserves 5 stars!”</p>
                                            <div className="customer__about">
                                                <div className="customer__vienimg">
                                                    <img src={avatar}></img>
                                                </div>
                                                <div className="customer__info">
                                                    <p>Ms.Hoang Anh</p>
                                                    <p>Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="customer__box">
                                        <div className="customer__inner">
                                            <p>“Booking is super fast, and prices are consistently the best. The trip suggestion feature is incredibly useful. Everything runs smoothly. Definitely deserves 5 stars!”</p>
                                            <div className="customer__about">
                                                <div className="customer__vienimg">
                                                    <img src={avatar}></img>
                                                </div>
                                                <div className="customer__info">
                                                    <p>Ms.Hoang Anh</p>
                                                    <p>Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="customer__box">
                                        <div className="customer__inner">
                                            <p>“Booking is super fast, and prices are consistently the best. The trip suggestion feature is incredibly useful. Everything runs smoothly. Definitely deserves 5 stars!”</p>
                                            <div className="customer__about">
                                                <div className="customer__vienimg">
                                                    <img src={avatar}></img>
                                                </div>
                                                <div className="customer__info">
                                                    <p>Ms.Hoang Anh</p>
                                                    <p>Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Customer;