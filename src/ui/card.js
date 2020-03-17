import styled from 'styled-components';

export const CardTitle = styled.h2`
  font-size: 2rem;
  line-height: 1.5;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};
  margin: 0;

  ${({ hasBottomMargin, theme }) =>
    hasBottomMargin &&
    `
    margin-bottom: ${theme.spacing(1.5)}
    `}
`;

export const Card = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  min-height: 200px;
  padding: ${({ theme }) => theme.spacing(2)};

  ${({ height }) =>
    height === 'auto' &&
    `
      min-height: 0
    `}

  ${({ lightPadding, theme }) =>
    lightPadding &&
    `
      padding: ${theme.spacing()}
    `}
`;

export const CardSubtitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};

  ${({ bottomMarginSize, theme }) =>
    bottomMarginSize === 'small' &&
    `
      margin-bottom: ${theme.spacing(0.5)};
    `}
`;

export const CardThumbnail = styled.div`
  background-size: cover;
  background-position: center;
  center;
  width: 300px;
  padding-top: 70.66%;
  background-color: ${({ theme }) => theme.separator};
  border-radius: 8px;
`;

export const MainInfoItem = styled.div`
  svg {
    color: ${({ theme }) => theme.primary};
    margin-right: ${({ theme }) => theme.spacing()};
    font-size: 1.25rem;
  }

  color: ${({ theme }) => theme.text};

  + * {
    margin-top: ${({ theme }) => theme.spacing()};
  }
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  + * {
    margin-top: ${({ theme }) => theme.spacing(0.5)};
  }
`;

export const CardLabel = styled.div`
  color: ${({ theme }) => theme.textLight};
  margin: 0;

  ${({ hasMarginTop, theme }) =>
    hasMarginTop &&
    `
    margin-top: ${theme.spacing()}
    `}
`;
