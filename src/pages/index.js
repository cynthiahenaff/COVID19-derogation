import React, { useReducer } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import styled, { css } from 'styled-components';
import Button from 'components/Button';
import PDF from 'components/PDF';
import { Container, media, Buttons } from 'ui';
import { Input, RadioButton } from 'ui/forms';
import { HotKeys } from 'react-hotkeys';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 40px);
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
  text-align: center;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing()};
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
      return 'Quel est votre nom complet ?';
    case 2:
      return 'Quelle est votre date de naissance ?';
    case 3:
      return 'Quelle est votre adresse postale ?';
    case 4:
      return 'Dans quelle ville vous situez-vous actuellement ?';
    case 5:
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
      return 'city';
    case 5:
      return 'reason';
    default:
      return '';
  }
};
const getPlaceHolderByStep = step => {
  switch (step) {
    case 1:
      return 'Henri Dubois';
    case 2:
      return '23/05/1990';
    case 3:
      return '3 place Augustin Laurent 59000 Lille';
    case 4:
      return 'Lille';
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
    city: '',
    reason: 0,
    date: new Intl.DateTimeFormat('fr-FR').format(new Date()),
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
        step: state.step === 6 ? state.step : state.step + 1,
      };
    case 'PREVIOUS_STEP':
      return {
        ...state,
        step: state.step === 0 ? state.step : state.step - 1,
      };
    case 'RESET':
      return initialState;
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
                Dans le cadre du confinement suite à l'épidémie de COVID-19, une
                attestation de déplacement dérogatoire est obligatoire en cas de
                sortie.
                <br />
                <br />
                Il est rappelé que toute sortie ne doit être réalisée qu'en cas
                de stricte nécessité. Nous comptons sur votre civisme.
              </Subtitle>
              <Button onClick={() => dispatch({ type: 'VALIDATE_STEP' })}>
                Commencer
              </Button>
            </Wrapper>
          )}

          {step > 0 && step < 5 && (
            <Wrapper
              style={{ alignItems: 'flex-start' }}
              as="form"
              onSubmit={e => {
                e.preventDefault();
                dispatch({ type: 'VALIDATE_STEP' });
              }}
            >
              <div>
                <Label step={step}>{getLabelByStep(step)} </Label>
                <Input
                  value={values[getInputNameByStep(step)]}
                  placeholder={getPlaceHolderByStep(step)}
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
                <Button type="submit">Suivant</Button>
              </Buttons>
            </Wrapper>
          )}
          {step === 5 && (
            <Wrapper style={{ alignItems: 'flex-start' }}>
              <div>
                <Label step={step}>{getLabelByStep(step)} </Label>
                <div>
                  <RadioButton
                    label="Pour partir travailler ou rentrer du travail"
                    name="work"
                    value={values[getInputNameByStep(step)]}
                    id={0}
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_VALUE',
                        payload: {
                          name: getInputNameByStep(step),
                          value: 0,
                        },
                      })
                    }
                  />
                  <RadioButton
                    label="Pour faire des courses dans un magasin d'alimentation"
                    name="courses"
                    value={values[getInputNameByStep(step)]}
                    id={1}
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_VALUE',
                        payload: {
                          name: getInputNameByStep(step),
                          value: 1,
                        },
                      })
                    }
                  />
                  <RadioButton
                    label="Pour aller chez le médecin ou à la pharmacie"
                    name="health"
                    value={values[getInputNameByStep(step)]}
                    id={2}
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_VALUE',
                        payload: {
                          name: getInputNameByStep(step),
                          value: 2,
                        },
                      })
                    }
                  />
                  <RadioButton
                    label="Pour aller aider un de mes proches ou aller à la garde d'enfant"
                    name="family"
                    value={values[getInputNameByStep(step)]}
                    id={3}
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_VALUE',
                        payload: {
                          name: getInputNameByStep(step),
                          value: 3,
                        },
                      })
                    }
                  />

                  <RadioButton
                    label="Pour aller courir seule ou sortir mon chien"
                    name="run"
                    value={values[getInputNameByStep(step)]}
                    id={4}
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_VALUE',
                        payload: {
                          name: getInputNameByStep(step),
                          value: 4,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <Buttons>
                <Button onClick={() => dispatch({ type: 'VALIDATE_STEP' })}>
                  Suivant
                </Button>
              </Buttons>
            </Wrapper>
          )}
          {step === 6 && (
            <Wrapper>
              <Label>Votre document est prêt a être téléchargé</Label>
              <Buttons>
                <Button
                  style={{ marginTop: 32 }}
                  as={PDFDownloadLink}
                  document={<PDF values={values} />}
                  fileName="attestation-de-deplacement-derogatoire.pdf"
                >
                  Générer mon attestation
                </Button>
                <Button
                  onClick={() => dispatch({ type: 'RESET' })}
                  variant="outline"
                >
                  Recommencer
                </Button>
              </Buttons>
            </Wrapper>
          )}
        </Container>
      </HotKeys>
    </Layout>
  );
};

export default IndexPage;
