import { Fetch } from "./fetchApi"
export const fetchApi = async(method,duLieu) => {
    console.log(method,duLieu)
    return (await Fetch(method,duLieu))
}