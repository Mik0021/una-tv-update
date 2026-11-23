import type { SwiperContainer } from 'swiper/element';
import type { SwiperOptions } from 'swiper/types';

/**
 * Styles injected into the Swiper Element shadow root. Global CSS can't reach
 * the navigation buttons any more, so the old `.swiper-button-*` rules from
 * styles.scss live here.
 */
const NAVIGATION_STYLES = `
  .swiper-button-prev,
  .swiper-button-next {
    color: white;
  }
  .swiper-button-prev svg,
  .swiper-button-next svg {
    width: auto;
    height: 30px;
  }
  .swiper-button-prev.swiper-button-disabled,
  .swiper-button-next.swiper-button-disabled {
    opacity: 0;
  }
  @media (min-width: 1536px) {
    .swiper-button-prev,
    .swiper-button-next {
      --swiper-navigation-size: 230px;
      background-color: rgba(21, 33, 39, 0.7);
      height: 100%;
      top: 0;
      bottom: 0;
      transform: none;
      margin-top: 0;
    }
    .swiper-button-prev {
      left: 0;
    }
    .swiper-button-next {
      right: 0;
    }
    .swiper-button-prev svg,
    .swiper-button-next svg {
      height: 40px;
    }
  }
`;

/**
 * Horizontal card carousel used by the home page sections. Breakpoints must
 * stay in sync with the `swiper-container:not(:defined)` fallback in styles.scss.
 */
const CARD_CAROUSEL_PARAMS: SwiperOptions & { injectStyles: string[] } = {
  slidesPerView: 4.5,
  navigation: true,
  breakpoints: {
    0: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 50,
      watchSlidesProgress: true,
    },
    1280: {
      slidesPerView: 4.5,
      spaceBetween: 50,
      watchSlidesProgress: true,
    },
  },
  injectStyles: [NAVIGATION_STYLES],
};

/**
 * Registers Swiper Element (lazily, so it stays out of the initial and server
 * bundles) and initializes a `<swiper-container init="false">`.
 * Browser only: callers must guard with `isPlatformBrowser`.
 */
export async function initCardCarousel(el: HTMLElement): Promise<void> {
  const { register } = await import('swiper/element/bundle');
  register();
  const swiperEl = el as SwiperContainer;
  Object.assign(swiperEl, CARD_CAROUSEL_PARAMS);
  swiperEl.initialize();
}
