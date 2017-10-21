import axios from 'axios';

export function login(data) {
  return dispatch => {
    return axios.post('/api/v1/users/signin', data)
    //  .then((response) => {
    //   console.log(response);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }
}