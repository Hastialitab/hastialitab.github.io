export type Publication = {
  type: 'Book' | 'Journal article' | 'Book chapter' | 'Conference paper' | 'Other';
  title: string;
  subtitle?: string;
  authors: string;
  year: number;
  publisher: string;
  place: string;
  pages?: string;
  isbn?: string;
  language: string;
  cover?: string;
  coverAlt?: string;
  coverCredit?: string;
  note?: string;
};

// Add future outputs to this array; the Publications page groups them by `type`.
export const publications: Publication[] = [
  {
    type: 'Book',
    title: 'Bibliography of Articles on Iranian Archaeology',
    subtitle:
      'A Bibliographic Index of Archaeological Articles Published in Iranian Journals, 1959–2025',
    authors: 'Hasti Alitab & K. Mohammadkhani',
    year: 2026,
    publisher: 'Nashr-e Tarikh-e Iran',
    place: 'Tehran',
    pages: '635 pp.',
    isbn: '978-622-4995-13-1',
    language: 'Persian (originally published in Persian)',
    cover: '/images/publications/bibliography-cover.jpg',
    coverAlt:
      'Cover of the Persian-language book with a grey stone relief of two figures carrying objects and the publisher’s emblem.',
    coverCredit: 'Book cover © Nashr-e Tarikh-e Iran / the authors.',
  },
];

export const publicationTypes: Publication['type'][] = [
  'Book',
  'Journal article',
  'Book chapter',
  'Conference paper',
  'Other',
];
