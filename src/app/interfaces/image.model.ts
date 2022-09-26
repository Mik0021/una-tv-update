export interface Image {
  resource_type: string;
  id: number;
  name: string;
  source: string;
  url: string;
  description: string;
  thumbnails: {
    '144': string;
    '345': string;
    '710': string;
    '944': string;
  };
}
