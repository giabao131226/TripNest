import avatar from "../../assets/img/Logo-final.PNG"
import { CiLocationOn } from "react-icons/ci";
import { MdPhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import "./footer.css"



function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer__container">
                    <div className="footer__info">
                        <div className="footer__suAndadd">
                            <p>Sign up for our newsletter to receive special offers, news,and events</p>
                            <ul className="footer__add">
                                <li>
                                    <CiLocationOn /> 175 Tay Son, Kim Lien, Ha Noi,Viet Nam
                                </li>
                                <li>
                                    <MdPhoneInTalk />
                                    +123 444 555
                                </li>
                                <li>
                                    <MdOutlineEmail />
                                    tripnestbooking@gmail.com
                                </li>
                            </ul>
                        </div>
                        <div className="footer__genAndco">
                            <div className="general">
                                <p>General</p>
                                <ul>
                                    <li>Accommodation</li>
                                    <li>Dine & Drink</li>
                                    <li>Spa & Leisure</li>
                                    <li>Service</li>
                                </ul>
                            </div>
                            <div className="connect">
                                <p>Connect</p>
                                <ul className="connect">
                                    <li><FaFacebookF /> Facebook</li>
                                    <li><FaXTwitter /> X</li>
                                    <li><FaInstagram /> Instagram</li>
                                    <li><FaYoutube /> Youtube</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer__logo">
                        <img src={avatar}></img>
                    </div>
                    <div className="footer__about">
                        <p>@2025 Uxper, All Right Reserved</p>
                        <div className="chinhsach">
                            <p>Terms & conditions</p>
                            <p>Privacy policy</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;