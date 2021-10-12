const SET_LOADING = "SET_LOADING";

const initialState = {
  isLoading: false,
  auth: {
    uid: sessionStorage.getItem("uid"),
    token: sessionStorage.getItem("token"),
  },
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case "SET_AUTH":
      const { uid, token } = action.auth;
      sessionStorage.getItem("uid");
      sessionStorage.getItem("token");
      return { ...state, auth: action.auth };
    default:
      return state;
  }
};

export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    isLoading,
  };
}

export function setAuth(auth) {
  console.log(">>>>>", "action");
  return {
    type: "SET_LOADING",
    auth,
  };
}

export default reducers;
