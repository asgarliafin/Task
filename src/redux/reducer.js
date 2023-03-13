import data from "../data/data";
import orderData from "../data/orderData";
import waiters from '../data/waiters.json';

var intialValue = {
    data: data,
    waiters: waiters,
    tables: orderData.masa
};

function Reducer(state = intialValue, action) {
    const { type, payload } = action;

    function create() {
        const tableFilter = state.tables.filter(item => item !== payload.masa);
        return { ...state, data: [...state.data, payload], tables: tableFilter };
    };

    function filteredTable(masa) {
        let index = masa.length;
        index = +masa.slice(index - 1, index) - 1;
        let masaArr = [...state.tables];
        masaArr.splice(index, 0, masa);
        return masaArr;
    };

    function update() {
        let { id, masa } = payload;
        const filtered = state.data.map(item => item.id == id ? payload : item)
        if (payload.situation == "sonlanıb") {
            let masaArr = filteredTable(masa);
            return { ...state, data: filtered, tables: masaArr }
        }
        else {
            return { ...state, data: filtered };
        }
    };

    function cancel() {
        let { obj, id } = payload;
        let mapArr = state.data.map(item => item.id == id ? obj : item);
        let masaArr = filteredTable(obj.masa);
        return { ...state, data: mapArr, tables: masaArr };
    };

    switch (type) {
        case "CREATE": return create();
        case "UPDATE": return update();
        case "CANCEL": return cancel();
        default: return state;
    };
};

export default Reducer;