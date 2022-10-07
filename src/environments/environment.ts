// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_UNA: 'https://una-test-api.ha.rs/api/v1',
  API_PARENT_CATEGORY: '/categories/parent',
  API_TAG: '/articles/tag',
  API_POST: '/articles/slug',
  API_SEARCH: '/articles/search',
  API_AUTHOR: '/articles/author',
  API_STATIC: '/pages/slug',
  API_NAV: '/menu',
  API_CATEGORY: '/articles/category',
  API_HOME: '/article-collections',
  API_LIVE_PREVIEW: '/articles/preview',
  API_HOME_LIVE_PREVIEW: '/article-collections/preview',
  API_PAGES: '/pages',
  APP_PORT: 3030,
  APP_TITLE: 'UnaTV developmnent',
  APP_FOLDER: '/',
  APP_FACEBOOK: 'https://www.facebook.com/unatelevizija',
  APP_SHARE: 'Podijeli emisiju',
  APP_LANG: 'sr',
  APP_HOME_META_TITLE: 'UNA TV Bosna i Hercegovina',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
