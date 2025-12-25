
export const changeHeader = (tt) =>{
    return {
        type: "CHANGEHEADER",
        att: tt
    }
}
export const setInfo = (info) => {
    return {
        type: "SETID",
        "thongTin": info
    }
}