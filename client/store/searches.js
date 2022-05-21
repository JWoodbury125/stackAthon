import axios from "axios";

const FETCH_SEARCHES = "FETCH_SEARCHES";
const ADD_SEARCHES = "ADD_SEARCHES";

export const fetchSearches = () => {
  return async (dispatch) => {
    const searches = (await axios.get("/api/searches")).data;
    dispatch({ type: FETCH_SEARCHES, searches });
  };
};

export const addSearches = (searches) => {
  return async (dispatch) => {
    const search = (await axios.post("/api/searches/", searches)).data;
    dispatch({ type: ADD_SEARCHES, search });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SEARCHES:
      return action.searches;
    case ADD_SEARCHES:
      return [...state, action.search];
    default:
      return state;
  }
}
