import { asset } from '../lib/format';
import { portablePanels } from './landing';

const panelHeroImg = { src: asset('/panel-hero.webp') };
const panelHeroImg200 = { src: asset('/panel-hero-200.webp') };
const panelLongLastingImg = { src: asset('/panel-long-lasting.webp') };

const p200ExtraImages = {
  2: asset('/p200-img02.webp'),
  3: asset('/p200-img03.webp'),
  4: asset('/p200-img04.webp'),
  5: asset('/p200-img05.webp'),
};

const p60ExtraImages = {
  2: asset('/p60-sideview.webp'),
  3: asset('/p60-backview.webp'),
  4: asset('/p60-img02.webp'),
  5: asset('/p60-img03.webp'),
  6: asset('/p60-img01.webp'),
};

const panelMediaTemplate = [
  { id: 1, label: 'Main panel view', note: 'Recommended: clean unfolded front view' },
  { id: 2, label: 'Folded view', note: 'Recommended: folded panel showing carrying format' },
  { id: 3, label: 'Connection detail', note: 'Recommended: cable and connector close-up' },
  { id: 4, label: 'In use', note: 'Recommended: outdoor setup showing real scale' },
  { id: 5, label: 'Portable design', note: 'Recommended: carrying or storage scene' },
  { id: 6, label: 'Power setup', note: 'Recommended: panel connected to a compatible power station' },
];

function panelSpecifications(panel) {
  return [
    { icon: 'Zap',        label: 'Rated output',       value: panel.watt },
    { icon: 'Maximize2',  label: 'Unfolded dimensions', value: 'To be added' },
    { icon: 'Minimize2',  label: 'Folded dimensions',   value: 'To be added' },
    { icon: 'Weight',     label: 'Weight',              value: 'To be added' },
    { icon: 'Cable',      label: 'Connector',           value: 'To be added' },
    { icon: 'Shield',     label: 'Protection class',    value: 'To be added' },
  ];
}

export const portablePanelModels = portablePanels.map((panel) => {
  const shortName = `${panel.name} Panel`;
  const productName = `Solvio ${panel.name} Portable Panel`;

  return {
    ...panel,
    name: productName,
    shortName,
    category: 'Portable Solar',
    pageTitle: `${productName} — Product Details | Solvio`,
    selectorHeading: 'Choose panel output',
    metricLabel: 'Rated output',
    metricValue: panel.watt,
    selectorLabel: `${panel.watt} — ${shortName}`,
    tagline: `${panel.watt} foldable solar panel for portable power setups.`,
    description:
      `The ${productName} is the ${panel.watt} option in Solvio’s portable panel range. Select another output to compare its model-specific information.`,
    highlights: [
      `${panel.watt} selected panel output`,
      'Dedicated image set for this panel',
      'Model-specific specifications ready to be completed',
    ],
    media: panelMediaTemplate.map((item) => {
      const isP6060120 = panel.id === 'p60' || panel.id === 'p120';
      const isP200400 = panel.id === 'p200' || panel.id === 'p400';
      const needsCover = (isP6060120 && item.id >= 4) || (isP200400 && item.id >= 4 && item.id <= 5);
      return {
        ...item,
        label: `${shortName} — ${item.label}`,
        alt: `${productName} ${item.label.toLowerCase()}`,
        src: item.id === 1 ? (panel.img ?? null)
           : isP6060120 ? (p60ExtraImages[item.id] ?? null)
           : isP200400 ? (p200ExtraImages[item.id] ?? null)
           : null,
        imgClass: needsCover ? 'object-cover' : undefined,
      };
    }),
    facts: [
      { value: panel.watt, label: 'Selected output' },
      { value: panel.name, label: 'Selected panel' },
      { value: '01–06', label: 'Model-specific images' },
      { value: 'On request', label: 'Approved technical sheet' },
    ],
    sections: [
      {
        eyebrow: 'Choose your panel',
        title: 'Portable solar sized around your setup',
        body:
          `The Solvio portable panel range covers compact charging through larger portable solar setups. You are currently viewing the ${productName} with ${panel.watt} rated output.`,
        mediaId: 5,
      },
      {
        eyebrow: 'Model-specific details',
        title: 'The page changes with your selection',
        body:
          `Each panel output has its own six-image set and specification record. Choose another panel above and the ${shortName} information will be replaced without leaving this page.`,
        mediaId: 6,
      },
    ],
    heroImg: (panel.id === 'p60' || panel.id === 'p120') ? panelHeroImg
           : (panel.id === 'p200' || panel.id === 'p400') ? panelHeroImg200
           : null,
    afterSpecsImg: panelLongLastingImg,
    specifications: panelSpecifications(panel),
    specificationIntro:
      `The listed output for the ${shortName} is shown below. Dimensions, weight, connector and protection details can be added to this panel’s record when confirmed.`,
    note:
      `Need dimensions, weight, connector details or compatibility guidance? Ask Solvio for the latest ${shortName} technical sheet before choosing a setup.`,
    faqs: [
      {
        question: `What is the ${shortName}?`,
        answer:
          `The ${productName} is the ${panel.watt} model in Solvio’s foldable portable-panel range. Its suitability depends on the connected device or power station.`,
      },
      {
        question: `Where can I find the full ${shortName} specifications?`,
        answer:
          `Ask Solvio for the latest approved ${shortName} technical sheet. Dimensions and additional technical values will also be added to this page when confirmed.`,
      },
      {
        question: `Which power station works with the ${shortName}?`,
        answer:
          `Ask Solvio to confirm the correct panel, cable, connector and input limits for your power station before connecting the panel.`,
      },
    ],
  };
});

export const defaultPortablePanel = portablePanelModels[0];
