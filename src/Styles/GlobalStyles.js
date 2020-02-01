import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
// 요게 styled-components 최신방식으로 만드는 global styles(2020/02/01)?)
export default createGlobalStyle`
  ${reset}
  * {
    box-sizing:border-box;
  }
`;
