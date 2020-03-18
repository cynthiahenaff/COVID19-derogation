import React, { useState, useReducer, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import styled, { css } from 'styled-components';
import Button from 'components/Button';
import PDF from 'components/PDF';
import { Container, media, Buttons } from 'ui';
import { Input, RadioButton } from 'ui/forms';
import { HotKeys } from 'react-hotkeys';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RawSignatureCanvas from 'react-signature-canvas';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
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

const SubLabel = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
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

const Canvas = styled.div`
  border: 1px solid rgba(0, 58, 81, 0.3);

  canvas {
    max-width: 100%;
  }
`;

const SignatureCanvas = styled(RawSignatureCanvas)`
  canvas {
    width: 500px;
    height: 200px;
    max-width: 100%;
  }
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
    case 6:
      return 'Une signature pour finir';
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
    case 6:
      return 'signature';
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

const normalizeValue = ({ name, value, prevValue }) => {
  if (name === 'birthday') {
    const formattedValue = value.replace(/[^0-9\/]+/g, '').replace(/\//g, '');
    const formattedPrevValue = (prevValue || '')
      .replace(/[^0-9\/]+/g, '')
      .replace(/\//g, '');

    const shouldAddFirstSlash =
      formattedValue.length > 2 ||
      (formattedValue.length > formattedPrevValue.length &&
        formattedValue.length > 1);

    const shouldAddSecondSlash =
      formattedValue.length > 4 ||
      (formattedValue.length > formattedPrevValue.length &&
        formattedValue.length > 3);

    return (
      formattedValue.slice(0, 2) +
      (shouldAddFirstSlash ? '/' : '') +
      formattedValue.slice(2, 4) +
      (shouldAddSecondSlash ? '/' : '') +
      formattedValue.slice(4, 8)
    );
  }

  return value;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: normalizeValue(action.payload),
        },
      };
    case 'VALIDATE_STEP':
      return {
        ...state,
        step: state.step === 7 ? state.step : state.step + 1,
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
  const [signature, setSignature] = useState();
  const [{ step, values }, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();
  const signatureRef = useRef();

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

  const handleGetSignature = () => {
    if (!signatureRef.current) {
      return;
    }

    setSignature(signatureRef.current.toDataURL());
  };

  const handleResetSignature = () => {
    setSignature(null);

    if (!signatureRef.current) {
      return;
    }

    signatureRef.current.clear();
  };

  const handleReset = () => {
    handleResetSignature();
    dispatch({ type: 'RESET' });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  return (
    <Layout>
      <SEO title="Attestation de déplacement dérogatoire" />
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <Container>
          {step === 0 && (
            <Wrapper>
              <Title>Attestation de déplacement dérogatoire</Title>
              <Subtitle>
                Dans le cadre du confinement faisant suite à l'épidémie de
                COVID-19, une attestation de déplacement dérogatoire est
                obligatoire en cas de sortie.
                <br />
                <br />
                Il est rappelé que toute sortie ne doit être réalisée qu'en cas
                de stricte nécessité. Nous comptons sur votre civisme.
                <br />
                <br />
                Attention, seules les versions imprimées seront acceptées par
                les forces de l'ordre.
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
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') {
                      dispatch({ type: 'VALIDATE_STEP' });
                    }

                    if (e.key === 'ArrowUp') {
                      dispatch({ type: 'PREVIOUS_STEP' });
                    }
                  }}
                  ref={inputRef}
                  value={values[getInputNameByStep(step)]}
                  placeholder={getPlaceHolderByStep(step)}
                  onChange={e =>
                    dispatch({
                      type: 'UPDATE_VALUE',
                      payload: {
                        name: getInputNameByStep(step),
                        value: e.target.value,
                        prevValue: values[getInputNameByStep(step)],
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
                    label="Pour aller courir seul(e) ou sortir mon chien"
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
            <Wrapper style={{ alignItems: 'flex-start' }}>
              <Label step={step}>{getLabelByStep(step)}</Label>
              <Canvas>
                <SignatureCanvas
                  ref={signatureRef}
                  penColor="black"
                  onEnd={handleGetSignature}
                  canvasProps={{ width: 500, height: 200, maxWidth: '100%' }}
                />
              </Canvas>
              <button onClick={handleResetSignature}>Effacer</button>
              <Buttons>
                <Button onClick={() => dispatch({ type: 'VALIDATE_STEP' })}>
                  Suivant
                </Button>
              </Buttons>
            </Wrapper>
          )}

          {step === 7 && (
            <Wrapper>
              <Label>Votre document est prêt a être téléchargé</Label>
              <SubLabel>
                N’oubliez pas d’imprimer votre attestation, seules les
                attestations imprimées seront acceptées par les forces de
                l’ordre.
              </SubLabel>
              <Buttons>
                <Button
                  style={{ marginTop: 32 }}
                  as={PDFDownloadLink}
                  document={<PDF values={values} signature={signature} />}
                  fileName="attestation-de-deplacement-derogatoire.pdf"
                >
                  Générer mon attestation
                </Button>
                <Button onClick={handleReset} variant="outline">
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
