import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import checkbox from 'images/checkbox.jpg';
import checkboxOutline from 'images/checkbox-outline.jpg';
import { REASONS } from 'utils';

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 32,
    paddingRight: 32,
    fontSize: 10,
  },
  title: {
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Open Sans',
  },
  subtitle: {
    fontWeight: 300,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 10,
    fontFamily: 'Open Sans',
  },
  text: {
    fontSize: 10,
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Open Sans',
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
  },
});

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src:
        'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
    },
    {
      src:
        'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
      fontWeight: 600,
    },
  ],
});

const PDF = ({ values, signature, qrCode }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Attestation de déplacement dérogatoire</Text>
        <Text style={styles.subtitle}>
          En application de l’article 1er du décret du 16 mars 2020 portant
          réglementation des déplacements dans le cadre de la lutte contre la
          propagation du virus Covid-19 :
        </Text>
        <Text style={styles.text}>Je soussigné(e)</Text>
        <Text style={styles.text}>Mme / M. {values.name}</Text>
        <Text style={styles.text}>Né(e) le {values.birthday}</Text>
        <Text style={styles.text}>Demeurant au {values.address}</Text>
        <Text style={styles.text}>
          certifie que mon déplacement est lié au motif suivant (cocher la case)
          autorisé par le décret n°2020-1310 du 29 octobre 2020 prescrivant les
          mesures générales nécessaires pour faire face à l□'épidémie de Covid19
          dans le cadre de l'état d'urgence sanitaire :
        </Text>
        <View style={{ flexDirection: 'column', flexGrow: 1 }}>
          {REASONS.map(({ qrCodeValue, documentLabel }, index) => (
            <View key={qrCodeValue} style={styles.item}>
              <Image
                src={values.reason === index ? checkbox : checkboxOutline}
                alt=""
                style={styles.icon}
              />
              <Text style={styles.text}>{documentLabel}</Text>
            </View>
          ))}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={styles.text}
                >{`Fait à ${values.city}, le ${values.date}`}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 16,
                }}
              >
                <Image src={signature} style={{ width: 200 }} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 16,
              }}
            >
              <Image src={qrCode} style={{ width: 120 }} />
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <Image src={qrCode} style={{ width: 250 }} />
      </Page>
    </Document>
  );
};
export default PDF;
