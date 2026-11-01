// Research themes. Only interests and methods stated in the CV are listed.
// No findings are claimed: the Sistan work is the focus of Hasti's current MA research.
export type ResearchTheme = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  interests: string[];
  methods: string[];
  imageSlot: 'sistan' | 'digital' | 'environment';
  imageNote: string;
  status: string;
};

export const researchThemes: ResearchTheme[] = [
  {
    slug: 'sistan',
    title: 'Archaeological Landscapes of Sistan',
    short: 'Settlements and environmental change in the Sistan Plain, Iran.',
    intro:
      'The focus of my current MA research is the Sistan Plain in south-eastern Iran. I examine how settlements and environmental change relate to one another, combining archaeological, geomorphological, hydrological and remote-sensing data.',
    interests: [
      'Settlement and environmental change in the Sistan Plain',
      'Geomorphological and hydrological context of archaeological landscapes',
      'The landscape as part of the archaeological evidence',
    ],
    methods: ['Remote sensing', 'Geomorphological mapping', 'Hydrological data', 'GIS'],
    imageSlot: 'sistan',
    imageNote: 'Satellite or terrain imagery of the Sistan Plain — pending.',
    status: 'Current research interest — MA research in progress; no completed project or publication is claimed.',
  },
  {
    slug: 'digital-archaeology',
    title: 'Digital Archaeology & Spatial Analysis',
    short: 'GIS, remote sensing and spatial data for reading archaeological landscapes.',
    intro:
      'I apply GIS, remote sensing and spatial analysis to archaeological questions, and I teach archaeological software and remote-sensing methods. My training includes several years of coursework in remote sensing, GIS and the digital processing of satellite images.',
    interests: [
      'GIS for archaeology',
      'Remote sensing and satellite image processing',
      'Spatial analysis of archaeological landscapes',
    ],
    methods: ['ArcGIS', 'Global Mapper', 'ENVI', 'Google Earth', 'Agisoft', 'Universal Map Downloader'],
    imageSlot: 'digital',
    imageNote: 'Multispectral or terrain-analysis visualisation — pending.',
    status: 'Training and applied skills documented in the CV.',
  },
  {
    slug: 'human-environment',
    title: 'Human–Environment Interactions',
    short: 'How past societies and their environments shaped one another.',
    intro:
      'I am interested in the relationships between past human societies and their environments: how geomorphology, hydrology and climate framed settlement, and how people in turn transformed the landscapes they lived in.',
    interests: [
      'Geoarchaeology and geomorphology in archaeology',
      'Hydrology and settlement',
      'Introductory paleoclimatology',
    ],
    methods: ['Geomorphological mapping', 'Hydrological principles', 'Remote sensing', 'Fieldwork'],
    imageSlot: 'environment',
    imageNote: 'River-plain or terrain imagery — pending.',
    status: 'Research interest informed by documented coursework and workshops.',
  },
];
