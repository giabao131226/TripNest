
const changeAttHeader = (state = false,actions) => {
    switch (actions.type){
        case "CHANGEHEADER":
            return actions.att
        default:
            return state
    }

}
export default changeAttHeader;