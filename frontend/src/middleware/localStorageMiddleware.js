const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  // Save the state to localStorage after every action
  localStorage.setItem("reduxState", JSON.stringify(store.getState().auth));
  return result;
};

export default localStorageMiddleware;
