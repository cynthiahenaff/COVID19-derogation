import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import checkbox from 'images/checkbox.jpg';
import checkboxOutline from 'images/checkbox-outline.jpg';

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 32,
    paddingRight: 32,
    fontSize: 14,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontWeight: 300,
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 14,
    fontWeight: 'light',
  },
  text: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: 'light',
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 16,
    marginTop: 8,
  },
  item: {
    marginTop: 16,
    flexDirection: 'row',
  },
});

const PDF = ({ values }) => {
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
        <Text style={styles.text}>Né(e) le : {values.birthday}</Text>
        <Text style={styles.text}>Demeurant : {values.address}</Text>
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
            <Text style={styles.text}>{values.name}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PDF;
