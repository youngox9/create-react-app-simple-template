const initialState = {
  isLoading: false,
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
};

export function setLoading(isLoading) {
  console.log("isLoading >>>>", isLoading);
  return {
    type: "SET_LOADING",
    isLoading,
  };
}

export default main;
