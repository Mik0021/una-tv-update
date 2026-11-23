import { Category } from 'src/app/interfaces/category.model';
import { Image } from 'src/app/interfaces/image.model';
import { Nav } from 'src/app/interfaces/nav.model';
import { Personality } from 'src/app/interfaces/personality.model';
import { Section } from 'src/app/interfaces/section.model';
import { TvShow } from 'src/app/interfaces/tv-show.model';

/** Small API-shaped objects for specs. Override any field as needed. */

export const image = (overrides: Partial<Image> = {}): Image => ({
  resource_type: 'image',
  id: 1,
  name: 'slika',
  source: '',
  url: 'https://img.test/full.webp',
  description: null,
  thumbnails: {
    '144': 'https://img.test/144.webp',
    '345': 'https://img.test/345.webp',
    '710': 'https://img.test/710.webp',
    '944': 'https://img.test/944.webp',
  },
  ...overrides,
});

export const category = (overrides: Partial<Category> = {}): Category =>
  ({
    resource_type: 'tv_category',
    id: 1,
    parent_id: 0,
    name: 'Emisije',
    slug: 'emisije',
    color: '#00aaff',
    seo_description: 'Opis kategorije',
    seo_title: 'Emisije SEO',
    parent_category: null,
    ...overrides,
  }) as Category;

export const subcategory = (): Category =>
  category({
    parent_category: { slug: 'nas-program' } as Category['parent_category'],
  });

export const tvShow = (overrides: Partial<TvShow> = {}): TvShow => ({
  resource_type: 'tv_show',
  id: 1,
  title: 'Holivudiranje',
  sub_title: 'Petkom u 21h',
  slug: 'holivudiranje',
  image: image(),
  settings: {},
  tv_category: subcategory(),
  ...overrides,
});

export const personality = (
  overrides: Partial<Personality> = {},
): Personality => ({
  resource_type: 'tv_personality',
  id: 1,
  name: 'Ana Strizić',
  sub_title: 'Voditeljka',
  slug: 'ana-strizic',
  image: image(),
  ...overrides,
});

export const section = (overrides: Partial<Section> = {}): Section => ({
  resource_type: 'tv_show_collection',
  id: 1,
  sort_number: 1,
  tv_category: subcategory(),
  tv_personalities: [],
  tv_show_template: {
    resource_type: 'tv_show_template',
    id: 2,
    type_id: 2,
    type: 'slider',
    tv_show_count: 1,
  },
  tv_shows: [],
  ...overrides,
});

export const nav = (quizEnabled = false): Nav =>
  ({
    data: [
      {
        resource_type: 'menu_item',
        type: 'category',
        id: 1,
        title: 'Naš program',
        slug: 'nas-program',
        sort_number: 1,
        color: '',
        children: [
          {
            resource_type: 'menu_item',
            type: 'category',
            id: 2,
            title: 'Emisije',
            slug: 'nas-program/emisije',
            sort_number: 1,
            color: '',
          },
        ],
      },
    ],
    meta: { settings: { quiz_enabled: quizEnabled, theme: 'default' } },
  }) as Nav;
