export interface SiteSelect {
  sites: Site[];
}

interface Site {
  id: number;
  default: boolean;
  name: string;
  longName: string;
  imgUrl: string;
  url: string;
}
