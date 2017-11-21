import { RECEIVE_RECIPE, RECEIVE_VOTE } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RECIPE:
      return Object.assign(
        {},
        state,
        action.recipe
      );
    case RECEIVE_VOTE:
      return Object.assign(
        {},
        state, {
          upVotes: action.upVotes,
          downVotes: action.downVotes
        }
      );
    default:
      return state;
  }
};
