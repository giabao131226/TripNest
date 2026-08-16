import { useCallback, useEffect, useState } from "react"
import { FaHotel } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "../../../../Component/Pagination/pagination";
import "./index.css"

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
                console.log(data);
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