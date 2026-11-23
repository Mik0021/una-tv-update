// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --configuration=unasr|unasrprod` replaces it with `environment.unasr[prod].ts`.
// The list of file replacements can be found in `angular.json`.
// https://una-test-api-rs.ha.rs/api/v1
// https://api-rs.unaworld.com/api/v1
export const environment = {
  production: false,
  API_UNA: ' https://una-test-api-rs.ha.rs/api/v1',
  API_PARENT_CATEGORY: '/tv/categories/parent',
  API_TAG: '/tv/shows/tag',
  API_POST: '/tv/shows/slug',
  API_SEARCH: '/tv/shows/search',
  API_AUTHOR: '/articles/author',
  API_STATIC: '/tv/pages/slug',
  API_NAV: '/tv/menu',
  API_CATEGORY: '/tv/shows/category',
  API_HOME: '/tv/show-collections',
  API_LIVE_PREVIEW: '/articles/preview',
  API_HOME_LIVE_PREVIEW: '/article-collections/preview',
  API_PAGES: '/tv/pages',
  API_PERSONALITIES: '/tv/personalities/paginate',
  API_PERSNALITY: '/tv/personalities/slug',
  API_PERSONALITY_SHOWS: '/tv/shows/tv-personality',
  API_TV_PROGRAM: '/tv/program-schemas',
  API_TV_PROGRAM_BIH: 'https://api-ba.unaworld.com/api/v1/tv/program-schemas',
  API_TV_IS_SUBCATEGORY: '/tv/categories/is-child',
  API_QUIZ: '/quiz-requests',
  APP_PORT: '',
  APP_TITLE: 'UnaTV developmnent',
  APP_GOOGLE_VERIFICATION: 'gLhpy8ZQ3YtQgWlE0IIN8-dPVDrwMri7u2jabN5Ci64',
  APP_FOLDER: '/',
  APP_FACEBOOK: 'https://www.facebook.com/unatelevizija',
  APP_SHARE: 'Podijeli emisiju',
  APP_LANG: 'sr',
  APP_HOME_META_TITLE: 'UNA TV Bosna i Hercegovina',
  APP_RECAPTCHA_PUBLIC_KEY: '',
  APP_HOME_META_DESCRIPTION:
    'Na portalu UNA TV možete pronaći najnovije informacije iz zemlje i svijeta. Politika, društvo, ekonomija, zabava, sport - sve na jednom mjestu!',
  APP_HOME_META_KEYWORDS:
    'Vijesti, novosti, najnovije, informacije, sport, magazin, hronika, politika, scena, una',
  SITE_SELECT: [
    {
      id: 1,
      default: false,
      name: 'bih',
      longName: 'bih',
      imgUrl: 'assets/images/flag-bih.svg',
      url: 'https://una-test-ba.ha.rs/',
    },
    {
      id: 2,
      default: true,
      name: 'srb',
      longName: 'srbija',
      imgUrl: 'assets/images/flag-sr.svg',
      url: 'https://una-test-rs.ha.rs/',
    },
    {
      id: 3,
      default: false,
      name: 'hrv',
      longName: 'hrvatska',
      imgUrl: 'assets/images/flag-hr.svg',
      url: 'https://una-test-hr.ha.rs/',
    },
  ],
};
