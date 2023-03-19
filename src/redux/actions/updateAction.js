import actionTypes from "./actionTypes";

function updateAction(payload){
    return {
        type : actionTypes.UPDATE, 
        payload : payload
    }
};

export default updateAction;