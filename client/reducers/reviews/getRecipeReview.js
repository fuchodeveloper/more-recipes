import { ADD_REVIEW } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      console.log('We are here');
      return Object.assign(
        {},
        state,
        action.recipe
      );
    default:
      return state;
  }
};
