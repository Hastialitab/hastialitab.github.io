// Central site configuration. Edit here to change navigation, contact or metadata.
export const site = {
  name: 'Hasti Alitab',
  title: 'Hasti Alitab — Landscape Archaeology & Spatial Research',
  tagline: 'Archaeologist | Landscape Archaeology & Spatial Research',
  description:
    'Academic portfolio of Hasti Alitab, archaeologist and MA researcher in Landscape Archaeology: GIS, remote sensing, geoarchaeology and human–environment interactions in Iran.',
  // Public academic email as listed in the CV. The institutional address and phone are deliberately not published.
  email: 'Hastialitaab@gmail.com',
  location: 'Tehran, Iran',
  // Profile links. Leave empty until real URLs are supplied — nothing is invented.
  profiles: [] as { label: string; href: string }[],
  cvPdf: '/downloads/Hasti-Alitab-Academic-CV.pdf',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Research', href: '/research/' },
  { label: 'Fieldwork', href: '/fieldwork/' },
  { label: 'Publications', href: '/publications/' },
  { label: 'Teaching', href: '/teaching/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Contact', href: '/contact/' },
];
