
const auth = (state = {},action) => {
    switch(action.type){
        case "UPDATE":
            return {...state,...action};
        default:
            return state;
    }
}

export default auth;