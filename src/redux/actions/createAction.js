import actionTypes from "./actionTypes";

function createAction(payload) {
    return {
        type : actionTypes.CREATE,
        payload
    }
};

export default createAction;