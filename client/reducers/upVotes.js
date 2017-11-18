import { ADD_UPVOTE } from '../action/types';

const initialState = {
  addUpvote: ADD_UPVOTE
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_UPVOTE:
      return {
        ...state, action
      };
    default:
      return state;
  }
};
