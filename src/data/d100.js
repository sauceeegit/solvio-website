export const d100Product = {
  id: 'd100',
  name: 'Solvio D100',
  category: 'Portable Power',
  capacity: '100 Wh',
  price: 6990,
  tagline: 'Compact power for the devices that keep your day moving.',
  description:
    'A small-format portable power station with a clear front display, carry strap and a practical mix of USB, DC and AC connections.',
  highlights: [
    'Compact format with an integrated carry strap',
    'USB-C, USB-A, DC and AC connections in one unit',
    'Front status display for at-a-glance information',
  ],
  media: [
    { id: 1, label: 'Main product view', note: 'Recommended: clean front three-quarter product image' },
    { id: 2, label: 'Front controls', note: 'Recommended: close-up of display and ports' },
    { id: 3, label: 'Side view', note: 'Recommended: AC outlet and ventilation detail' },
    { id: 4, label: 'In use', note: 'Recommended: lifestyle image showing real scale' },
    { id: 5, label: 'Portable design', note: 'Recommended: carrying or travel scene' },
    { id: 6, label: 'Connection detail', note: 'Recommended: connected devices or cable layout' },
  ],
  facts: [
    { value: '100 Wh', label: 'Portable capacity' },
    { value: 'PD 100 W', label: 'USB-C port label' },
    { value: '6 formats', label: 'Visible output connections' },
    { value: 'At a glance', label: 'Front status display' },
  ],
  sections: [
    {
      eyebrow: 'Small by design',
      title: 'Power that is easy to take with you',
      body:
        'The D100 keeps its controls, display and everyday connections together in a compact body. The integrated strap makes it simple to move between your desk, car, campsite or market setup.',
      mediaId: 5,
    },
    {
      eyebrow: 'Ready to connect',
      title: 'One front panel for your essential devices',
      body:
        'Clearly labelled USB-C, USB-A and DC connections make the D100 straightforward to use. A side-mounted universal AC outlet adds flexibility when a compatible device needs a standard plug.',
      mediaId: 6,
    },
  ],
  connections: [
    { label: 'USB-C', value: 'PD 100 W' },
    { label: 'USB-C', value: 'PD 18 W' },
    { label: 'USB-A', value: 'QC 18 W' },
    { label: 'USB-A', value: '5 V / 2.4 A' },
    { label: 'DC output', value: '12 V / 10 A' },
    { label: 'AC output', value: 'Universal side outlet' },
  ],
  note:
    'Need dimensions, weight, charging time or the confirmed AC output rating? Ask Solvio for the latest D100 technical sheet before choosing a configuration.',
  faqs: [
    {
      question: 'What is the D100 designed for?',
      answer:
        'It is positioned as a compact source of portable power for travel, light mobile work and everyday backup. Always check the connected device’s required input and wattage first.',
    },
    {
      question: 'Which connections are shown on the D100?',
      answer:
        'The current product images show two USB-C ports, two USB-A ports, a 12 V DC output and a universal AC outlet, plus a dedicated input connection.',
    },
    {
      question: 'Can I pair it with a portable solar panel?',
      answer:
        'Ask Solvio to confirm the correct panel, cable and input limits for your D100 configuration before connecting a solar panel.',
    },
  ],
};
