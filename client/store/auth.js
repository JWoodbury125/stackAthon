import axios from "axios";

const TOKEN = "token";

const SET_AUTH = "SET_AUTH";

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const auth = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    }).data;

    return dispatch({ type: SET_AUTH, auth });
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
