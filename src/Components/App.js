import React from 'react';
import { gql } from 'apollo-boost';
import { HashRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Routes from './Routes';
import Footer from './Footer';
import Header from './Header';
import Theme from '../Styles/Theme';
import GlobalStyles from '../Styles/GlobalStyles';
// client로 보내는 query가 아니기 때문에 이파일에 둠 @client(client query)를 안하면 react apollo가 query를 API로 보내려고함(API대신에 cache에 대해서 실행)
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  //react apollo hooks (useQuery())
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            <Header />
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
