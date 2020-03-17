import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #0f4c81;
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Footer = () => (
  <Wrapper>
    Ce site n'est pas affilié au gouvernement français. Aucune donnée n'est
    conservée.
  </Wrapper>
);

export default Footer;
