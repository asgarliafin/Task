import data from "../data/orders";
import tables from '../data/tables/tables.json';
import waiters from '../data/waiters/waiters.json';

var intialValue = {
    data: data,
    waiters: waiters,
    tables: tables
};

function Reducer(state = intialValue, action) {
    const { type, payload } = action;

    function create() {
        const tableFilter = state.tables.filter(item => item !== payload.table);
        return { ...state, data: [...state.data, payload], tables: tableFilter };
    };

    function filteredTable(table) {
        let index = table.length;
        index = +table.slice(index - 1, index) - 1;
        let tableArr = [...state.tables];
        tableArr.splice(index, 0, table);
        return tableArr;
    };

    function update() {
        let { id, table } = payload;
        const filtered = state.data.map(item => item.id == id ? payload : item)
        if (payload.situation == "sonlanıb") {
            let tableArr = filteredTable(table);
            return { ...state, data: filtered, tables: tableArr }
        }
        else {
            return { ...state, data: filtered };
        }
    };

    function cancel() {
        let { obj, id } = payload;
        let mapArr = state.data.map(item => item.id == id ? obj : item);
        let tableArr = filteredTable(obj.table);
        return { ...state, data: mapArr, tables: tableArr };
    };

    switch (type) {
        case "CREATE": return create();
        case "UPDATE": return update();
        case "CANCEL": return cancel();
        default: return state;
    };
};

export default Reducer;