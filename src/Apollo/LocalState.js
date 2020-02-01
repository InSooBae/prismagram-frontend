/* 이번 localState로는 Authenticate이 되는지 안되는지만  */

export const defaults = {
  isLoggedIn: localStorage.getItem('token') !== null ? true : false
};

export const resolvers = {
  Mutation: {
    /* LogIn */
    /* parent(_)가 딸린 graphQL mutation이 될거임 그리고 context 상의 token이나 cache같은 매개변수 가짐 */
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem('token', token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    /* LogOut */
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem('token');
      /* 전체 페이지 reload */
      window.location.reload();
      return null;
    }
  }
};
