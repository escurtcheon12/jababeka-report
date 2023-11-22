export const DATA_COMMENT = "DATA_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export const setData = (value) => (dispatch) => {
  dispatch({
    type: DATA_COMMENT,
    payload: value,
  });
};

export const onInputData = (value) => (dispatch) => {
  dispatch({
    type: UPDATE_COMMENT,
    payload: value,
  });
};
