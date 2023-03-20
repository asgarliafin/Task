import actionTypes from "./actionTypes";

function createAction(payload) {
    return {
        type : actionTypes.CREATE,
        payload : payload
    }
};

export default createAction;