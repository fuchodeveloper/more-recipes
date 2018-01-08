import { GET_PAGE_DETAILS } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PAGE_DETAILS:
      return {
        ...state,
        pageCount: action.pageCount
      };
    default:
      return state;
  }
};
