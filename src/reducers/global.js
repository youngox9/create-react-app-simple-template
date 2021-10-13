const SET_LOADING = "SET_LOADING";
const SET_AUTH = "SET_AUTH";
const CLEAR_AUTH = "CLEAR_AUTH";
const SET_SHARED_WORKSPACES = "SET_SHARED_WORKSPACES";
const SET_OWNED_WORKSPACES = "SET_OWNED_WORKSPACES";

const initialState = {
  isLoading: false,
  auth: {
    uid: sessionStorage.getItem("uid"),
    token: sessionStorage.getItem("token"),
  },
  sharedWorkspaces: [],
  ownedWorkspaces: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_AUTH:
      const { uid, token } = action.auth;
      sessionStorage.setItem("uid", uid);
      sessionStorage.setItem("token", token);
      return { ...state, auth: { uid, token } };
    case CLEAR_AUTH:
      sessionStorage.setItem("uid", "");
      sessionStorage.setItem("token", "");
      return { ...state, auth: { uid: "", token: "" } };
    case SET_SHARED_WORKSPACES:
      return { ...state, sharedWorkspaces: action.data };
    case SET_OWNED_WORKSPACES:
      return { ...state, ownedWorkspaces: action.data };
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
  return {
    type: SET_AUTH,
    auth,
  };
}

export function clearAuth() {
  return {
    type: CLEAR_AUTH,
  };
}

export function setSharedWorkspaces(data) {
  return {
    type: SET_SHARED_WORKSPACES,
    data,
  };
}

export function setOwnedWorkspaces(data) {
  return {
    type: SET_OWNED_WORKSPACES,
    data,
  };
}
export default reducers;
