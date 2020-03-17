import styled from 'styled-components';

export const Input = styled.input`
  padding: 0 0 ${({ theme }) => theme.spacing(0.5)};
  border: 0;
  transition: border-color 100ms ease;
  transition: box-shadow 0.2s ease 0s;
  font-size: 1.875rem;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.textLight};

  &:not(:focus) {
    box-shadow: rgba(0, 58, 81, 0.3) 0px 1px;
  }

  ::placeholder {
    color: ${({ theme }) => theme.textLight};
  }
`;
