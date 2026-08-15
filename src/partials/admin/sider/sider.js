
import { MdMenu } from "react-icons/md";
import "./sider.css"
import { Link } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { BiSolidUserAccount } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";



import { useState } from "react";


const items = [
    {
        label: <Link to={"/admin/quan-ly-tai-khoan"} > <span >Quản Lý Tài Khoản</span></Link>,
        key: 'account',
        icon: <BiSolidUserAccount />
    },
    {
        label: "Quản Lý Bài Đăng",
        key: 'post',
        children: [
            {
                "label": <Link to = {"quan-ly-bai-dang"}>Quản Trị</Link>,
                "key": "quan-tri",
                icon: <MdAdminPanelSettings />
            },
            {
                "label": <Link to = {"quan-ly-bai-dang/kiem-duyet"}>Kiểm duyệt</Link>,
                "key": 'kiem-duyet',
                icon: <FaShieldAlt />
            }
        ]
    },
    {
        label: "Quản Lý Bài Kiểm Tra",
        key: "test",
        children: [
            {
                "label": <Link to = {"quan-ly-bai-kiem-tra"}>Quản Trị</Link>,
                "key": 'manage-test'
            },
            {
                "label": <Link to = {"quan-ly-bai-kiem-tra/create"}>Tạo Bài Kiểm Tra</Link>,
                "key": 'create-test',
                icon: <MdLibraryAdd />
            }
        ]
    },
    {
        label: <Link to = {"roles"}>Nhóm Quyền</Link>,
        key: "roles"
    },
    {
        label: <Link to = {"permissions"}>Phân Quyền</Link>,
        key: "permissions"
    }
]

export default function Sider() {
    const [current, setCurrent] = useState('account');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <div className="sider bg-black bg-white d-flex flex-column justify-start px-4 py-2">
                <div className="d-flex items-center justify-between text-white">
                    <Link to = {"/admin"}><span className="header-admin-title">Admin</span></Link>
                    <button className="cursor-pointer bg-transparent border-none font-20 text-white"><MdMenu /></button>
                </div>

                <Menu theme="dark" items={items} mode="inline"></Menu>
            </div>
        </>
    )
}