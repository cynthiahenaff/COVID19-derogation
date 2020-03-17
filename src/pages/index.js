import React, { useReducer } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import styled, { css } from 'styled-components';
import Button from 'components/Button';
import PDF from 'components/PDF';
import { Container, media, Buttons } from 'ui';
import { Input } from 'ui/forms';
import { HotKeys } from 'react-hotkeys';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  margin: 0;
  font-size: calc(1.75rem + (2 - 1) * ((100vw - 20em) / (50 - 20)));
  line-height: 1.1;
  text-align: center;
  font-family: Monserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;

  ${media.desktop`
    font-size: 3.5rem;
  `}
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  position: relative;
  ${({ step }) =>
    step &&
    css`

&:before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -60px;
  content: '${({ step }) => step} →	';
}
`}
`;

const getLabelByStep = step => {
  switch (step) {
    case 1:
      return 'Quel est votre nom ?';
    case 2:
      return 'Quelle est votre date de naissance ?';
    case 3:
      return 'Quelle est votre adresse ?';
    case 4:
      return 'Pour quelle raison souhaitez vous sortir ?';
    default:
      return '';
  }
};

const getInputNameByStep = step => {
  switch (step) {
    case 1:
      return 'name';
    case 2:
      return 'birthday';
    case 3:
      return 'address';
    case 4:
      return 'reason';
    default:
      return '';
  }
};

const initialState = {
  step: 0,
  values: {
    name: '',
    birthday: '',
    address: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'VALIDATE_STEP':
      return {
        ...state,
        step: state.step + 1,
      };
    case 'PREVIOUS_STEP':
      return {
        ...state,
        step: state.step === 0 ? state.step : state.step - 1,
      };
    default:
      return state;
  }
};

const IndexPage = () => {
  const [{ step, values }, dispatch] = useReducer(reducer, initialState);

  const keyMap = {
    UP: 'up',
    DOWN: ['down', 'enter'],
  };

  const handlers = {
    DOWN: e => {
      e.preventDefault();
      dispatch({ type: 'VALIDATE_STEP' });
    },
    UP: () => dispatch({ type: 'PREVIOUS_STEP' }),
  };

  return (
    <Layout>
      <SEO title="Attestation de déplacement dérogatoire" />
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <Container>
          {step === 0 && (
            <Wrapper>
              <Title>Attestation de déplacement dérogatoire</Title>
              <Subtitle>
                Le générateur d'attestation de déplacement dérogatoire
              </Subtitle>
              <Button onClick={() => dispatch({ type: 'VALIDATE_STEP' })}>
                Commencer
              </Button>
            </Wrapper>
          )}

          {step !== 0 && step !== 4 && (
            <Wrapper style={{ alignItems: 'flex-start' }}>
              <div>
                <Label step={step}>{getLabelByStep(step)} </Label>
                <Input
                  value={values[getInputNameByStep(step)]}
                  onChange={e =>
                    dispatch({
                      type: 'UPDATE_VALUE',
                      payload: {
                        name: getInputNameByStep(step),
                        value: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <Buttons>
                <Button onClick={() => dispatch({ type: 'VALIDATE_STEP' })}>
                  Suivant
                </Button>
              </Buttons>
            </Wrapper>
          )}
          {step === 4 && (
            <Wrapper>
              <Label>Votre document est prêt a être téléchargé</Label>
              <Button
                style={{ marginTop: 32 }}
                as={PDFDownloadLink}
                document={<PDF values={values} />}
                fileName="attestation-de-deplacement-derogatoire.pdf"
              >
                Générer mon attestation
              </Button>
            </Wrapper>
          )}
        </Container>
      </HotKeys>
    </Layout>
  );
};

export default IndexPage;
