const initialState = {
  1: 1,
  2: 2,
  3: 4,
  4: 7,
};

export default (state = initialState, { type, payload }) => {
  switch (state) {
    /*    case INITIALIZE_HANDS:
    case ADD_CARD:
    case REMOVE_CARD:*/
    default:
      return state;
  }
};
