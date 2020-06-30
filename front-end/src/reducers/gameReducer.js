export default (state = { ready: false }, { type, payload }) => {
  switch (type) {
    case 'READY':
      const ready = !state.ready;
      return { ...state, ready };
    default:
      return state;
  }
};
