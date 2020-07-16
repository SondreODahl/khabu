const addCard = (state, { payload, id, value }) => {
  const card = { id, value };
  return { ...state, [id]: card };
};

const cardsById = (state = {}, { type, action }) => {
  switch (type) {
    default:
      return state;
  }
};
