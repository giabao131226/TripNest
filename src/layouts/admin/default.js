import { Outlet } from "react-router-dom";
import Sider from "../../partials/admin/sider/sider";

export default function LayoutDefault(){
    return (
        <>
            <div className="layout-admin d-flex">
                <Sider />
                <div className="d-flex flex-column col-12 px-0 py-0">
                    <header className="bg-black px-0 py-0 d-flex justify-between items-center">
                        <span>Admin</span>
                        <div>Thông tin người dùng</div>
                    </header>
                    <Outlet />
                </div>
            </div>
        </>
    )
}