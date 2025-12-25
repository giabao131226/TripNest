import Body from "../Component/Body/body";
import BDSList from "../Component/dsPhong/dsPhong";
import ChiTiet from "../Component/HienThiChiTiet/chitiet";
import KiemDuyet from "../Component/KiemDuyetTT/kiemduyet";
import LichSuDatPhong from "../Component/lichSuDatPhong/history";
import PageDefault from "../Component/PageDefault/Pagedefault";
import QueryRoom from "../Component/QueryRoom/queryroom";
import RegisterBoss from "../Component/RegisterBoss/registerboss";
import Terms from "../Component/terms/terms";

export const routes = [
    {
        path: "/",
        element: <PageDefault />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/list-bds",
                element: <BDSList />,
                children: [
                    {
                        path: "",
                        element: <QueryRoom />
                    },
                    {
                        path: ":id",
                        element: <ChiTiet />
                    }
                ]
            },
            {
                path: "/your-property",
                element: <RegisterBoss />
            },
            {
                path: "/terms",
                element: <Terms/>
            },
            {
                path: "/history-book",
                element: <LichSuDatPhong />
            },
            {
                path: "/kiem-duyet",
                element: <KiemDuyet />
            }
        ]
    },
]