import styled, { css } from 'styled-components';

export const base = 16;
export const spacing = (input = 1) => `${input * base}px`;

export const theme = {
  primary: 'rgb(107,179,223)',
  primaryLight: 'rgb(108, 191,231)',
  background: 'rgb(231,236,239)',

  text: 'rgb(60, 60, 60)',
  textLight: 'rgb(0, 58, 81)',

  spacing,
};

export const viewportSizes = {
  desktop: 1024,
  tablet: 800,
  tabletMini: 500,
};

const mediaQuery = (...query) => (...rules) =>
  css`
    @media ${css(...query)} {
      ${css(...rules)};
    }
  `;

export const media = {
  tabletMini: mediaQuery`(min-width: ${viewportSizes.tabletMini / 16}em)`,
  tablet: mediaQuery`(min-width: ${viewportSizes.tablet / 16}em)`,
  medium: mediaQuery`(min-width: ${viewportSizes.medium / 16}em)`,
  desktop: mediaQuery`(min-width: ${viewportSizes.desktop / 16}em)`,
};

export const ButtonReset = styled.button`
  border: 0;
  background-color: transparent;
  text-decoration: none;
  color: inherit;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 50em;
  padding: 0 ${spacing()};
  margin-left: auto;
  margin-right: auto;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Buttons = styled.div`
  width: 100%;
  margin-left: ${({ theme }) => theme.spacing(-1)};
  margin-top: ${({ theme }) => theme.spacing(-1)};
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing()};

  > * {
    margin-left: ${({ theme }) => theme.spacing()};
    margin-top: ${({ theme }) => theme.spacing()};
  }
`;
