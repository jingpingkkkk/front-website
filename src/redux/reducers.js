// reducers.js
const initialState = {
  data: null,
};

const dataReducer = (action, state = initialState) => {
  switch (action?.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
