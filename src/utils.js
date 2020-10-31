import QRCode from 'qrcode';

export const STEPS = {
  1: {
    label: 'Quel est votre nom complet ?',
    name: 'name',
    placeholder: 'Henri Dubois',
  },
  2: {
    label: 'Quelle est votre date de naissance ?',
    name: 'birthday',
    placeholder: '23/05/1990',
  },
  3: {
    label: 'Quelle est votre adresse postale ?',
    name: 'address',
    placeholder: '3 place Augustin Laurent 59000 Lille',
  },
  4: {
    label: 'Dans quelle ville vous situez-vous actuellement ?',
    name: 'city',
    placeholder: 'Lille',
  },
  5: {
    label: 'Pour quelle raison souhaitez vous sortir ?',
    name: 'reason',
  },
  6: {
    label: 'Une signature pour finir',
    name: 'signature',
  },
};

const generateFirstAndLastNameFromFullName = fullName => ({
  firstName: (fullName || '').split(' ')[0],
  lastName: (fullName || '')
    .split(' ')
    .slice(1)
    .join(' '),
});

export const REASONS = [
  {
    label: 'Pour partir travailler ou rentrer du travail',
    documentLabel:
      'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement d’enseignement ou de formation, déplacements professionnels ne pouvant être différés, déplacements pour un concours ou un examen.',
    qrCodeValue: 'travail',
  },
  {
    label: "Pour faire des courses dans un magasin d'alimentation",
    documentLabel:
      'Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle, des achats de première nécessité 3 dans des établissements dont les activités demeurent autorisées, le retrait de commande et les livraisons à domicile.',
    qrCodeValue: 'achats',
  },
  {
    label: 'Pour aller chez le médecin ou à la pharmacie',
    documentLabel:
      'Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments.',
    qrCodeValue: 'sante',
  },
  {
    label: "Pour aller aider un de mes proches ou aller à la garde d'enfant",
    documentLabel:
      'Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables et précaires ou la garde d’enfants',
    qrCodeValue: 'famille',
  },
  {
    label: 'Pour aller courir seul(e) ou sortir mon chien',
    documentLabel:
      'Déplacements brefs, dans la limite d’une heure quotidienne et dans un rayon maximal d’un kilomètre autour du domicile, liés soit à l’activité physique individuelle des personnes, à l’exclusion de toute pratique sportive collective et de toute proximité avec d’autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie',
    qrCodeValue: 'sport_animaux',
  },
  {
    label: 'Pour déposer ou aller cherche mon enfant à l’école',
    documentLabel:
      'Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires',
    qrCodeValue: 'enfants',
  },
];

export const generateQrCodeContent = values => {
  const { firstName, lastName } = generateFirstAndLastNameFromFullName(
    values?.name,
  );

  return `Cree le: ${values?.date} a ${values?.time};
 Nom: ${lastName};
 Prenom: ${firstName};
 Naissance: ${values?.birthday} a ${values?.city};
 Adresse: ${values?.address};
 Sortie: ${values?.date} a ${values?.time};
 Motifs: ${REASONS[values?.reason]?.qrCodeValue}`;
};

export const getQrCodeDataUrl = content =>
  QRCode.toDataURL(content, {
    errorCorrectionLevel: 'M',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
  });

export const normalizeValue = ({ name, value, prevValue }) => {
  if (name === 'birthday') {
    const formattedValue = value.replace(/[^0-9/]+/g, '').replace(/\//g, '');
    const formattedPrevValue = (prevValue || '')
      .replace(/[^0-9/]+/g, '')
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
