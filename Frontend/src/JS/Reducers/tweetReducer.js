import {
  DASHBOARDTWEETS,
  CURRENTTWEET,
  BOOKMARKEDTWEETS,
  LISTTWEETS,SETPAGENUM
} from "../Types/types";

const initialState = {
  dashboardTweets: [],
  currentTweet: "",
  listTweets: [],
  bookmarkedTweets: [], pageNum : 1
};

export const tweetReducer = function(state = initialState, action) {
  switch (action.type) {
    case DASHBOARDTWEETS:
      return Object.assign({}, state, {
        dashboardTweets: action.payload
      });
    case CURRENTTWEET:
      return Object.assign({}, state, {
        currentTweet: action.payload
      });
    case LISTTWEETS:
      debugger;
      return Object.assign({}, state, {
        listTweets: action.payload
      });
    case BOOKMARKEDTWEETS:
      return Object.assign({}, state, {
        bookmarkedTweets: action.payload
      });
      case SETPAGENUM :
        return Object.assign({}, state, {
            pageNum : action.payload
        });
    default:
      return state;
  }
};