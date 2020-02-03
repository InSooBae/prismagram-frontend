import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Logo } from './Icons';

//로딩 애니메이션
const Animation = keyframes`
  0%{
    opacity:0
  }50%{
    opacity:1
  }100%{
    opacity:0
  }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default () => (
  <Loader>
    <Logo size={30} />
  </Loader>
);
