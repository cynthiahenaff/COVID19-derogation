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

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 32,
    paddingRight: 32,
    fontSize: 12,
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
    fontSize: 12,
    fontFamily: 'Open Sans',
  },
  text: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Open Sans',
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8,
    marginTop: 12,
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

const PDF = ({ values, signature }) => {
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
          certifie que mon déplacement est lié au motif suivant autorisé par
          l’article 1er du décret du 16 mars 2020 portant réglementation des
          déplacements dans le cadre de la lutte contre la propagation du virus
          Covid-19 :
        </Text>
        <View style={{ flexDirection: 'column', flexGrow: 1 }}>
          <View style={styles.item}>
            <Image
              src={values.reason === 0 ? checkbox : checkboxOutline}
              alt=""
              style={styles.icon}
            />
            <Text style={styles.text}>
              déplacements entre le domicile et le lieu d’exercice de l’activité
              professionnelle, lorsqu’ils sont indispensables à l’exercice
              d’activités ne pouvant être organisées sous forme de télétravail
              (sur justificatif permanent) ou déplacements professionnels ne
              pouvant être différés;
            </Text>
          </View>
          <View style={styles.item}>
            <Image
              src={values.reason === 1 ? checkbox : checkboxOutline}
              alt=""
              style={styles.icon}
            />
            <Text style={styles.text}>
              déplacements pour effectuer des achats de première nécessité dans
              des établissements autorisés (liste sur gouvernement.fr);
            </Text>
          </View>
          <View style={styles.item}>
            <Image
              src={values.reason === 2 ? checkbox : checkboxOutline}
              alt=""
              style={styles.icon}
            />
            <Text style={styles.text}>déplacements pour motif de santé;</Text>
          </View>

          <View style={styles.item}>
            <Image
              src={values.reason === 3 ? checkbox : checkboxOutline}
              alt=""
              style={styles.icon}
            />
            <Text style={styles.text}>
              déplacements pour motif familial impérieux, pour l’assistance aux
              personnes vulnérables ou la garde d’enfants;
            </Text>
          </View>

          <View style={styles.item}>
            <Image
              src={values.reason === 4 ? checkbox : checkboxOutline}
              style={styles.icon}
            />
            <Text style={styles.text}>
              déplacements brefs, à proximité du domicile, liés à l’activité
              physique individuelle des personnes, à l’exclusion de toute
              pratique sportive collective, et aux besoins des animaux de
              compagnie.
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text
              style={styles.text}
            >{`Fait à ${values.city}, le ${values.date}`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 16,
            }}
          >
            <Image src={signature} style={{ width: 200 }}></Image>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PDF;
