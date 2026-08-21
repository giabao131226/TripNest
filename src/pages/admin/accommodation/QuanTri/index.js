import { useCallback, useEffect, useState } from "react"
import { FaCheck, FaHotel } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "../../../../Component/Pagination/pagination";
import "./index.css"
import { IoMdTime } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";

export default function QuanTri() {

    const [accommodations, setAccommodations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const getAccommodationAtt = useCallback((att) => {
        if (att === "active") {
            return <span className="accommodation-status status-active">Hoạt Động</span>;
        }

        if (att === "inactive") {
            return <span className="accommodation-status status-inactive">Không hoạt động</span>;
        }

        if (att === "pending") {
            return <span className="accommodation-status status-pending">Đang chờ kiểm duyệt</span>;
        }

        return <span className="accommodation-status status-rejected">Bị Từ Chối</span>;
    }, []);

    const onPageChange = useCallback((page) => {
        setCurrentPage(page);
    }, [currentPage])

    useEffect(() => {
        fetch(`http://localhost:5000/admin/accommodation/all?page=${currentPage}`, {
            "credentials": "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCurrentPage(data.currentPage);
                    setTotalPage(data.totalPage);
                    setAccommodations(data.accommodations);
                }
            })
    }, [currentPage])

    return (
        <>
            <div className="container-fluid text-align-start">
                <div className="container">

                    <div className="accommodation-dashboard">
                        <p>Số liệu</p>
                        <hr></hr>
                        <div className="d-flex items-center justify-between">
                            <div className="accommodation-card col-3">
                                <div className="active">
                                    <FaCheck />
                                </div>
                                <div className="d-flex flex-column solieu">
                                    <span>100</span>
                                    <span>Đang Hoạt Động</span>
                                </div>
                            </div>
                            <div className="accommodation-card col-3">
                                <div className="inactive">
                                    <FaToggleOff />
                                </div>
                                <div className="d-flex flex-column solieu">
                                    <span>100</span>

                                    <span>Không Hoạt Động</span>
                                </div>
                            </div>
                            <div className="accommodation-card col-3">
                                <div className="pending">
                                    <IoMdTime />
                                </div>
                                <div className="d-flex flex-column solieu">
                                    <span>100</span>

                                    <span>Chờ Kiểm Duyệt</span>
                                </div>
                            </div>
                            <div className="accommodation-card col-3">
                                <div className="denided">
                                    <FaTimesCircle />
                                </div>
                                <div className="d-flex flex-column">
                                    <span>100</span>

                                    <span>Bị Từ Chối</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <table className="accommodation-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Cơ Sở Lưu Trú</th>
                                <th>Chủ Cơ Sở</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {accommodations.map((item, index) => (
                                <tr key={item._id || index}>
                                    <td>{index + 1}</td>

                                    <td>{item.name}</td>

                                    <td>{item.ownerId?.username}</td>

                                    <td>
                                        {getAccommodationAtt(item.status)}
                                    </td>

                                    <td className="accommodation-actions">
                                        <button className="accommodation-btn accommodation-btn-view">
                                            <FaHotel />
                                        </button>

                                        <button className="accommodation-btn accommodation-btn-flag">
                                            <FaFlag />
                                        </button>

                                        <button className="accommodation-btn accommodation-btn-delete">
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination crcurrentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange} />
                </div>
            </div>

        </>
    )
}