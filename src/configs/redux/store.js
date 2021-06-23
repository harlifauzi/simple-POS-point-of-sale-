const { createStore } = require("redux");

const initialState = {
    dataEmployee: null
}

const reducer = (state = initialState, action) => {
    if(action.type === 'UPDATE_DATA_EMPLOYEE'){
        return{
            ...state,
            dataEmployee: action.payload
        }
    }
    return state;
}

const store = createStore(reducer);

export default store;