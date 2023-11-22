import { DATA_COMMENT } from "./action";

const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_COMMENT:
      return { ...state.data, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
