import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import Footer from "../Footer/footer";

function PageDefault(){
    return (
        <>
            <div className="pd">
                <div className="pd__container">
                    <Header />
                    <div className="pd__main">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default PageDefault;