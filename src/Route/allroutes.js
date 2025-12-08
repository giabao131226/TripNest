import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

function AllRoutes(){
    const allroutes = useRoutes(routes)
    return (
        <>
            {allroutes}
        </>
    )
}
export default AllRoutes;