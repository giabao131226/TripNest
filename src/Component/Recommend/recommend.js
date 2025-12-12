import Customer from "../customers/customers";
import "./recommend.css"
function Recommend() {
    return (
        <>
            <div className="recommend">
                <div className="recommend__body">
                    <div className="recommend__container">
                        <h1 className="recommend__title">Gợi Ý Cho Bạn</h1>
                        <div className="recommend__main">
                            <div className="recommend__side">
                                <div className="vienimg">
                                    <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2017/05/ro1.jpg"></img>
                                </div>
                                <div className="recommend__des">
                                    <p className="name">HA Resort</p>
                                    <p>A midsummer night’s dream - a classic right? You bet it is..the stay at the Resort, offers the king-size gorgeous pool!</p>
                                </div>
                                <div className="recommend__button">
                                    <button><span>BOOK NOW</span></button>
                                    <button><span>ENQUIRE</span></button>
                                </div>
                            </div>
                            <div className="recommend__center">
                                <div className="vienimg">
                                    <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2017/05/ro2.jpg"></img>
                                </div>
                                <div className="recommend__des">
                                    <p className="name">Gia Bao Villa</p>
                                    <p> Misty Mount is truly a home away from home. A charming lobby welcomes you and instantly you feel at home! </p>
                                </div>
                                <div className="recommend__button">
                                    <button><span>BOOK NOW</span></button>
                                    <button><span>ENQUIRE</span></button>
                                </div>
                            </div>
                            <div className="recommend__side">
                                <div className="vienimg">
                                    <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2017/05/ro1.jpg"></img>
                                </div>
                                <div className="recommend__des">
                                    <p className="name">HA Resort</p>
                                    <p>A midsummer night’s dream - a classic right? You bet it is..the stay at the Resort, offers the king-size gorgeous pool!</p>
                                </div>
                                <div className="recommend__button">
                                    <button><span>BOOK NOW</span></button>
                                    <button><span>ENQUIRE</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Customer />
        </>
    )
}
export default Recommend;