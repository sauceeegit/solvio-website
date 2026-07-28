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

const technicalSpecifications = {
  d100: {
    battery: '76.8 Wh; 3.2 V / 24,000 mAh; 12.8 V / 6,000 mAh',
    dimensions: '165 × 90 × 105 mm', weight: 'Approx. 1.5 kg',
    inverter: 'Modified sine wave, 100 W', cycleLife: '≥2,000 cycles',
    carCharging: '12 V / 5 A, 60 W max; or 24 V / 3.75 A, 90 W max',
    solarCharging: '10–28 V / 5 A, 90 W max',
    acOutput: 'Modified sine wave, 100 W', dcOutput: '12 V / 10 A',
    cigarette: 'Not listed', usbA: '5 V / 2.4 A ×1; QC 18 W ×1',
    usbC: 'PD 18 W ×1; PD 100 W ×1', dischargeTemp: '−10°C to 45°C', chargeTemp: '0°C to 45°C',
  },
  d150: {
    battery: '153.6 Wh; 3.2 V / 48,000 mAh',
    dimensions: '204 × 102 × 188 mm', weight: 'Approx. 2 kg',
    inverter: 'Modified sine wave, 150 W', cycleLife: '≥2,000 cycles',
    carCharging: '12 V / 7.5 A, 90 W max', solarCharging: '10–28 V / 3.61 A, 65 W max',
    acOutput: 'Modified sine wave, 150 W', dcOutput: '11.2–14.6 V / 10 A',
    cigarette: '11.2–14.6 V / 10 A', usbA: '5 V / 3 A, 9 V / 2 A or 12 V / 1.5 A; 18 W max ×2',
    usbC: '5 / 9 / 12 / 15 / 20 V, 5 A; 100 W max', dischargeTemp: '−10°C to 45°C', chargeTemp: '0°C to 45°C',
  },
  d300: {
    battery: '288 Wh; 3.2 V / 90,000 mAh',
    dimensions: '212 × 149.8 × 169.2 × 234.7 mm (as printed; supplier confirmation required)', weight: 'Approx. 3.3 kg',
    inverter: 'Pure sine wave, 300 W', cycleLife: '≥2,000 cycles',
    carCharging: '12 V / 7 A, 84 W max', solarCharging: '10–28 V / 7 A, 120 W max',
    acOutput: 'Pure sine wave, 300 W', dcOutput: '12 V / 10 A', cigarette: '12 V / 10 A',
    usbA: '5 V / 3 A, 9 V / 2 A or 12 V / 1.5 A; 18 W max ×2',
    usbC: 'PD 18 W ×1; PD 100 W ×1', dischargeTemp: '−10°C to 45°C', chargeTemp: '0°C to 45°C',
  },
  d600: {
    battery: '512 Wh; 3.2 V / 160,000 mAh; 25.6 V / 20,000 mAh',
    dimensions: '250 × 195 × 180 mm', weight: 'Approx. 7 kg',
    inverter: 'Pure sine wave, 600 W total; 1,200 W peak', cycleLife: '80%+ capacity after 2,000 cycles',
    carCharging: '12 V / 7.5 A, 90 W, about 6 h; or 24 V / 6.25 A, 150 W, about 3.7 h',
    solarCharging: 'MPPT, 10–28 V / 8 A, 150 W max; about 3.7 h',
    acOutput: '2 outlets; pure sine wave; 600 W total / 1,200 W peak; 100–240 V, 50 / 60 Hz',
    dcOutput: 'DC5521 ×2; 13.5 V / 10 A, 12 A max', cigarette: 'Not listed separately',
    usbA: 'QC 18 W ×2', usbC: 'PD 18 W ×1; PD 100 W ×1',
    dischargeTemp: '−10°C to 45°C', chargeTemp: '0°C to 45°C',
  },
  d1200: {
    battery: '1,008 Wh; 3.2 V / 315,000 mAh',
    dimensions: '395 × 190 × 220 mm', weight: 'Approx. 13 kg',
    inverter: 'Pure sine wave, 1,200 W', cycleLife: '80%+ capacity after 2,000 cycles',
    carCharging: '12 V / 9 A, 108 W max; or 24 V / 8 A, 192 W max',
    solarCharging: 'MPPT, 10–60 V / 10 A, 400 W max', acOutput: 'Pure sine wave, 1,200 W',
    dcOutput: '13.5 V / 10 A, 12 A max', cigarette: '13.5 V / 10 A, 12 A max',
    usbA: '5 V / 3 A, 9 V / 2 A or 12 V / 1.5 A; 18 W max ×2',
    usbC: '5 / 9 / 12 / 15 / 20 V, 5 A; 100 W max', dischargeTemp: '−10°C to 45°C', chargeTemp: '0°C to 45°C',
  },
  d2400: {
    battery: '2,160 Wh; 3.2 V / 675,000 mAh; 48 V / 45,000 mAh',
    dimensions: 'Not provided in supplied specification', weight: 'Not provided in supplied specification',
    inverter: 'Pure sine wave, 2,400 W', cycleLife: 'Not provided in supplied specification',
    carCharging: '13 V / 9 A, 117 W max; or 24 V / 8 A, 192 W max',
    solarCharging: 'MPPT, 10–60 V / 15 A, 600 W max',
    acOutput: '2 outlets; pure sine wave; 230 V / 50 Hz, 2,400 W total',
    dcOutput: '13.5 V / 10 A, 12 A max ×2', cigarette: '13.5 V / 10 A, 12 A max ×1',
    usbA: '5 V / 2.4 A ×2; plus QC 18 W ×2', usbC: 'PD 18 W ×2; PD 100 W ×2',
    dischargeTemp: 'Not provided in supplied specification', chargeTemp: 'Not provided in supplied specification',
  },
};

function modelSpecifications(model, technical) {
  return [
    { icon: 'Battery', label: 'Specification model', value: model.specModel },
    { icon: 'Battery', label: 'Battery type', value: 'LiFePO₄' },
    { icon: 'Battery', label: 'Battery capacity', value: technical.battery },
    { icon: 'Maximize2', label: 'Dimensions', value: technical.dimensions },
    { icon: 'Weight', label: 'Weight', value: technical.weight },
    { icon: 'PlugZap', label: 'AC inverter', value: technical.inverter },
    { icon: 'Clock', label: 'Cycle life', value: technical.cycleLife },
    { icon: 'Cable', label: 'Car charging', value: technical.carCharging },
    { icon: 'Sun', label: 'Solar charging', value: technical.solarCharging },
    { icon: 'PlugZap', label: 'AC output', value: technical.acOutput },
    { icon: 'Plug', label: 'DC output', value: technical.dcOutput },
    { icon: 'Plug', label: 'Cigarette-lighter output', value: technical.cigarette },
    { icon: 'Zap', label: 'USB-A output', value: technical.usbA },
    { icon: 'ZapFast', label: 'USB-C output', value: technical.usbC },
    { icon: 'Minimize2', label: 'Discharging temperature', value: technical.dischargeTemp },
    { icon: 'Minimize2', label: 'Charging temperature', value: technical.chargeTemp },
  ];
}

function modelCopy(model) {
  return {
    tagline: `${model.output} output with ${model.capacity} of LiFePO₄ battery storage.`,
    description:
      `The ${model.name} pairs ${model.output} rated AC output with a ${model.capacity} LiFePO₄ battery. Select another model to compare its verified model-specific information.`,
    highlights: [
      `${model.capacity} LiFePO₄ battery capacity`,
      `${model.output} rated AC output`,
      'Model-specific charging, output and temperature specifications',
    ],
  };
}

export const portableProductModels = portableBatteries.map((model) => {
  const copy = modelCopy(model);
  const technical = technicalSpecifications[model.id];
  const shortName = model.name.replace('Solvio ', '');

  return {
    ...model,
    ...copy,
    shortName,
    category: 'Portable Power',
    pageTitle: `${model.name} Portable Power Station — Product Details | Solvio`,
    selectorHeading: 'Choose model',
    metricLabel: 'Battery capacity',
    metricValue: model.capacity,
    selectorLabel: `${model.output} — ${shortName}`,
    featureStrip: [
      { icon: 'Battery', label: model.capacity, sub: 'Battery capacity' },
      { icon: 'PlugZap', label: model.output, sub: 'Rated AC output' },
      { icon: 'Battery', label: 'LiFePO₄', sub: 'Battery chemistry' },
      { icon: 'Zap', label: model.specModel, sub: 'Specification model' },
      { icon: 'Plug', label: 'AC + DC + USB', sub: 'Output options' },
      { icon: 'Sun', label: 'Solar charging', sub: 'Model-specific input' },
    ],
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
    heroImg: model.id === 'd2400' ? { src: asset('/d2400-hero.webp') }
           : model.id === 'd1200' ? { src: asset('/d1200-hero.webp') }
           : model.id === 'd600'  ? { src: asset('/d600-hero.webp') }
           : model.id === 'd300'  ? { src: asset('/d300-hero.webp') }
           : model.id === 'd150'  ? { src: asset('/d150-hero.webp') }
           : model.id === 'd100'  ? { src: asset('/d100-hero.webp'), objectPosition: '50% 20%' }
           : null,
    facts: [
      { value: model.capacity, label: 'Battery capacity' },
      { value: model.output, label: 'Rated AC output' },
      { value: shortName, label: 'Selected model' },
      { value: model.specModel, label: 'Specification model' },
    ],
    sections: [
      {
        eyebrow: 'Choose your model',
        title: 'Portable power sized around your needs',
        body:
          `The Solvio range spans compact day-to-day models through larger options. You are viewing the ${model.name}, rated at ${model.output} with ${model.capacity} of battery capacity.`,
        mediaId: 5,
      },
      {
        eyebrow: 'Model-specific details',
        title: 'The page changes with your selection',
        body:
          `Each model has its own image set and specification record. Choose another model above and the ${shortName} information will be replaced without leaving this page.`,
        mediaId: 6,
      },
    ],
    specifications: modelSpecifications(model, technical),
    specificationIntro:
      `Verified battery, charging, output and operating values supplied for specification model ${model.specModel}.`,
    note:
      model.id === 'd2400'
        ? 'K2400 dimensions, weight, cycle life and operating temperatures were not visible in the supplied specification. Ask Solvio to confirm these values before purchase.'
        : model.id === 'd300'
          ? 'The supplied X300 label prints four dimension values. Confirm the final three-dimensional measurement with Solvio before purchase.'
          : 'Specifications are based on the supplied product labels. Confirm compatibility and the latest technical sheet with Solvio before purchase.',
    faqs: [
      {
        question: `What is the ${shortName}?`,
        answer:
          `The ${model.name} is a ${model.output} portable power station with a ${model.capacity} LiFePO₄ battery. Always check a connected device’s required input and wattage before choosing a model.`,
      },
      {
        question: `Where can I find the full ${shortName} specifications?`,
        answer:
          `The supplied model-specific values are listed on this page. Ask Solvio for the latest approved ${shortName} technical sheet and confirmation of any value marked as not provided.`,
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
