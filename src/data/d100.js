import { asset } from '../lib/format';
import { portableBatteries } from './landing';

const mediaTemplate = [
  { id: 1, label: 'Main product view', note: 'Recommended: clean front three-quarter product image' },
  { id: 2, label: 'Front controls', note: 'Recommended: close-up of display and ports' },
  { id: 3, label: 'Side view', note: 'Recommended: AC outlet and ventilation detail' },
  { id: 4, label: 'In use', note: 'Recommended: lifestyle image showing real scale' },
  { id: 5, label: 'Portable design', note: 'Recommended: carrying or travel scene' },
  { id: 6, label: 'Connection detail', note: 'Recommended: connected devices or cable layout' },
  { id: 7, label: 'Detail view', note: 'Recommended: additional product detail' },
];

const ZOOM = 'object-cover';

const d100ExtraImages = {
  3: { src: asset('/d100-img03.webp') },
  4: { src: asset('/d100-img04.webp') },
  5: { src: asset('/d100-img05.webp'), imgClass: ZOOM },
  6: { src: asset('/d100-img06.webp'), imgClass: ZOOM },
};

const d150ExtraImages = {
  3: { src: asset('/d150-img03.webp') },
  4: { src: asset('/d150-img05.webp'), imgClass: ZOOM },
  5: { src: asset('/d150-img04.webp'), imgClass: ZOOM },
};

const d1200ExtraImages = {
  3: { src: asset('/d1200-img03.webp') },
  4: { src: asset('/d1200-img04.webp'), imgClass: ZOOM },
  5: { src: asset('/d1200-img05.webp'), imgClass: ZOOM },
};

const d2400ExtraImages = {
  3: { src: asset('/d2400-img03.webp') },
  4: { src: asset('/d2400-img04.webp'), imgClass: ZOOM },
  5: { src: asset('/d2400-img05.webp'), imgClass: ZOOM },
};

const d600ExtraImages = {
  3: { src: asset('/d600-img03.webp') },
  4: { src: asset('/d600-img04.webp'), imgClass: ZOOM },
  5: { src: asset('/d600-img05.webp'), imgClass: ZOOM },
};

const d300ExtraImages = {
  3: { src: asset('/d300-img03.webp') },
  4: { src: asset('/d300-img04.webp') },
  5: { src: asset('/d300-img05.webp'), imgClass: ZOOM },
};

const d100Specifications = [
  { icon: 'Battery',   label: 'Capacity',   value: '100 Wh' },
  { icon: 'ZapFast',   label: 'USB-C',      value: 'PD 100 W' },
  { icon: 'Zap',       label: 'USB-C',      value: 'PD 18 W' },
  { icon: 'Zap',       label: 'USB-A',      value: 'QC 18 W' },
  { icon: 'Smartphone',label: 'USB-A',      value: '5 V / 2.4 A' },
  { icon: 'Plug',      label: 'DC output',  value: '12 V / 10 A' },
  { icon: 'PlugZap',   label: 'AC output',  value: 'Universal side outlet' },
];

function displayCapacity(capacity) {
  if (capacity === '1200 Wh') return '1.2 kWh (1200 Wh)';
  if (capacity === '2400 Wh') return '2.4 kWh (2400 Wh)';
  return capacity;
}

function modelSpecifications(model) {
  if (model.id === 'd100') return d100Specifications;

  return [
    { icon: 'Battery',    label: 'Capacity',           value: model.capacity },
    { icon: 'Maximize2',  label: 'Dimensions',          value: 'To be added' },
    { icon: 'Weight',     label: 'Weight',              value: 'To be added' },
    { icon: 'Clock',      label: 'Charging time',       value: 'To be added' },
    { icon: 'PlugZap',    label: 'AC output',           value: 'To be added' },
    { icon: 'Cable',      label: 'Connection details',  value: 'To be added' },
  ];
}

function modelCopy(model) {
  if (model.id === 'd100') {
    return {
      tagline: 'Compact power for the devices that keep your day moving.',
      description:
        'A small-format portable power station with a clear front display, carry strap and a practical mix of USB, DC and AC connections.',
      highlights: [
        'Compact format with an integrated carry strap',
        'USB-C, USB-A, DC and AC connections in one unit',
        'Front status display for at-a-glance information',
      ],
    };
  }

  return {
    tagline: `${model.capacity} in Solvio’s portable power range.`,
    description:
      `The ${model.name} is the ${model.capacity} option in Solvio’s portable power-station range. Select another capacity to compare its model-specific information.`,
    highlights: [
      `${model.capacity} selected capacity`,
      'Dedicated image set for this model',
      'Model-specific specifications ready to be completed',
    ],
  };
}

export const portableProductModels = portableBatteries.map((model) => {
  const copy = modelCopy(model);
  const shortName = model.name.replace('Solvio ', '');

  return {
    ...model,
    ...copy,
    shortName,
    category: 'Portable Power',
    pageTitle: `${model.name} Portable Power Station — Product Details | Solvio`,
    selectorHeading: 'Choose capacity',
    metricLabel: 'Capacity',
    metricValue: model.capacity,
    selectorLabel: `${displayCapacity(model.capacity)} — ${shortName}`,
    media: mediaTemplate.map((item) => {
      const extra = item.id === 1 ? null
        : item.id === 2 ? null
        : model.id === 'd100'  ? (d100ExtraImages[item.id]  ?? null)
        : model.id === 'd150'  ? (d150ExtraImages[item.id]  ?? null)
        : model.id === 'd300'  ? (d300ExtraImages[item.id]  ?? null)
        : model.id === 'd600'  ? (d600ExtraImages[item.id]  ?? null)
        : model.id === 'd1200' ? (d1200ExtraImages[item.id] ?? null)
        : model.id === 'd2400' ? (d2400ExtraImages[item.id] ?? null)
        : null;
      return {
        ...item,
        label: `${shortName} — ${item.label}`,
        alt: `${model.name} ${item.label.toLowerCase()}`,
        src: item.id === 1 ? (model.img ?? null)
           : item.id === 2 ? (model.sideImg ?? null)
           : extra?.src ?? null,
        imgClass: extra?.imgClass ?? null,
      };
    }),
    heroImg: model.id === 'd2400' ? asset('/d2400-hero.webp')
           : model.id === 'd1200' ? asset('/d1200-hero.webp')
           : model.id === 'd600'  ? asset('/d600-hero.webp')
           : null,
    facts: [
      { value: model.capacity, label: 'Selected capacity' },
      { value: shortName, label: 'Selected model' },
      { value: '01–06', label: 'Model-specific images' },
      { value: 'On request', label: 'Approved technical sheet' },
    ],
    sections: [
      {
        eyebrow: 'Choose your capacity',
        title: 'Portable power sized around your needs',
        body:
          `The Solvio range spans compact day-to-day models through larger-capacity options. You are currently viewing the ${model.name} with ${model.capacity} of capacity.`,
        mediaId: 5,
      },
      {
        eyebrow: 'Model-specific details',
        title: 'The page changes with your selection',
        body:
          `Each capacity has its own six-image set and specification record. Choose another model above and the ${shortName} information will be replaced without leaving this page.`,
        mediaId: 6,
      },
    ],
    specifications: modelSpecifications(model),
    specificationIntro:
      model.id === 'd100'
        ? 'These are the capacity and connection labels visible on the current D100 media. Ask Solvio for the latest approved specification sheet if you need additional technical values.'
        : `The confirmed capacity for the ${shortName} is shown below. The remaining approved technical values can be added to this model’s record when available.`,
    note:
      `Need dimensions, weight, charging time or the confirmed AC output rating? Ask Solvio for the latest ${shortName} technical sheet before choosing a configuration.`,
    faqs: [
      {
        question: `What is the ${shortName}?`,
        answer:
          `The ${model.name} is the ${model.capacity} model in Solvio’s portable power-station range. Always check a connected device’s required input and wattage before choosing a model.`,
      },
      {
        question: `Where can I find the full ${shortName} specifications?`,
        answer:
          `Ask Solvio for the latest approved ${shortName} technical sheet. Dimensions and additional technical values will also be added to this page when confirmed.`,
      },
      {
        question: `Can I pair the ${shortName} with a portable solar panel?`,
        answer:
          `Ask Solvio to confirm the correct panel, cable and input limits for the ${shortName} before connecting a solar panel.`,
      },
    ],
  };
});

export const defaultPortableProduct = portableProductModels[0];
