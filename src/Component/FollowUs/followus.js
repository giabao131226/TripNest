import { FaInstagram } from "react-icons/fa";
import "./followus.css"

function FollowUs(){
    return (
        <>
            <div className="followus">
                <div className="followus__container">
                    <div className="followus__title">
                        <FaInstagram />
                        <p>Follow Us</p>
                    </div>
                    <div className="followus__main">
                        <div className="follow__vienimg">
                            <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2017/05/ro5-768x461.jpg"></img>
                        </div>
                        <div className="follow__vienimg">
                            <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2017/05/ro5-768x461.jpg"></img>
                        </div>
                        <div className="follow__vienimg">
                            <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2017/05/ro5-768x461.jpg"></img>
                        </div>
                        <div className="follow__vienimg">
                            <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2017/05/ro5-768x461.jpg"></img>
                        </div>
                        <div className="follow__vienimg">
                            <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2017/05/ro5-768x461.jpg"></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FollowUs;