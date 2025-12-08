import Body from "../Component/Body/body";
import BDSList from "../Component/dsPhong/dsPhong";
import PageDefault from "../Component/PageDefault/Pagedefault";
import Register from "../Component/Register/register";
import SignIn from "../Component/Signin/signin";

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
                element: <BDSList />
            }
        ]
    },
]