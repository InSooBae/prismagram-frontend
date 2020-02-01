import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
// 요게 styled-components 최신방식으로 만드는 global styles(2020/02/01)?)

//globaStyle이 themeProvider안에 있어서 불러오기가능
export default createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');

  * {
    box-sizing:border-box;
  }
  body {
    background-color:${props => props.theme.bgColor};
    color:${props => props.theme.blackColor};
    font-size:14px;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  }
  a {
    color:${props => props.theme.blueColor};
    text-decoration:none
  }
  input:focus{
        outline:none;
    }
`;
