import React from 'react';
import styled from 'styled-components';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { media } from 'ui';

export const Input = styled.input`
  padding: 0 0 ${({ theme }) => theme.spacing(0.5)};
  border: 0;
  transition: border-color 100ms ease;
  transition: box-shadow 0.2s ease 0s;
  font-size: 1.5rem;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.textLight};

  &:not(:focus) {
    box-shadow: rgba(0, 58, 81, 0.3) 0px 1px;
  }

  ::placeholder {
    color: ${({ theme }) => theme.textLight};
  }

  ${media.tablet`
  font-size: 1.875rem;
  `}
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  font-weight: 300;
  margin-top: ${({ theme }) => theme.spacing(0.5)};

  svg {
    margin-top: 4px;
  }

  ${media.tablet`
    font-size: 1.5rem;
  `}

  svg {
    margin-right: ${({ theme }) => theme.spacing(0.5)};
    color: ${({ theme }) => theme.textLight};
    min-width: 28px;
  }
`;

export const RadioButton = ({ name, id, onChange, label, value }) => {
  return (
    <RadioLabel isActive={Number(id) === Number(value)}>
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={Number(id) === Number(value)}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      {Number(id) === Number(value) ? (
        <MdRadioButtonChecked size={28} />
      ) : (
        <MdRadioButtonUnchecked size={28} />
      )}
      {label}
    </RadioLabel>
  );
};
