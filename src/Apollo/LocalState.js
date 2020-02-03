/* 이번 localState로는 Authenticate이 되는지 안되는지만 
  clientState은 이 앱이 오프라인 상태에서 발생
*/

export const defaults = {
  /* Boolean(null) -> false Boolean("~~") -> true */
  isLoggedIn: Boolean(localStorage.getItem('token')) || false
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
      window.location.reload();
      return null;
    },
    /* LogOut */
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem('token');
      /* 전체 페이지 reload */
      window.location = '/';
      return null;
    }
  }
};
