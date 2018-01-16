const mockData = {
  authResponse: {
    message: 'Log in successful',
    user: {
      id: 2,
      firstName: 'mary',
      lastName: 'doe',
      emailAddress: 'marydoe@gmail.com',
      iat: 1515777593,
      exp: 1515863993
    },
    token:
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJpZCI6MiwiZmlyc3ROYW1lIjoibWFyeSIsImxhc3ROYW1lIjoiZG9lIiwiZW1haWxBZGRy
    ZXNzIjoibWFyeWRvZUBnbWFpbC5jb20iLCJpYXQiOjE1MTU3Nzc1
    OTMsImV4cCI6MTUxNTg2Mzk5M30.
    y6Ky5AX7JYAEuj_DXYfMaK20rlLqCVFFR4pcvhX0ZQg`
  },

  signinData: {
    emailAddress: 'john@gmail.com',
    password: 'password'
  }

};

export default mockData;
