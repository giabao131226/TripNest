import { Outlet } from "react-router-dom";
import Header from "../Header/header";

function PageDefault(){
    return (
        <>
            <div className="pd">
                <div className="pd__container">
                    <Header />
                    <div className="pd__main">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
export default PageDefault;