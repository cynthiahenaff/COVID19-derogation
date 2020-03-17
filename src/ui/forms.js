import React from 'react';
import styled from 'styled-components';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

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

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: ${({ theme }) => theme.spacing(0.5)};

  svg {
    margin-right: ${({ theme }) => theme.spacing(0.5)};
    color: ${({ theme }) => theme.textLight};
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
