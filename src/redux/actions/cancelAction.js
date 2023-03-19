import actionTypes from "./actionTypes";

function cancelAction(payload){
    return {
        type : actionTypes.CANCEL, 
        payload
    }
};

export default cancelAction;