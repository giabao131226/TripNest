const getInfo = (state = {},actions) => {
    switch (actions.type){
        case "SETID":
            return actions.thongTin
        default:
            return state
    }
}
export default getInfo;