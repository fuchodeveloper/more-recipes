// import { ADD_UPVOTE } from '../action/types';

// // export default (state = initialState, action) => {
// //   switch (action.type) {
// //     case ADD_UPVOTE:
// //       return {
// //         ...state, action
// //       };
// //     default:
// //       return state;
// //   }
// // };

// export default (state = {}, action) => {
//   // console.log(action);
//   switch (action.type) {
//     case ADD_UPVOTE:
//       // return {
//       //   ...state,
//       //   addUpvote: action.addUpvote
//       // };
//       return Object.assign(
//         {},
//         state,
//         action.recipe
//       );
//     default:
//       return state;
//   }
// };
