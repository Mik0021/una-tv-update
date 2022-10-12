export interface TvSchemaItem {
  time: string;
  type: string;
  title: string;
  replay: Replay;
  description: string;
}

enum Replay {
  '(R)',
  '',
}
