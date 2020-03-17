import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 32,
    paddingRight: 32,
    fontSize: 14,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  subtitle: {
    fontWeight: 300,
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
  },
});

const PDF = ({ values }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>
            ATTESTATION DE DÉPLACEMENT DÉROGATOIRE
          </Text>
          <Text style={styles.subtitle}>
            En application de l’article 1er du décret du 16 mars 2020 portant
            réglementation des déplacements dans le cadre de la lutte contre la
            propagation du virus Covid-19 :
          </Text>
          <Text style={styles.text}>Je soussigné(e)</Text>
          <Text style={styles.text}>Mme / M. {values.name}</Text>
          <Text style={styles.text}>Né(e) le : {values.birthday}</Text>
          <Text style={styles.text}>Demeurant: {values.address}</Text>
          <Text style={styles.text}>
            certifie que mon déplacement est lié au motif suivant autorisé par
            l’article 1er du décret du 16 mars 2020 portant réglementation des
            déplacements dans le cadre de la lutte contre la propagation du
            virus Covid-19 :
          </Text>
        </View>
      </Page>
    </Document>
  );
};
export default PDF;
