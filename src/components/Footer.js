import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #0f4c81;
  height: 40px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = () => (
  <Wrapper>Ce site n'est pas un site officiel du gouvernement</Wrapper>
);

export default Footer;
