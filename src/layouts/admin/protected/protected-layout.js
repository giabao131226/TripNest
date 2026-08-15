import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayoutAdmin() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        fetch("http://localhost:5000/admin/auth/getInfo", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    dispatch({
                        type: "UPDATE",
                        payload: data.user
                    });
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            })
            .catch((error) => {
                setAuthenticated(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch]);
    if (loading) {
        return <div>Đang kiểm tra đăng nhập...</div>;
    }
    if (!authenticated) {
        return (
            <Navigate
                to="/admin/auth/login"
                replace
            />
        );
    }
    return <Outlet />;
}