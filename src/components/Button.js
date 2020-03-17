import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

export const Wrapper = styled.button`
  display: flex;
  border-radius: 28px;
  padding: ${({ theme }) => theme.spacing(0.5)}
    ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid transparent;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  min-width: 10em;
  cursor: pointer;
  transition: color 150ms ease, opacity 150ms ease, background 150ms ease,
    box-shadow 150ms ease;
  text-decoration: none;
  outline: none;

  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  max-height: 45px;

  &:hover {
    background-color: ${({ theme }) => theme.primaryLight};
  }

  ${({ variant }) =>
    variant === 'outline' &&
    css`
      border: 1px solid ${({ theme }) => theme.primary};
      background-color: transparent;
      color: ${({ theme }) => theme.primary};

      &:hover {
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.primaryLight};
        color: ${({ theme }) => theme.primaryLight};
      }
    `}
`;

export const Button = ({ icon, disabled, children, to, ...props }) => (
  <Wrapper disabled={disabled} to={to} as={Boolean(to) && Link} {...props}>
    {icon}
    {children}
  </Wrapper>
);

export default Button;
